import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedCars from "@/components/home/FeaturedCars";
import BrandStory from "@/components/home/BrandStory";
import TrustMetrics from "@/components/home/TrustMetrics";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

// Featured Cars reads live from Firestore — without this, Next statically
// renders the homepage once and new/edited cars won't show up until a
// rebuild.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <Categories />
      <BrandStory />
      <TrustMetrics />
      <Testimonials />
      <CTASection />
    </>
  );
}
