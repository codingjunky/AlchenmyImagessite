import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import FeatureGrid from "@/components/FeatureGrid";
import UploadWorkspace from "@/components/UploadWorkspace";
import VideoPromptPanel from "@/components/VideoPromptPanel";
import ComingSoon from "@/components/ComingSoon";
import TopBanner from "@/components/TopBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <TopBanner />
      <Hero />
      <HowItWorks />
      <FeatureGrid />
      <UploadWorkspace />
      <VideoPromptPanel />
      <ComingSoon />
      <Footer />
    </main>
  );
}
