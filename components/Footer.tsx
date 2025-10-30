import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 px-6 bg-ink border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <button className="group relative px-12 py-5 text-lg font-semibold text-ink bg-gold rounded-full transition-all duration-300 ease-out hover:bg-gold-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(214,178,94,0.5)] focus:outline-none focus:ring-4 focus:ring-gold/50">
            Enter the Beta Experience
          </button>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-4">
            <Image
              src="/AmpStudio_Logo.png"
              alt="AMP Studios"
              width={180}
              height={180}
              className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_15px_rgba(214,178,94,0.2)]"
            />
          </div>

          <p className="text-muted text-center text-sm md:text-base">
            Powered by Claude + AMP Studios. © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  );
}
