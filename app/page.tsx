import { HeroSection } from '@/components/sections/HeroSection';
import { PopularBrands } from '@/components/sections/PopularBrands';
import { NewArrivals } from '@/components/sections/NewArrivals';
import { TrustSection } from '@/components/sections/TrustSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { AppointmentFAQSection } from '@/components/sections/AppointmentFAQSection';
import { ContactTestimonialsSection } from '@/components/sections/ContactTestimonialsSection';

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
        <div className="w-full">
          <HeroSection />
          <TrustSection />
          <PopularBrands />
          <NewArrivals />
          {/* <FeaturedWatches /> */}
          <ServicesSection />
          <ProcessSection />
          {/* <InstagramSection /> */}
          <ContactTestimonialsSection />
          <AppointmentFAQSection />
        </div>
      </main>
    </>
  );
}
