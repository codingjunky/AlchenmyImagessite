'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Generate particles data once
const generateParticles = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${15 + Math.random() * 10}s`
  }));
};

export default function LandingPage() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    top: string;
    delay: string;
    duration: string;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate particles only on client
    setParticles(generateParticles());
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-[#F5F3EF] overflow-hidden relative">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Rich gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D6B25E]/10 via-transparent to-[#D6B25E]/5" />
        
        {/* Animated orbs - Multiple layers for depth */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#D6B25E]/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-32 w-72 h-72 bg-[#F0D58B]/15 rounded-full blur-3xl animate-pulse-slower" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#D6B25E]/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-40 w-80 h-80 bg-[#F0D58B]/15 rounded-full blur-3xl animate-pulse-slower" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#D6B25E]/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Floating particles - Only render on client */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-[#D6B25E]/40 rounded-full animate-particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.delay,
                  animationDuration: particle.duration
                }}
              />
            ))}
          </div>
        )}

        {/* Radial gradient spotlight effect */}
        <div className="absolute inset-0 bg-radial-spotlight opacity-30" />
      </div>

      {/* Main Container */}
      <div className="relative z-10">
        {/* Premium Navigation */}
        <nav className="px-8 py-6 flex justify-between items-center backdrop-blur-sm bg-[#0B0B0C]/50 border-b border-[#D6B25E]/10">
          <div className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D6B25E]/20 rounded-full blur-xl group-hover:bg-[#D6B25E]/30 transition-all duration-500" />
              <Image 
                src="/AMP_d_Images_logo.png" 
                alt="AMP'd Images" 
                width={80} 
                height={80}
                className="relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="text-sm text-[#9CA3AF] font-medium px-3 py-1 bg-[#D6B25E]/10 border border-[#D6B25E]/20 rounded-full">
              BETA v2.3.1
            </span>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-[#D6B25E]/20 rounded-full blur-xl group-hover:bg-[#D6B25E]/30 transition-all duration-500" />
              <Image 
                src="/AMP_Studios_logo.png" 
                alt="AMP Studios" 
                width={60} 
                height={60}
                className="relative z-10 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <span className="text-sm text-[#9CA3AF]">Powered by AMP Studios</span>
          </div>
        </nav>

        {/* Hero Section - ELEVATED */}
        <section className="max-w-6xl mx-auto px-8 py-20 text-center relative">
          <div className="space-y-8">
            {/* Logo with dramatic entrance */}
            <div className="flex justify-center mb-12 relative animate-fadeInScale">
              {/* Glow ring effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-[#D6B25E]/10 rounded-full blur-3xl animate-pulse-glow" />
              </div>
              
              {/* Rotating subtle ring */}
              <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
                <div className="w-[480px] h-[480px] border-2 border-[#D6B25E]/10 rounded-full" />
              </div>
              
              <Image 
                src="/AMP_d_Images_logo.png" 
                alt="AMP'd Images" 
                width={450} 
                height={450}
                priority
                className="relative z-10 w-[250px] h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] drop-shadow-2xl filter brightness-110"
              />
            </div>

            {/* Headline with shimmer effect */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-tight animate-fadeInUp">
              <span className="bg-gradient-to-r from-[#D6B25E] via-[#F0D58B] to-[#D6B25E] bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
                Visual Alchemy, AMP'd.
              </span>
            </h1>

            {/* Subhead with stagger animation */}
            <p className="text-xl md:text-2xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-200">
              Instant cinematic remixes — no prompt required. Upload. Dial the AMP'd Meter. Unleash.
            </p>

            {/* Email Capture - Premium Card */}
            <div className="pt-8 max-w-xl mx-auto animate-fadeInUp animation-delay-400">
              <div className="relative group">
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D6B25E]/20 to-[#F0D58B]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative p-8 bg-gradient-to-br from-[#121214] to-[#0B0B0C] border border-[#D6B25E]/30 rounded-2xl shadow-2xl mb-8 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-[#D6B25E] mb-3 flex items-center justify-center gap-2">
                    <span className="text-3xl animate-bounce-slow">🚀</span>
                    Join the Beta List
                  </h3>
                  <p className="text-sm text-[#9CA3AF] mb-6 text-center">
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
                      className="flex-1 px-5 py-4 bg-[#0B0B0C] border border-[#D6B25E]/30 rounded-xl text-[#F5F3EF] placeholder-[#9CA3AF]/50 focus:border-[#D6B25E] focus:outline-none focus:ring-2 focus:ring-[#D6B25E]/20 transition-all duration-300"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-10 py-4 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold rounded-xl hover:shadow-2xl hover:shadow-[#D6B25E]/40 transform hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn"
                    >
                      <span className="relative z-10">Join List</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#F0D58B] to-[#D6B25E] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </button>
                  </form>
                  <p className="text-xs text-[#D6B25E]/80 mt-4 text-center font-medium">
                    ✨ First 100 beta users get lifetime premium access
                  </p>
                </div>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-[#9CA3AF]/80">— or skip and jump right in —</p>
              </div>
            </div>

            {/* Primary CTA - DRAMATIC */}
            <div className="animate-fadeInUp animation-delay-600">
              <div className="relative inline-block group">
                {/* Animated glow ring */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D6B25E]/30 via-[#F0D58B]/30 to-[#D6B25E]/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 animate-pulse-glow transition-opacity duration-500" />
                
                <Link 
                  href="/studio.html" 
                  className="relative inline-flex items-center gap-3 px-14 py-6 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-[#D6B25E]/50 transform hover:scale-110 transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10">Enter Beta Experience</span>
                  <svg className="w-7 h-7 relative z-10 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              </div>
              <p className="text-sm text-[#9CA3AF]/60 mt-6 animate-pulse-subtle">Step into the Studio</p>
            </div>
          </div>
        </section>

        {/* How It Works - Enhanced */}
        <section className="max-w-6xl mx-auto px-8 py-24 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-20 text-[#F5F3EF]">
            <span className="bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Enter the Studio",
                desc: "Step into the AMP'd workspace.",
                icon: "🎨"
              },
              {
                step: "2",
                title: "Pick Your Style + Prompt Type",
                desc: "Choose Photographic looks or Video Prompts; AMP'd guides the settings.",
                icon: "🎭"
              },
              {
                step: "3",
                title: "Upload & Tune",
                desc: "Drop your image and ride the AMP'd Meter from subtle to cinematic.",
                icon: "⚡"
              },
              {
                step: "4",
                title: "Generate & Share",
                desc: "Export prompts or previews and keep creating.",
                icon: "🚀"
              }
            ].map((item, idx) => (
              <div key={idx} className="relative group animate-fadeInUp" style={{ animationDelay: `${idx * 100}ms` }}>
                {/* Hover glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D6B25E]/20 to-[#F0D58B]/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative bg-gradient-to-br from-[#121214] to-[#0B0B0C] border border-[#D6B25E]/20 rounded-xl p-8 hover:border-[#D6B25E]/50 transition-all duration-500 h-full transform hover:scale-105 hover:-translate-y-2">
                  {/* Icon with animation */}
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  
                  <div className="text-6xl font-bold text-[#D6B25E]/40 mb-4 group-hover:text-[#D6B25E]/60 transition-colors duration-300">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-[#F5F3EF] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{item.desc}</p>
                  
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#D6B25E]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature Styles - Premium Grid */}
        <section className="max-w-6xl mx-auto px-8 py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#F5F3EF]">
            <span className="bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
              Signature Styles
            </span>
          </h2>
          <p className="text-center text-[#9CA3AF] mb-16 text-lg">Six core looks to set the vibe</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Photographic", "Cinematic", "Anime", "Digital Art", "Oil Painting", "Pixel Art"].map((style, idx) => (
              <div 
                key={style} 
                className="relative group animate-fadeInUp"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D6B25E]/30 to-[#F0D58B]/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <div className="relative bg-[#121214] border border-[#D6B25E]/20 rounded-lg px-6 py-5 text-center hover:border-[#D6B25E]/50 hover:bg-[#D6B25E]/10 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  <span className="text-[#F5F3EF] font-semibold">{style}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Grid - Enhanced Layout */}
        <section className="max-w-6xl mx-auto px-8 py-24">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div className="animate-fadeInUp">
              <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
                Core Features
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Video Prompting (Powered by AMP'd AI)",
                    desc: "Guided, camera-smart settings for video-first workflows."
                  },
                  {
                    title: "AMP'd Meter",
                    desc: "Your intensity dial: clean → cinematic → extreme."
                  },
                  {
                    title: "Multi-format Outputs",
                    desc: "Ready for your favorite generators and pipelines."
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="group relative pl-6 border-l-2 border-[#D6B25E]/30 hover:border-[#D6B25E] transition-all duration-300">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#D6B25E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h4 className="font-bold text-[#F5F3EF] mb-2 text-lg">{feature.title}</h4>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="animate-fadeInUp animation-delay-200">
              <h3 className="text-3xl font-bold mb-10 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
                Coming Soon — Premium
              </h3>
              <div className="space-y-8">
                {[
                  {
                    title: "Nano/Macro Photography",
                    desc: "Extreme close-up and detail enhancement."
                  },
                  {
                    title: "Skin-Tone Mastery",
                    desc: "Precise, natural grading for perfect portraits."
                  },
                  {
                    title: "Prompting Vaults",
                    desc: "Save, organize, and remix your greatest hits."
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="group relative pl-6 border-l-2 border-[#D6B25E]/30 hover:border-[#D6B25E] transition-all duration-300">
                    <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#D6B25E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <h4 className="font-bold text-[#F5F3EF] mb-2 text-lg">{feature.title}</h4>
                    <p className="text-sm text-[#9CA3AF] leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Creator Suite - Premium Card */}
        <section className="max-w-6xl mx-auto px-8 py-24">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D6B25E]/20 via-[#F0D58B]/20 to-[#D6B25E]/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
            
            <div className="relative bg-gradient-to-br from-[#121214] to-[#0B0B0C] border border-[#D6B25E]/30 rounded-3xl p-16 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] bg-clip-text text-transparent">
                Creator Suite (Beta Roadmap)
              </h3>
              <div className="grid md:grid-cols-3 gap-10 mb-16">
                {[
                  { icon: "🎬", title: "Storyboard Builder", desc: "Visual scene planning" },
                  { icon: "📦", title: "Video Template Packs", desc: "Pre-built motion styles" },
                  { icon: "🔬", title: "Experimental Modes", desc: "Cutting-edge features" }
                ].map((item, idx) => (
                  <div key={idx} className="text-center group/card hover:transform hover:scale-105 transition-all duration-300">
                    <div className="text-5xl mb-4 group-hover/card:scale-110 transition-transform duration-300">{item.icon}</div>
                    <h4 className="font-bold text-[#F5F3EF] mb-3 text-lg">{item.title}</h4>
                    <p className="text-sm text-[#9CA3AF]">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#D6B25E]/20 pt-10">
                <h4 className="font-bold text-center mb-8 text-[#F5F3EF] text-xl">Power Features</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {["Voice-to-Prompt", "Creator Dashboard", "QuickShare Links"].map((feature, idx) => (
                    <span 
                      key={feature} 
                      className="px-6 py-3 bg-[#0B0B0C] border border-[#D6B25E]/30 rounded-full text-sm text-[#9CA3AF] hover:border-[#D6B25E] hover:text-[#F5F3EF] hover:bg-[#D6B25E]/10 transition-all duration-300 cursor-pointer transform hover:scale-105"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - SPECTACULAR */}
        <section className="max-w-4xl mx-auto px-8 py-24 text-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#D6B25E]/30 via-[#F0D58B]/30 to-[#D6B25E]/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
            
            <div className="relative bg-gradient-to-r from-[#D6B25E]/20 to-[#F0D58B]/20 border border-[#D6B25E]/40 rounded-3xl p-16 backdrop-blur-sm">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#F5F3EF]">
                Ready to Transform Your Visuals?
              </h2>
              <p className="text-xl text-[#9CA3AF] mb-12">Join the beta and experience visual alchemy</p>
              
              <div className="relative inline-block group/cta">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#D6B25E]/50 via-[#F0D58B]/50 to-[#D6B25E]/50 rounded-full blur-xl opacity-0 group-hover/cta:opacity-100 animate-pulse-glow transition-opacity duration-500" />
                
                <Link 
                  href="/studio.html" 
                  className="relative inline-flex items-center gap-3 px-14 py-6 bg-gradient-to-r from-[#D6B25E] to-[#F0D58B] text-[#0B0B0C] font-bold text-xl rounded-full hover:shadow-2xl hover:shadow-[#D6B25E]/50 transform hover:scale-110 transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10">Enter Beta Experience</span>
                  <svg className="w-7 h-7 relative z-10 group-hover/cta:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/cta:translate-x-[200%] transition-transform duration-1000" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Enhanced */}
        <footer className="border-t border-[#D6B25E]/10 mt-20 bg-gradient-to-b from-transparent to-[#0B0B0C]">
          <div className="max-w-6xl mx-auto px-8 py-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#D6B25E]/20 rounded-full blur-xl group-hover:bg-[#D6B25E]/30 transition-all duration-500" />
                  <Image 
                    src="/AMP_Studios_logo.png" 
                    alt="AMP Studios" 
                    width={80} 
                    height={80}
                    className="relative z-10"
                  />
                </div>
                <div>
                  <p className="text-sm text-[#9CA3AF]">Powered by Claude + AMP Studios</p>
                  <p className="text-xs text-[#9CA3AF]/60">© 2025 AMP Studios. All rights reserved.</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                <a 
                  href="mailto:getampdimages@gmail.com" 
                  className="text-sm text-[#D6B25E] hover:text-[#F0D58B] transition-colors flex items-center gap-2 group"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Enhanced Animation Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
          }
        }
        
        @keyframes pulse-slower {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.4;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(100px);
            opacity: 0;
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }
        
        .animate-fadeInScale {
          animation: fadeInScale 1.2s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        .animate-particle {
          animation: particle 20s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 4s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .bg-radial-spotlight {
          background: radial-gradient(
            circle at 50% 0%,
            rgba(212, 175, 55, 0.15) 0%,
            transparent 70%
          );
        }
      `}</style>
    </div>
  );
}
