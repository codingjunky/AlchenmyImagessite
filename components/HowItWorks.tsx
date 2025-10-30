export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload your image",
      description: "≤ 10MB"
    },
    {
      number: "2", 
      title: "Choose your style + set AMP'd Meter",
      description: ""
    },
    {
      number: "3",
      title: "Copy your prompt",
      description: "image or video-ready"
    }
  ];

  return (
    <section className="relative py-24 px-6 bg-ink-2">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-paper mb-4">
            How It Works
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Number Circle */}
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-ink border-2 border-gold flex items-center justify-center 
                                transition-all duration-300 group-hover:bg-gold/10 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(214,178,94,0.3)]">
                  <span className="text-4xl font-bold text-gold">{step.number}</span>
                </div>
                
                {/* Connector Line (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-gold to-gold/20" 
                       style={{ transform: 'translateY(-50%)' }} />
                )}
              </div>

              {/* Step Content */}
              <h3 className="text-xl md:text-2xl font-semibold text-paper mb-2">
                {step.title}
              </h3>
              {step.description && (
                <p className="text-muted text-lg">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
