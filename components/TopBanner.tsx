"use client";
import { useEffect, useState } from "react";

export default function TopBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== "undefined" && localStorage.getItem("ampd_top_banner_dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="AMP'd announcement"
      className="w-full bg-[#0B0B0C] border-b border-[#D6B25E] text-[#F5F3EF]"
      style={{ position: "sticky", top: 0, zIndex: 60 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <p className="text-sm md:text-base leading-tight">
          <span className="text-[#D6B25E] font-semibold">New:</span>  
          <span className="opacity-90"> Beta Video Prompt — describe motion, get a cinematic prompt. </span>
          <a href="#video-prompt" className="underline decoration-[#D6B25E] underline-offset-4 hover:opacity-100 ml-2">
            Try it now →
          </a>
        </p>
        <button
          aria-label="Dismiss announcement"
          onClick={() => {
            localStorage.setItem("ampd_top_banner_dismissed", "1");
            setVisible(false);
          }}
          className="text-[#F5F3EF]/70 hover:text-[#F5F3EF] text-sm border border-[#D6B25E]/50 rounded-full px-3 py-1"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
