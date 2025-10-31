"use client";
import { useState, useEffect } from "react";

export function AmpdUIKit() {
  const [meterValue, setMeterValue] = useState(42);
  const [promptText, setPromptText] = useState("");
  const [analyzerProgress, setAnalyzerProgress] = useState(0);
  const [analyzerStatus, setAnalyzerStatus] = useState("Ready");
  const [uploadedImage, setUploadedImage] = useState("");

  useEffect(() => {
    window.AMPD_UI = {
      analyzer: {
        setProgress: (prog: number, msg: string) => {
          setAnalyzerProgress(prog);
          setAnalyzerStatus(msg);
        },
      },
    };
    window.AMPD_OUTPUT = {
      setPrompt: (text: string) => setPromptText(text),
      setImages: (imgs: { before?: string; after?: string }) => {
        if (imgs.before) setUploadedImage(imgs.before);
      },
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Beta Banner */}
      <div className="ampd-surface sticky top-0 z-50 mb-6 px-4 py-2.5 border border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_12px_rgba(202,162,94,0.7)]" />
            <div className="text-muted text-sm">
              <strong className="text-gold">AMP'd</strong> Systems Online — Visual Alchemy Mode. Beta v0.9
            </div>
          </div>
        </div>
      </div>

      {/* AMP'd Analyzer */}
      <div className="ampd-surface p-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="ampd-title text-sm mb-2">AMP'd Analyzer</div>
            <div className="h-2 w-full bg-[#1a1d25] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#705a2e] to-gold transition-all duration-300"
                style={{ width: `${analyzerProgress}%` }}
              />
            </div>
            <div className="ampd-subtle text-xs mt-2">{analyzerStatus}</div>
          </div>
          {analyzerProgress > 0 && analyzerProgress < 100 && (
            <div className="w-10 h-10 rounded-full border border-white/5 grid place-items-center">
              <div className="ampd-spin w-5 h-5 border-3 border-gold/35 border-t-gold rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* AMP'd Meter */}
      <div className="ampd-surface p-6 mb-6">
        <div className="flex justify-between items-center mb-3">
          <div className="ampd-title text-base">AMP'd Intensity</div>
          <div className="text-gold text-xl font-bold">{meterValue}%</div>
        </div>
        <div className="relative h-3 bg-[#1a1d25] rounded-full overflow-hidden">
          <input
            id="ampd-meter"
            type="range"
            min="0"
            max="100"
            value={meterValue}
            step="1"
            className="appearance-none w-full h-3 bg-transparent absolute inset-0 cursor-pointer"
            onChange={(e) => setMeterValue(Number(e.target.value))}
            style={{ zIndex: 10 }}
          />
          <div
            className="h-full bg-gradient-to-r from-[#6b5a34] to-gold transition-all duration-200"
            style={{
              width: `${meterValue}%`,
              filter: 'drop-shadow(0 0 10px rgba(202,162,94,0.6))'
            }}
          />
        </div>
        <div className="text-muted text-xs mt-2 text-center">
          Dial the alchemy: from subtle refinement to full transformation
        </div>
      </div>

      {/* Output Console - CLEAN VERSION */}
      <div className="ampd-surface p-6">
        <div className="ampd-title text-lg mb-4">Generated Prompt</div>
        
        {/* Prompt Display - MidJourney Style */}
        <div className="bg-[#0B0B0C] border border-gold/20 rounded-lg p-4 mb-4 min-h-[200px]">
          <pre className="text-paper text-sm whitespace-pre-wrap font-mono leading-relaxed">
            {promptText || "Your prompt will appear here after image analysis and generation...\n\nUpload an image and adjust the AMP'd Meter to begin."}
          </pre>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="ampd-btn-primary flex-1"
            onClick={() => {
              if (promptText) {
                navigator.clipboard.writeText(promptText);
                setAnalyzerStatus("Prompt copied to clipboard ✓");
                setTimeout(() => setAnalyzerStatus("Ready"), 2000);
              }
            }}
            disabled={!promptText}
          >
            📋 Copy Prompt
          </button>
          <button
            className="ampd-btn"
            onClick={() => {
              const settings = {
                intensity: meterValue,
                timestamp: new Date().toISOString(),
                prompt: promptText
              };
              const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `ampd-prompt-${Date.now()}.json`;
              a.click();
            }}
            disabled={!promptText}
          >
            💾 Export
          </button>
        </div>

        {/* Before Image Preview (compact) */}
        {uploadedImage && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="text-muted text-xs mb-2">Source Image</div>
            <div className="w-32 h-32 rounded-lg overflow-hidden border border-white/10">
              <img
                src={uploadedImage}
                alt="Source"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
