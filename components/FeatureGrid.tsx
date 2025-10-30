export default function FeatureGrid() {
  const features = [
    {
      title: "Identity Locks",
      description: "Ethnicity, Hair, Eye — never overridden by presets or AMP'd Meter",
      icon: "🔒",
      highlight: true
    },
    {
      title: "Style Presets",
      description: "8 cinematic styles from noir to cyberpunk",
      icon: "🎨"
    },
    {
      title: "Smart Lighting",
      description: "Cinematic, natural, soft, hard, neon, studio",
      icon: "💡"
    },
    {
      title: "Aspect Ratios",
      description: "1:1, 3:2, 4:5, 16:9, 9:16 — optimized for any platform",
      icon: "📐"
    },
    {
      title: "Camera Angles",
      description: "Eye-level, low, high, top-down perspectives",
      icon: "📷"
    },
    {
      title: "AMP'd Meter",
      description: "Dial the alchemy from subtle to full transformation",
      icon: "⚡"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-ink">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-4">
            Features
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Professional-grade controls that respect your vision
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative group p-8 rounded-2xl border-2 transition-all duration-300
                ${feature.highlight 
                  ? 'bg-gold/5 border-gold shadow-[0_0_20px_rgba(214,178,94,0.2)] hover:shadow-[0_0_40px_rgba(214,178,94,0.4)]' 
                  : 'bg-ink-2 border-ink-2 hover:border-gold/50 hover:bg-ink-2/80'
                }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>

              {/* Title */}
              <h3 className={`text-2xl font-bold mb-3 ${feature.highlight ? 'text-gold' : 'text-paper'}`}>
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>

              {/* Highlight indicator for Identity Locks */}
              {feature.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gold text-ink">
                    PROTECTED
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Style Presets Showcase */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-paper text-center mb-12">
            8 Signature Style Presets
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Cinematic Noir",
              "Anime Essence", 
              "Fantasy Dreamscape",
              "Futuristic Cyberpunk",
              "Vintage Film",
              "Natural Documentary",
              "Mystical Portrait",
              "Urban Street Art"
            ].map((preset, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-ink-2 border border-ink-2 
                           hover:border-gold transition-all duration-300 cursor-pointer
                           hover:shadow-[0_0_20px_rgba(214,178,94,0.2)]"
              >
                <p className="text-paper font-medium text-center group-hover:text-gold transition-colors">
                  {preset}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
