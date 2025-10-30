"use client";

import { useState } from "react";

export default function VideoPromptPanel() {
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [videoDirection, setVideoDirection] = useState("");
  const [cameraMotion, setCameraMotion] = useState("static");
  const [pace, setPace] = useState("medium");
  const [mood, setMood] = useState("dramatic");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateVideoPrompt = async () => {
    setIsGenerating(true);
    // API call will be implemented later
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <section className="relative py-24 px-6 bg-ink-2">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-4">
            Video Prompt (Beta)
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-xl text-muted">
            Add motion to your vision — generate video-ready prompts
          </p>
        </div>

        {/* Video Mode Toggle */}
        <div className="mb-8 flex items-center justify-center">
          <button
            onClick={() => setIsVideoMode(!isVideoMode)}
            className={`flex items-center space-x-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300
              ${isVideoMode 
                ? 'bg-gold text-ink shadow-[0_0_30px_rgba(214,178,94,0.4)]' 
                : 'bg-ink-2 text-paper border-2 border-gold/30 hover:border-gold'
              }`}
          >
            <span className="text-2xl">{isVideoMode ? "🎬" : "🎥"}</span>
            <span>Add Motion (Video Prompt Only)</span>
          </button>
        </div>

        {/* Video Controls - Show when enabled */}
        {isVideoMode && (
          <div className="space-y-6 animate-fadeIn">
            {/* Video Direction Textarea */}
            <div className="p-8 rounded-2xl bg-ink border border-gold/20">
              <label className="block text-xl font-bold text-paper mb-4">
                Describe What Happens Next
              </label>
              <textarea
                value={videoDirection}
                onChange={(e) => setVideoDirection(e.target.value)}
                placeholder="Camera pans upward through fog as the subject turns toward the light..."
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-ink-2 border border-gold/30 text-paper 
                         placeholder:text-muted focus:border-gold focus:ring-2 focus:ring-gold/20 
                         outline-none resize-none"
              />
              <p className="text-sm text-muted mt-2">
                Describe the action, movement, or transformation you want to see
              </p>
            </div>

            {/* Video-Specific Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Camera Motion */}
              <div className="p-6 rounded-xl bg-ink border border-gold/20">
                <label className="block text-sm font-medium text-paper mb-3">
                  Camera Motion
                </label>
                <select
                  value={cameraMotion}
                  onChange={(e) => setCameraMotion(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-ink-2 border border-gold/30 text-paper 
                           focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
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

              {/* Pace */}
              <div className="p-6 rounded-xl bg-ink border border-gold/20">
                <label className="block text-sm font-medium text-paper mb-3">
                  Pace
                </label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-ink-2 border border-gold/30 text-paper 
                           focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
                >
                  <option value="slow">Slow</option>
                  <option value="medium">Medium</option>
                  <option value="fast">Fast</option>
                  <option value="dynamic">Dynamic</option>
                </select>
              </div>

              {/* Mood */}
              <div className="p-6 rounded-xl bg-ink border border-gold/20">
                <label className="block text-sm font-medium text-paper mb-3">
                  Mood
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-ink-2 border border-gold/30 text-paper 
                           focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none"
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

            {/* Generate Video Prompt Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleGenerateVideoPrompt}
                disabled={!videoDirection.trim() || isGenerating}
                className="px-12 py-4 rounded-xl font-semibold text-lg
                  bg-gold text-ink hover:bg-gold-2 
                  disabled:bg-gold/30 disabled:cursor-not-allowed
                  transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,178,94,0.5)]"
              >
                {isGenerating ? "Generating..." : "Generate Video Prompt"}
              </button>
            </div>

            {/* Beta Notice */}
            <div className="p-6 rounded-xl bg-gold/5 border border-gold/30 text-center">
              <p className="text-sm text-muted">
                <span className="text-gold font-semibold">Beta Feature:</span> Generates text prompts for video tools like Sora — no actual video rendering
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
