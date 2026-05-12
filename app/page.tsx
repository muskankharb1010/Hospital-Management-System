import { Navbar } from "@/components/home/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { NoticesAndStats } from "@/components/home/notices-stats";
import { KeyFeatures } from "@/components/home/key-features";
import { Testimonials } from "@/components/home/testimonials";
import { ContactSection } from "@/components/home/contact-section";
import { FooterActions, Footer } from "@/components/home/footer-actions";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <NoticesAndStats />
      <KeyFeatures />
      <Testimonials />
      <ContactSection />
      <FooterActions />
      <Footer />
    </main>
  );
}
