import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { PopularBrands } from '@/components/sections/PopularBrands';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { TrustSection } from '@/components/sections/TrustSection';
import { FeaturedWatches } from '@/components/sections/FeaturedWatches';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AppointmentFAQSection } from '@/components/sections/AppointmentFAQSection';
import { ContactTestimonialsSection } from '@/components/sections/ContactTestimonialsSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        <div className="w-full">
          <HeroSection />
          <TrustSection />
          <PopularBrands />
          <NewArrivals />
          <ContactTestimonialsSection />
          {/* <FeaturedWatches /> */}
          <ServicesSection />
          <ProcessSection />
          {/* <InstagramSection /> */}
          <AppointmentFAQSection />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
