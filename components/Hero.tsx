import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-ink-2 via-ink to-ink opacity-50" />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-1">
        <div className="flex justify-center -mb-24 md:-mb-32">
          <Image
            src="/Ampd_Image_logo.png"
            alt="AMP'd Images Logo"
            width={900}
            height={900}
            priority
            className="w-[450px] h-[450px] md:w-[650px] md:h-[650px] lg:w-[850px] lg:h-[850px] object-contain drop-shadow-[0_0_30px_rgba(214,178,94,0.5)]"
          />
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-paper leading-tight">
          Visual Alchemy, AMP'd.
        </h1>

        <p className="text-xl md:text-2xl lg:text-3xl text-muted max-w-3xl mx-auto leading-tight">
          Instant cinematic remixes — no prompt required. Upload. Dial the AMP'd Meter. Unleash.
        </p>

        <div className="pt-2">
          <button className="group relative px-12 py-5 text-lg font-semibold text-ink bg-gold rounded-full transition-all duration-300 ease-out hover:bg-gold-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(214,178,94,0.5)] focus:outline-none focus:ring-4 focus:ring-gold/50">
            Enter the Beta Experience
          </button>
        </div>

        <p className="text-sm md:text-base text-muted pt-1">
          Limited-time free beta. Powered by Claude + AMP Studios.
        </p>
      </div>

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
    </section>
  );
}
