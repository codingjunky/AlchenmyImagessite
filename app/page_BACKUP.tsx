'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F5F3EF] overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D6B25E]/5 via-transparent to-[#D6B25E]/3" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D6B25E]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#F0D58B]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      {/* Main Container */}
      <div className="relative z-10">
        {/* Navigation - ENLARGED LOGO */}
        <nav className="px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image 
              src="/AMP_d_Images_logo.png" 
              alt="AMP'd Images" 
              width={80} 
              height={80}
            />
            <span className="text-sm text-[#9CA3AF] font-medium">BETA v2.3.1</span>
          </div>
          <div className="flex items-center gap-3">
            <Image 
              src="/AMP_Studios_logo.png" 
              alt="AMP Studios" 
              width={60} 
              height={60}
            />
            <span className="text-sm text-[#9CA3AF]">Powered by AMP Studios</span>
          </div>
        </nav>

        {/* Hero Section - MASSIVELY ENLARGED LOGO */}
        <section className="max-w-6xl mx-auto px-8 py-20 text-center">
          <div className="space-y-8 animate-fadeInUp">
            {/* Logo - MULTIPLY BLEND MODE */}
            <div className="flex justify-center mb-12">
              <Image 
                src="/AMP_d_Images_logo.png" 
                alt="AMP'd Images" 
                width={450} 
                height={450}
                priority
               className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] drop-shadow-2xl"
              />
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
                Visual Alchemy, AMP'd.
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-xl md:text-2xl text-[#9CA3AF] max-w-3xl mx-auto">
              Instant cinematic remixes — no prompt required. Upload. Dial the AMP'd Meter. Unleash.
            </p>

            {/* Email Capture - Optional */}
            <div className="pt-8 max-w-xl mx-auto">
              <div className="p-6 bg-gradient-to-br from-[#121214] to-[#0B0B0C] border border-[#D6B25E]/20 rounded-2xl mb-8">
                <h3 className="text-lg font-bold text-[#D6B25E] mb-2 flex items-center justify-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Join the Beta List
                </h3>
                <p className="text-sm text-[#9CA3AF] mb-4 text-center">
                  Get early access to premium features, exclusive styles & creator updates
                </p>
                <form 
                  name="beta-list" 
                  method="POST" 
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input type="hidden" name="form-name" value="beta-list" />
                  <div className="hidden">
                    <label>
                      Don't fill this out if you're human: <input name="bot-field" />
                    </label>
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-[#0B0B0C] border border-[#D6B25E]/30 rounded-lg text-[#F5F3EF] placeholder-[#9CA3AF]/50 focus:border-[#D6B25E] focus:outline-none transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold rounded-lg hover:shadow-lg hover:shadow-[#D6B25E]/20 transition-all duration-300"
                  >
                    Join List
                  </button>
                </form>
                <p className="text-xs text-[#9CA3AF]/60 mt-3 text-center">
                  ✨ First 100 beta users get lifetime premium access
                </p>
              </div>

              <div className="text-center mb-4">
                <p className="text-sm text-[#9CA3AF]/80">— or skip and jump right in —</p>
              </div>
            </div>

            {/* Primary CTA */}
            <div>
              <Link 
                href="/studio.html" 
                className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold text-lg rounded-full hover:shadow-xl hover:shadow-[#D6B25E]/30 transform hover:scale-105 transition-all duration-300"
              >
                Enter Beta Experience
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <p className="text-sm text-[#9CA3AF]/60 mt-4">Step into the Studio</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-16 text-[#F5F3EF]">How It Works</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Enter the Studio",
                desc: "Step into the AMP'd workspace."
              },
              {
                step: "2",
                title: "Pick Your Style + Prompt Type",
                desc: "Choose Photographic looks or Video Prompts; AMP'd guides the settings."
              },
              {
                step: "3",
                title: "Upload & Tune",
                desc: "Drop your image and ride the AMP'd Meter from subtle to cinematic."
              },
              {
                step: "4",
                title: "Generate & Share",
                desc: "Export prompts or previews and keep creating."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-[#121214] border border-[#D6B25E]/20 rounded-xl p-6 hover:border-[#D6B25E]/40 transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-[#D6B25E]/30 mb-4">{item.step}</div>
                  <h3 className="text-lg font-bold text-[#F5F3EF] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Styles */}
        <section className="max-w-6xl mx-auto px-8 py-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#F5F3EF]">Signature Styles</h2>
          <p className="text-center text-[#9CA3AF] mb-12">Six core looks to set the vibe</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Photographic", "Cinematic", "Anime", "Digital Art", "Oil Painting", "Pixel Art"].map((style) => (
              <div key={style} className="bg-[#121214] border border-[#D6B25E]/20 rounded-lg px-6 py-4 text-center hover:border-[#D6B25E]/40 hover:bg-[#D6B25E]/5 transition-all duration-300">
                <span className="text-[#F5F3EF] font-medium">{style}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-6xl mx-auto px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-[#D6B25E]">Core Features</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">Video Prompting (Powered by AMP'd AI)</h4>
                  <p className="text-sm text-[#9CA3AF]">Guided, camera-smart settings for video-first workflows.</p>
                </div>
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">AMP'd Meter</h4>
                  <p className="text-sm text-[#9CA3AF]">Your intensity dial: clean → cinematic → extreme.</p>
                </div>
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">Multi-format Outputs</h4>
                  <p className="text-sm text-[#9CA3AF]">Ready for your favorite generators and pipelines.</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-[#D6B25E]">Coming Soon — Premium</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">Nano/Macro Photography</h4>
                  <p className="text-sm text-[#9CA3AF]">Extreme close-up and detail enhancement.</p>
                </div>
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">Skin-Tone Mastery</h4>
                  <p className="text-sm text-[#9CA3AF]">Precise, natural grading for perfect portraits.</p>
                </div>
                <div className="border-l-2 border-[#D6B25E]/30 pl-6">
                  <h4 className="font-bold text-[#F5F3EF] mb-2">Prompting Vaults</h4>
                  <p className="text-sm text-[#9CA3AF]">Save, organize, and remix your greatest hits.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Suite */}
        <section className="max-w-6xl mx-auto px-8 py-20">
          <div className="bg-gradient-to-br from-[#121214] to-[#0B0B0C] border border-[#D6B25E]/20 rounded-2xl p-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-[#D6B25E]">Creator Suite (Beta Roadmap)</h3>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-3xl mb-3">🎬</div>
                <h4 className="font-bold text-[#F5F3EF] mb-2">Storyboard Builder</h4>
                <p className="text-sm text-[#9CA3AF]">Visual scene planning</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📦</div>
                <h4 className="font-bold text-[#F5F3EF] mb-2">Video Template Packs</h4>
                <p className="text-sm text-[#9CA3AF]">Pre-built motion styles</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🔬</div>
                <h4 className="font-bold text-[#F5F3EF] mb-2">Experimental Modes</h4>
                <p className="text-sm text-[#9CA3AF]">Cutting-edge features</p>
              </div>
            </div>

            <div className="border-t border-[#D6B25E]/20 pt-8">
              <h4 className="font-bold text-center mb-6 text-[#F5F3EF]">Power Features</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {["Voice-to-Prompt", "Creator Dashboard", "QuickShare Links"].map((feature) => (
                  <span key={feature} className="px-4 py-2 bg-[#0B0B0C] border border-[#D6B25E]/30 rounded-full text-sm text-[#9CA3AF]">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="max-w-4xl mx-auto px-8 py-20 text-center">
          <div className="bg-gradient-to-r from-[#D6B25E]/10 to-[#F0D58B]/10 border border-[#D6B25E]/30 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6 text-[#F5F3EF]">Ready to Transform Your Visuals?</h2>
            <p className="text-lg text-[#9CA3AF] mb-8">Join the beta and experience visual alchemy</p>
            <Link 
              href="/studio.html" 
              className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold text-lg rounded-full hover:shadow-xl hover:shadow-[#D6B25E]/30 transform hover:scale-105 transition-all duration-300"
            >
              Enter Beta Experience
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Footer - ENHANCED BRANDING */}
        <footer className="border-t border-[#D6B25E]/10 mt-20">
          <div className="max-w-6xl mx-auto px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <Image 
                  src="/AMP_Studios_logo.png" 
                  alt="AMP Studios" 
                  width={80} 
                  height={80}
                />
                <div>
                  <p className="text-sm text-[#9CA3AF]">Powered by Claude + AMP Studios</p>
                  <p className="text-xs text-[#9CA3AF]/60">© 2025 AMP Studios. All rights reserved.</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <a 
                  href="mailto:getampdimages@gmail.com" 
                  className="text-sm text-[#D6B25E] hover:text-[#F0D58B] transition-colors flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Send Beta Feedback
                </a>
                <p className="text-xs text-[#9CA3AF]/60 italic">
                  Mobile version in the works
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
