"use client";
import { useState } from "react";
import Image from "next/image";

interface IdentityField {
  value: string;
  source: "vision" | "user";
  user_override: boolean;
}

export default function UploadWorkspace() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string>("cinematic_noir");
  const [ampdMeter, setAmpdMeter] = useState<number>(5);
  const [lighting, setLighting] = useState<string>("cinematic");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [cameraAngle, setCameraAngle] = useState<string>("eye");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState<string>("");
  const [profileData, setProfileData] = useState<any>(null);

  // Identity controls
  const [identity, setIdentity] = useState<{
    ethnicity: IdentityField;
    hair_color: IdentityField;
    eye_color: IdentityField;
  }>({
    ethnicity: { value: "Other", source: "vision", user_override: false },
    hair_color: { value: "brown", source: "vision", user_override: false },
    eye_color: { value: "brown", source: "vision", user_override: false }
  });

  const ethnicityOptions = ["Black", "White", "Latinx", "South Asian", "East Asian", "Middle Eastern", "Indigenous", "Mixed", "Other"];
  const hairOptions = ["black", "brown", "blonde", "red", "white", "bold color"];
  const eyeOptions = ["brown", "hazel", "green", "blue", "gray", "other"];

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

  // ✅ FIXED: Auto-analyze on file selection
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
    
    // ✅ NEW: Pass image to output console
    if (typeof window !== 'undefined' && window.AMPD_OUTPUT?.setImages) {
      window.AMPD_OUTPUT.setImages({ before: url });
    }
    
    // ✅ NEW: Auto-trigger analysis
    await handleAnalyze(file);
  };

  // ✅ FIXED: Added progress bar integration
  const handleAnalyze = async (fileToAnalyze?: File) => {
    const file = fileToAnalyze || selectedFile;
    if (!file) return;

    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setError("");

    try {
      // ✅ Progress: Start
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(10, 'Uploading image...');
      }

      const formData = new FormData();
      formData.append("file", file);

      // ✅ Progress: Uploading
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

      // ✅ Progress: Processing
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(70, 'Extracting identity traits...');
      }

      const data = await response.json();
      setProfileData(data.profile);
      
      // Update identity fields with detected values
      if (data.profile?.subjects?.[0]) {
        const subject = data.profile.subjects[0];
        setIdentity({
          ethnicity: { 
            value: subject.ethnicity || "Other", 
            source: "vision", 
            user_override: false 
          },
          hair_color: { 
            value: subject.hair_color || "brown", 
            source: "vision", 
            user_override: false 
          },
          eye_color: { 
            value: subject.eye_color || "brown", 
            source: "vision", 
            user_override: false 
          }
        });
      }

      // ✅ Progress: Complete
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(100, 'Analysis complete ✓');
      }

      setAnalysisComplete(true);

    } catch (err) {
      console.error("Analysis error:", err);
      setError("Analysis failed. Please try again.");
      
      // ✅ Progress: Error
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(0, 'Analysis failed');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  // ✅ NEW: Separate function for prompt generation
  const handleGeneratePrompt = async () => {
    if (!profileData || !analysisComplete) {
      setError("Please upload and analyze an image first");
      return;
    }

    try {
      // ✅ Progress: Generating prompt
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(50, 'Generating prompt...');
      }

      const response = await fetch("/api/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
            intensity: ampdMeter * 10, // Convert 1-10 to 0-100
            gender: profileData.subjects?.[0]?.gender,
            ethnicity: identity.ethnicity.value,
            hair: identity.hair_color.value,
            eyes: identity.eye_color.value
          }
        }),
      });

      if (!response.ok) {
        throw new Error("Prompt generation failed");
      }

      const promptText = await response.text();
      
      // ✅ Display prompt in output console
      if (typeof window !== 'undefined' && window.AMPD_OUTPUT?.setPrompt) {
        window.AMPD_OUTPUT.setPrompt(promptText);
      }

      // ✅ Progress: Complete
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(100, 'Prompt generated ✓');
      }

    } catch (err) {
      console.error("Prompt generation error:", err);
      setError("Prompt generation failed. Please try again.");
      
      if (typeof window !== 'undefined' && window.AMPD_UI?.analyzer?.setProgress) {
        window.AMPD_UI.analyzer.setProgress(0, 'Prompt generation failed');
      }
    }
  };

  const updateIdentity = (field: keyof typeof identity, value: string) => {
    setIdentity(prev => ({
      ...prev,
      [field]: {
        value,
        source: "user",
        user_override: true
      }
    }));
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Panel */}
          <div className="space-y-6">
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
                <p className="mt-4 text-gold text-sm text-center font-semibold">
                  ✓ Analysis complete! Identity traits detected.
                </p>
              )}

              <p className="mt-4 text-xs text-muted text-center">
                Identity traits (ethnicity, hair, eyes) are detected automatically and
                never overridden by presets or AMP'd Meter settings.
              </p>
            </div>

            {/* Identity Controls Panel */}
            <div className="p-6 rounded-2xl bg-ink-2 border-2 border-gold">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-gold">Identity (Locked)</h3>
                <span className="text-xs text-gold/60">🔒</span>
              </div>
              <p className="text-xs text-muted mb-4">
                These traits anchor your subject. Change them to override detection.
              </p>

              <div className="space-y-4">
                {/* Ethnicity */}
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm text-paper font-medium">Ethnicity</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={identity.ethnicity.value}
                      onChange={(e) => updateIdentity("ethnicity", e.target.value)}
                      className="bg-ink border border-gold/30 rounded px-3 py-1.5 text-sm text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {ethnicityOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className={`text-[10px] px-2 py-1 rounded-full border ${
                      identity.ethnicity.user_override 
                        ? 'border-gold text-gold bg-gold/10' 
                        : 'border-muted text-muted'
                    }`}>
                      {identity.ethnicity.user_override ? 'OVERRIDDEN' : 'LOCKED'}
                    </span>
                  </div>
                </div>

                {/* Hair Color */}
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm text-paper font-medium">Hair Color</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={identity.hair_color.value}
                      onChange={(e) => updateIdentity("hair_color", e.target.value)}
                      className="bg-ink border border-gold/30 rounded px-3 py-1.5 text-sm text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {hairOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className={`text-[10px] px-2 py-1 rounded-full border ${
                      identity.hair_color.user_override 
                        ? 'border-gold text-gold bg-gold/10' 
                        : 'border-muted text-muted'
                    }`}>
                      {identity.hair_color.user_override ? 'OVERRIDDEN' : 'LOCKED'}
                    </span>
                  </div>
                </div>

                {/* Eye Color */}
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm text-paper font-medium">Eye Color</label>
                  <div className="flex items-center gap-2">
                    <select
                      value={identity.eye_color.value}
                      onChange={(e) => updateIdentity("eye_color", e.target.value)}
                      className="bg-ink border border-gold/30 rounded px-3 py-1.5 text-sm text-paper focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                    >
                      {eyeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <span className={`text-[10px] px-2 py-1 rounded-full border ${
                      identity.eye_color.user_override 
                        ? 'border-gold text-gold bg-gold/10' 
                        : 'border-muted text-muted'
                    }`}>
                      {identity.eye_color.user_override ? 'OVERRIDDEN' : 'LOCKED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Style Presets */}
            <div className="p-8 rounded-2xl bg-ink-2 border border-gold/20">
              <h3 className="text-xl font-bold text-paper mb-4">Style Presets</h3>
              <div className="grid grid-cols-2 gap-3">
                {presets.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`px-4 py-3 rounded-lg font-medium text-sm transition-all
                      ${selectedPreset === preset.id
                        ? 'bg-gold text-ink shadow-[0_0_20px_rgba(214,178,94,0.4)]'
                        : 'bg-ink border border-gold/30 text-paper hover:border-gold'
                      }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* HORIZONTAL AMP'd Meter */}
            <div className="p-8 rounded-2xl bg-ink-2 border border-gold/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gold">AMP'd Meter</h3>
                <span className="text-sm text-muted">Intensity: {ampdMeter}/10</span>
              </div>

              <div className="relative w-full h-2 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] rounded-full mb-3">
                {/* Fill trail */}
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-gold to-gold-2 rounded-full transition-all duration-200"
                  style={{ width: `${(ampdMeter / 10) * 100}%` }}
                />
                
                {/* Slider input */}
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={ampdMeter}
                  onChange={(e) => setAmpdMeter(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ zIndex: 10 }}
                />

                {/* Thumb */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-gold-2 rounded-full border-2 border-paper transition-all duration-200 pointer-events-none"
                  style={{ 
                    left: `calc(${((ampdMeter - 1) / 9) * 100}% - 12px)`,
                    boxShadow: '0 0 18px 6px rgba(214,178,94,0.35)'
                  }}
                />
              </div>

              <p className="text-xs text-muted italic text-center">
                Dial the alchemy: subtle → full transformation.
              </p>
            </div>

            {/* Additional Controls */}
            <div className="p-8 rounded-2xl bg-ink-2 border border-gold/20 space-y-4">
              <h3 className="text-xl font-bold text-paper mb-4">Advanced Controls</h3>
              
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

            {/* ✅ FIXED: Generate Prompt Button - Only enabled after analysis */}
            <button
              onClick={handleGeneratePrompt}
              disabled={!analysisComplete}
              className="w-full py-4 px-8 rounded-xl font-semibold text-lg
                bg-gold text-ink hover:bg-gold-2 
                disabled:bg-gold/30 disabled:cursor-not-allowed
                transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,178,94,0.5)]"
            >
              {analysisComplete ? "Generate Prompt" : "Upload image to begin"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
