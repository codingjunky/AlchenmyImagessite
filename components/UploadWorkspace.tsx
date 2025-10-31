"use client";
import { useState } from "react";
import Image from "next/image";

type OutputMode = "image" | "video" | "both" | null;

export default function UploadWorkspace() {
  // File & Analysis State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);

  // Output Mode Selection
  const [outputMode, setOutputMode] = useState<OutputMode>(null);

  // Identity Controls (Freely Editable)
  const [identity, setIdentity] = useState({
    ethnicity: "Other",
    hair_color: "brown",
    eye_color: "brown",
    gender: "unspecified",
    age_range: "20s"
  });

  // Image Controls
  const [selectedPreset, setSelectedPreset] = useState<string>("cinematic_noir");
  const [lighting, setLighting] = useState<string>("cinematic");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [cameraAngle, setCameraAngle] = useState<string>("eye");
  
  // Video Controls
  const [videoDirection, setVideoDirection] = useState<string>("");
  const [cameraMotion, setCameraMotion] = useState<string>("static");
  const [pace, setPace] = useState<string>("medium");
  const [mood, setMood] = useState<string>("dramatic");

  // Shared Control
  const [ampdMeter, setAmpdMeter] = useState<number>(5);

  // Dropdown Options
  const ethnicityOptions = ["Black", "White", "Latinx", "South Asian", "East Asian", "Middle Eastern", "Indigenous", "Mixed", "Other"];
  const hairOptions = ["black", "brown", "blonde", "red", "white", "bold color"];
  const eyeOptions = ["brown", "hazel", "green", "blue", "gray", "other"];
  const genderOptions = ["female", "male", "nonbinary", "unspecified"];
  const ageOptions = ["teen", "20s", "30s", "40s", "50s", "60+"];

  const presets = [
    { id: "cinematic_noir", name: "Cinematic Noir" },
    { id: "anime_essence", name: "Anime Essence" },
    { id: "fantasy_dreamscape", name: "Fantasy Dreamscape" },
    { id: "futuristic_cyberpunk", name: "Futuristic Cyberpunk" },
    { id: "vintage_film", name: "Vintage Film" },
    { id: "natural_documentary", name: "Natural Documentary" },
    { id: "mystical_portrait", name: "Mystical Portrait" },
    { id: "urban_street_art", name: "Urban Street Art" }
  ];

  // Auto-analyze on file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File size must be 10MB or less");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    setError("");
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass image to output console
    if (typeof window !== 'undefined' && window.AMPD_OUTPUT?.setImages) {
      window.AMPD_OUTPUT.setImages({ before: url });
    }
    
    // Auto-trigger analysis
    await handleAnalyze(file);
  };

  // Analysis with progress integration
  const handleAnalyze = async (fileToAnalyze?: File) => {
    const file = fileToAnalyze || selectedFile;
    if (!file) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setError("");

    try {
      // Progress: Start
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(10, 'Uploading image...');
      }

      const formData = new FormData();
      formData.append("file", file);

      // Progress: Uploading
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(30, 'Analyzing visual DNA...');
      }

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      // Progress: Processing
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(70, 'Extracting identity traits...');
      }

      const data = await response.json();
      setProfileData(data.profile);
      
      // Update identity fields with detected values AS STARTING POINTS
      if (data.profile?.subjects?.[0]) {
        const subject = data.profile.subjects[0];
        setIdentity({
          ethnicity: subject.ethnicity || "Other",
          hair_color: subject.hair_color || "brown",
          eye_color: subject.eye_color || "brown",
          gender: subject.gender || "unspecified",
          age_range: subject.age_range || "20s"
        });
      }

      // Progress: Complete
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(100, 'Analysis complete ✓');
      }

      setAnalysisComplete(true);

    } catch (err) {
      console.error("Analysis error:", err);
      setError("Analysis failed. Please try again.");
      
      // Progress: Error
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(0, 'Analysis failed');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate Prompt(s) based on selection
  const handleGeneratePrompt = async () => {
    if (!profileData || !analysisComplete || !outputMode) {
      setError("Please upload an image and select output type");
      return;
    }

    try {
      // Progress: Generating
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(50, 'Generating prompt(s)...');
      }

      const basePayload = {
        visualDNA: {
          subject: profileData.subjects?.[0]?.type || "person",
          lighting: lighting,
          colors: profileData.color_palette || [],
          camera: {
            lens: profileData.camera?.lens || "50mm",
            angle: cameraAngle
          },
          mood: profileData.notes || ""
        },
        selections: {
          style: selectedPreset,
          aspectRatio: aspectRatio,
          intensity: ampdMeter * 10,
          // USER'S FINAL SELECTIONS (not just detected values)
          gender: identity.gender,
          ethnicity: identity.ethnicity,
          hair: identity.hair_color,
          eyes: identity.eye_color
        }
      };

      let imagePrompt = "";
      let videoPrompt = "";

      // Generate Image Prompt
      if (outputMode === "image" || outputMode === "both") {
        const imageResponse = await fetch("/api/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(basePayload)
        });

        if (imageResponse.ok) {
          imagePrompt = await imageResponse.text();
        }
      }

      // Generate Video Prompt
      if (outputMode === "video" || outputMode === "both") {
        const videoPayload = {
          ...basePayload,
          videoDirection: videoDirection,
          cameraMotion: cameraMotion,
          pace: pace,
          mood: mood
        };

        const videoResponse = await fetch("/api/prompt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(videoPayload)
        });

        if (videoResponse.ok) {
          videoPrompt = await videoResponse.text();
        }
      }

      // Display prompt(s) in output console
      if (typeof window !== 'undefined' && window.AMPD_OUTPUT?.setPrompt) {
        if (outputMode === "both") {
          window.AMPD_OUTPUT.setPrompt(
            `🖼️ IMAGE PROMPT:\n${imagePrompt}\n\n🎬 VIDEO PROMPT:\n${videoPrompt}`
          );
        } else if (outputMode === "image") {
          window.AMPD_OUTPUT.setPrompt(imagePrompt);
        } else {
          window.AMPD_OUTPUT.setPrompt(videoPrompt);
        }
      }

      // Progress: Complete
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(100, 'Prompt(s) generated ✓');
      }

    } catch (err) {
      console.error("Prompt generation error:", err);
      setError("Prompt generation failed. Please try again.");
      
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(0, 'Generation failed');
      }
    }
  };

  return (
    <section id="upload" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-paper mb-4">
            Upload & Transform
          </h2>
          <p className="text-lg text-muted">
            Your image. Your vision. AMP'd.
          </p>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="p-8 rounded-2xl bg-ink-2 border-2 border-gold/20">
            <h3 className="text-2xl font-bold text-paper mb-6">Upload Your Image</h3>
            
            <div className="border-2 border-dashed border-gold/30 rounded-xl p-8 text-center hover:border-gold/60 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
                disabled={isAnalyzing}
              />
              <label htmlFor="file-upload" className={isAnalyzing ? "cursor-wait" : "cursor-pointer"}>
                {previewUrl ? (
                  <div className="relative w-full aspect-square max-w-sm mx-auto">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                        <div className="text-gold text-sm font-semibold">Analyzing...</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12">
                    <div className="text-gold text-6xl mb-4">📸</div>
                    <p className="text-paper font-semibold mb-2">Click to upload</p>
                    <p className="text-sm text-muted">Max 10MB • JPG, PNG, WEBP</p>
                  </div>
                )}
              </label>
            </div>

            {error && (
              <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
            )}

            {analysisComplete && (
              <div className="mt-4 p-4 rounded-lg bg-gold/10 border border-gold/30">
                <p className="text-gold text-sm text-center font-semibold">
                  ✓ Analysis complete! Review and modify detected values below.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Identity Controls - Only show after analysis */}
        {analysisComplete && (
          <>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="p-8 rounded-2xl bg-ink-2 border-2 border-gold/30">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">✨</span>
                  <div>
                    <h3 className="text-2xl font-bold text-gold">Identity Controls</h3>
                    <p className="text-sm text-muted">
                      Detected values provide a starting point - modify freely to transform your subject
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {/* Ethnicity */}
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Ethnicity
                    </label>
                    <select
                      value={identity.ethnicity}
                      onChange={(e) => setIdentity({...identity, ethnicity: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {ethnicityOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Hair Color */}
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Hair Color
                    </label>
                    <select
                      value={identity.hair_color}
                      onChange={(e) => setIdentity({...identity, hair_color: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {hairOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Eye Color */}
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Eye Color
                    </label>
                    <select
                      value={identity.eye_color}
                      onChange={(e) => setIdentity({...identity, eye_color: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {eyeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-paper mb-2">
                      Gender
                    </label>
                    <select
                      value={identity.gender}
                      onChange={(e) => setIdentity({...identity, gender: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {genderOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-lg bg-gold/5 border border-gold/20">
                  <p className="text-xs text-muted text-center">
                    💡 These controls let you transform any aspect of your subject - creative freedom is yours
                  </p>
                </div>
              </div>
            </div>

            {/* Output Mode Selection */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="p-8 rounded-2xl bg-ink-2 border-2 border-gold/30">
                <h3 className="text-2xl font-bold text-paper text-center mb-6">
                  What do you want to create?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Image Option */}
                  <button
                    onClick={() => setOutputMode("image")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      outputMode === "image"
                        ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(214,178,94,0.3)]'
                        : 'bg-ink border-gold/30 hover:border-gold/60'
                    }`}
                  >
                    <div className="text-5xl mb-3">🖼️</div>
                    <div className="text-lg font-bold text-paper mb-2">Image Prompt</div>
                    <div className="text-sm text-muted">MidJourney style</div>
                  </button>

                  {/* Video Option */}
                  <button
                    onClick={() => setOutputMode("video")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      outputMode === "video"
                        ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(214,178,94,0.3)]'
                        : 'bg-ink border-gold/30 hover:border-gold/60'
                    }`}
                  >
                    <div className="text-5xl mb-3">🎬</div>
                    <div className="text-lg font-bold text-paper mb-2">Video Prompt</div>
                    <div className="text-sm text-muted">Sora style</div>
                  </button>

                  {/* Both Option */}
                  <button
                    onClick={() => setOutputMode("both")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      outputMode === "both"
                        ? 'bg-gold/10 border-gold shadow-[0_0_20px_rgba(214,178,94,0.3)]'
                        : 'bg-ink border-gold/30 hover:border-gold/60'
                    }`}
                  >
                    <div className="text-5xl mb-3">⚡</div>
                    <div className="text-lg font-bold text-paper mb-2">Both</div>
                    <div className="text-sm text-muted">Image + Video</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Controls Section - Shows based on output mode */}
            {outputMode && (
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Image Controls */}
                  {(outputMode === "image" || outputMode === "both") && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gold flex items-center gap-2">
                        <span>🖼️</span> Image Controls
                      </h3>

                      {/* Style Presets */}
                      <div className="p-6 rounded-xl bg-ink-2 border border-gold/20">
                        <h4 className="text-lg font-bold text-paper mb-4">Style Presets</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {presets.map(preset => (
                            <button
                              key={preset.id}
                              onClick={() => setSelectedPreset(preset.id)}
                              className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                                selectedPreset === preset.id
                                  ? 'bg-gold text-ink shadow-[0_0_20px_rgba(214,178,94,0.4)]'
                                  : 'bg-ink border border-gold/30 text-paper hover:border-gold'
                              }`}
                            >
                              {preset.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Image Advanced Controls */}
                      <div className="p-6 rounded-xl bg-ink-2 border border-gold/20 space-y-4">
                        <h4 className="text-lg font-bold text-paper mb-4">Advanced Controls</h4>
                        
                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Lighting</label>
                          <select
                            value={lighting}
                            onChange={(e) => setLighting(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="cinematic">Cinematic</option>
                            <option value="natural">Natural</option>
                            <option value="soft">Soft</option>
                            <option value="hard">Hard</option>
                            <option value="neon">Neon</option>
                            <option value="studio">Studio</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Aspect Ratio</label>
                          <select
                            value={aspectRatio}
                            onChange={(e) => setAspectRatio(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="1:1">1:1 (Square)</option>
                            <option value="3:2">3:2</option>
                            <option value="4:5">4:5 (Portrait)</option>
                            <option value="16:9">16:9 (Landscape)</option>
                            <option value="9:16">9:16 (Vertical)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Camera Angle</label>
                          <select
                            value={cameraAngle}
                            onChange={(e) => setCameraAngle(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="eye">Eye Level</option>
                            <option value="low">Low Angle</option>
                            <option value="high">High Angle</option>
                            <option value="top">Top Down</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Video Controls */}
                  {(outputMode === "video" || outputMode === "both") && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-gold flex items-center gap-2">
                        <span>🎬</span> Video Controls
                      </h3>

                      {/* Motion Description */}
                      <div className="p-6 rounded-xl bg-ink-2 border border-gold/20">
                        <label className="block text-lg font-bold text-paper mb-4">
                          Describe What Happens
                        </label>
                        <textarea
                          value={videoDirection}
                          onChange={(e) => setVideoDirection(e.target.value)}
                          placeholder="Camera pans upward through fog as the subject turns toward the light..."
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg bg-ink border border-gold/30 text-paper 
                                   placeholder:text-muted focus:border-gold focus:ring-2 focus:ring-gold/20 
                                   outline-none resize-none"
                        />
                      </div>

                      {/* Video Advanced Controls */}
                      <div className="p-6 rounded-xl bg-ink-2 border border-gold/20 space-y-4">
                        <h4 className="text-lg font-bold text-paper mb-4">Motion Controls</h4>

                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Camera Motion</label>
                          <select
                            value={cameraMotion}
                            onChange={(e) => setCameraMotion(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="static">Static</option>
                            <option value="pan">Pan</option>
                            <option value="tilt">Tilt</option>
                            <option value="dolly">Dolly</option>
                            <option value="drone">Drone</option>
                            <option value="zoom">Zoom</option>
                            <option value="handheld">Handheld</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Pace</label>
                          <select
                            value={pace}
                            onChange={(e) => setPace(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="slow">Slow</option>
                            <option value="medium">Medium</option>
                            <option value="fast">Fast</option>
                            <option value="dynamic">Dynamic</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-paper mb-2">Mood</label>
                          <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-ink border border-gold/30 text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                          >
                            <option value="dramatic">Dramatic</option>
                            <option value="peaceful">Peaceful</option>
                            <option value="energetic">Energetic</option>
                            <option value="mysterious">Mysterious</option>
                            <option value="joyful">Joyful</option>
                            <option value="tense">Tense</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AMP'd Meter - Always visible when mode is selected */}
                <div className="mt-8 max-w-3xl mx-auto">
                  <div className="p-8 rounded-2xl bg-ink-2 border-2 border-gold/30">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-gold">AMP'd Meter</h3>
                      <span className="text-xl text-gold font-bold">{ampdMeter}/10</span>
                    </div>

                    <div className="relative w-full h-3 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-full mb-3">
                      <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold to-gold-2 rounded-full transition-all duration-200"
                        style={{ width: `${(ampdMeter / 10) * 100}%` }}
                      />
                      
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={ampdMeter}
                        onChange={(e) => setAmpdMeter(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        style={{ zIndex: 10 }}
                      />

                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-7 h-7 bg-gold-2 rounded-full border-2 border-paper transition-all duration-200 pointer-events-none"
                        style={{ 
                          left: `calc(${((ampdMeter - 1) / 9) * 100}% - 14px)`,
                          boxShadow: '0 0 18px 6px rgba(214,178,94,0.35)'
                        }}
                      />
                    </div>

                    <p className="text-sm text-muted italic text-center">
                      Dial the alchemy: from subtle refinement to full transformation
                    </p>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={handleGeneratePrompt}
                    disabled={!outputMode}
                    className="px-16 py-5 rounded-xl font-bold text-xl
                      bg-gold text-ink hover:bg-gold-2 
                      disabled:bg-gold/30 disabled:cursor-not-allowed
                      transition-all duration-300 hover:shadow-[0_0_40px_rgba(214,178,94,0.6)] hover:scale-105"
                  >
                    {outputMode === "both" ? "Generate Both Prompts" : 
                     outputMode === "image" ? "Generate Image Prompt" : 
                     outputMode === "video" ? "Generate Video Prompt" : 
                     "Select Output Type"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
