export default function ComingSoon() {
  const proFeatures = [
    {
      tier: "Pro",
      title: "Prompt Vault",
      description: "Save, organize, and remix your best prompts"
    },
    {
      tier: "Prompter License",
      title: "Advanced Controls",
      description: "Advanced sliders + new style packs"
    },
    {
      tier: "Prompter Pro",
      title: "Creator Suite",
      description: "Storyboard builder, video template packs, experimental modes"
    }
  ];

  const additionalFeatures = [
    "Voice-to-Prompt",
    "Creator Dashboard",
    "Remix Credits",
    "Quickshare Links"
  ];

  return (
    <section className="relative py-24 px-6 bg-ink-2">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-4">
            Coming Soon
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6" />
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Pro tiers unlock the full power of visual alchemy
          </p>
        </div>

        {/* Pro Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {proFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative p-8 rounded-2xl bg-ink border border-gold/30 
                         hover:border-gold transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(214,178,94,0.2)]"
            >
              {/* Tier Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gold/10 border border-gold mb-6">
                <span className="text-sm font-bold text-gold uppercase tracking-wider">
                  {feature.tier}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-paper mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="text-center">
          <p className="text-lg text-muted mb-6">
            Plus these powerful features:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="px-6 py-3 rounded-full bg-ink border border-gold/20 
                           hover:border-gold/50 transition-colors duration-300"
              >
                <span className="text-paper font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
