"use client";

import { useState } from "react";

interface PromptPreviewProps {
  prompt: string;
  mode: "image" | "video";
  metadata?: {
    preset?: string;
    ampdMeter?: number;
    lighting?: string;
    aspectRatio?: string;
  };
}

export default function PromptPreview({ prompt, mode, metadata }: PromptPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (!prompt) return null;

  return (
    <div className="w-full p-8 rounded-2xl bg-ink-2 border-2 border-gold/30">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{mode === "image" ? "🖼️" : "🎬"}</span>
          <h3 className="text-xl font-bold text-paper">
            {mode === "image" ? "Image Prompt" : "Video Prompt"}
          </h3>
        </div>
        
        {metadata && (
          <div className="flex items-center space-x-2 text-sm text-muted">
            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold">
              AMP'd {metadata.ampdMeter}/10
            </span>
          </div>
        )}
      </div>

      {/* Prompt Text */}
      <div className="mb-6 p-6 rounded-xl bg-ink border border-gold/20">
        <p className="text-paper leading-relaxed whitespace-pre-wrap">
          {prompt}
        </p>
      </div>

      {/* Metadata */}
      {metadata && (
        <div className="mb-4 flex flex-wrap gap-2">
          {metadata.preset && (
            <span className="px-3 py-1 rounded-full bg-ink border border-gold/30 text-sm text-muted">
              {metadata.preset.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          )}
          {metadata.lighting && (
            <span className="px-3 py-1 rounded-full bg-ink border border-gold/30 text-sm text-muted">
              {metadata.lighting}
            </span>
          )}
          {metadata.aspectRatio && (
            <span className="px-3 py-1 rounded-full bg-ink border border-gold/30 text-sm text-muted">
              {metadata.aspectRatio}
            </span>
          )}
        </div>
      )}

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="w-full py-3 px-6 rounded-xl font-semibold
          bg-gold text-ink hover:bg-gold-2 
          transition-all duration-300 hover:shadow-[0_0_20px_rgba(214,178,94,0.5)]
          flex items-center justify-center space-x-2"
      >
        <span>{copied ? "✓" : "📋"}</span>
        <span>{copied ? "Copied!" : "Copy Prompt"}</span>
      </button>

      {/* Usage Note */}
      <p className="text-xs text-muted text-center mt-4">
        {mode === "image" 
          ? "Ready for Midjourney, DALL-E, or other image generation tools" 
          : "Ready for Sora, Runway, or other video generation tools"}
      </p>
    </div>
  );
}
