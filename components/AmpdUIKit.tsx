'use client';

import { useEffect, useState } from 'react';

// Global UI controller for external hooks
declare global {
  interface Window {
    AMPD_UI: any;
    AMPD_OUTPUT: any;
  }
}

export function AmpdUIKit({ uploadedImage }: { uploadedImage?: string }) {
  const [meterValue, setMeterValue] = useState(42);
  const [promptVisible, setPromptVisible] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [analyzerProgress, setAnalyzerProgress] = useState(0);
  const [analyzerStatus, setAnalyzerStatus] = useState('Idle. Drop an image or start a render.');
  const [afterImage, setAfterImage] = useState('/images/placeholders/after-beta.jpg');

  useEffect(() => {
    // Set up global hooks
    window.AMPD_UI = {
      analyzer: {
        setProgress(pct: number, msg: string) {
          setAnalyzerProgress(Math.max(0, Math.min(100, pct)));
          if (msg) setAnalyzerStatus(msg);
        },
        status(msg: string) {
          setAnalyzerStatus(msg);
        }
      }
    };

    window.AMPD_OUTPUT = {
      setImages({ before, after }: { before?: string; after?: string }) {
        // Before image comes from upload
        if (after) setAfterImage(after);
      },
      setPrompt(text: string) {
        setPromptText(text);
      }
    };
  }, []);

  return (
    <>
      {/* AMP'd Banner - Top notification */}
      <div id="ampd-banner" className="ampd-surface sticky top-0 z-50 mb-3 px-4 py-2.5 border border-white/5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_12px_rgba(202,162,94,0.7)]" />
            <div className="text-muted text-sm">
              <strong className="text-gold">AMP'd</strong> Systems Online — Visual Alchemy Mode. Beta v0.9 • Mobile app under consideration.
            </div>
          </div>
          <button
            className="ampd-btn text-xs px-3 py-1.5"
            onClick={(e) => {
              const banner = document.getElementById('ampd-banner');
              if (banner) banner.style.display = 'none';
            }}
          >
            Hide
          </button>
        </div>
      </div>

      {/* AMP'd Analyzer Bar */}
      <div id="ampd-analyzer" className="ampd-surface p-4 relative overflow-hidden mb-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="ampd-title text-sm mb-2">AMP'd Analyzer</div>
            <div className="h-2 w-full bg-[#1a1d25] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#705a2e] to-gold transition-all duration-300"
                style={{
                  width: `${analyzerProgress}%`,
                  filter: 'drop-shadow(0 0 8px rgba(202,162,94,0.6))'
                }}
              />
            </div>
            <div className="ampd-subtle text-xs mt-2">
              {analyzerStatus}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/5 grid place-items-center">
            <div className="ampd-spin w-5 h-5 border-3 border-gold/35 border-t-gold rounded-full" />
          </div>
        </div>
      </div>

      {/* AMP'd Output Suite */}
      <div id="ampd-output" className="ampd-surface p-4 mb-4">
        <div className="ampd-title text-base mb-3">Output Console</div>

        {/* AMP'd Meter (Single source of truth) */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex justify-between">
            <span className="ampd-subtle text-xs">AMP'd Intensity</span>
            <span className="ampd-subtle text-xs">{meterValue}%</span>
          </div>
          <div className="relative h-2.5 bg-[#1a1d25] rounded-full overflow-hidden">
            <input
              id="ampd-meter"
              type="range"
              min="0"
              max="100"
              value={meterValue}
              step="1"
              className="appearance-none w-full h-2.5 bg-transparent absolute inset-0 cursor-pointer"
              onChange={(e) => {
                const val = Number(e.target.value);
                setMeterValue(val);
                // Update global state if needed
                if (window.AMPD_UI?.analyzer?.status) {
                  window.AMPD_UI.analyzer.status(`AMP'd intensity → ${val}%`);
                }
              }}
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
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="ampd-subtle text-xs mb-2">Before</div>
            <div className="ampd-surface aspect-square grid place-items-center overflow-hidden rounded-lg">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Before"
                  className="max-w-full max-h-full object-contain opacity-90"
                />
              ) : (
                <div className="text-muted text-sm">Upload an image to begin</div>
              )}
            </div>
          </div>
          <div>
            <div className="ampd-subtle text-xs mb-2">After</div>
            <div className="ampd-surface aspect-square grid place-items-center overflow-hidden rounded-lg relative">
              <img
                src={afterImage}
                alt="After"
                className="max-w-full max-h-full object-contain"
              />
              <div className="absolute bottom-2 right-2 text-[11px] text-white/60 bg-black/35 px-1.5 py-1 rounded-lg">
                AMP'd Images • Beta
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center mt-3.5">
          <div className="flex gap-2.5">
            <button
              className="ampd-btn"
              onClick={() => {
                if (promptText) {
                  navigator.clipboard.writeText(promptText);
                  window.AMPD_UI?.analyzer?.status?.('Prompt copied.');
                }
              }}
            >
              Copy Prompt
            </button>
            <button
              className="ampd-btn"
              onClick={() => {
                const settings = {
                  aspectRatio: '16:9',
                  style: 'Cinematic',
                  intensity: meterValue
                };
                navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
                window.AMPD_UI?.analyzer?.status?.('Settings copied.');
              }}
            >
              Copy Settings
            </button>
            <button
              className="ampd-btn-primary"
              onClick={() => {
                // Download logic here
                window.AMPD_UI?.analyzer?.setProgress?.(12, 'Preparing download…');
                setTimeout(() => {
                  window.AMPD_UI?.analyzer?.setProgress?.(100, 'Ready ✓');
                }, 600);
              }}
            >
              Download
            </button>
          </div>
          <button
            className="ampd-btn"
            onClick={() => setPromptVisible(!promptVisible)}
          >
            {promptVisible ? 'Hide' : 'Show'} Prompt
          </button>
        </div>

        {/* Prompt Drawer */}
        {promptVisible && (
          <div className="mt-3 border border-dashed border-white/10 rounded-xl p-3">
            <div className="ampd-subtle text-xs mb-1.5">Generated Prompt</div>
            <pre className="text-xs whitespace-pre-wrap text-paper m-0">
              {promptText || 'Prompt will appear here after generation'}
            </pre>
          </div>
        )}
      </div>

      {/* AMP'd Gallery (Optional) */}
      <div id="ampd-gallery" className="ampd-surface p-3.5 mt-3">
        <div className="ampd-title text-sm mb-2.5">Recent Renders</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {/* Placeholder for gallery items */}
          <div className="aspect-square rounded-xl bg-[#151821]" />
        </div>
      </div>
    </>
  );
}
