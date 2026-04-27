import { Button } from '../ui/Button';

export const AppointmentSection = () => {
  return (
    <section id="appointment" className="py-24 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-4">
            Private Consultation
          </h2>
          <p className="text-lg text-slate-500 mb-10 font-light leading-relaxed">
            Meet with our horological experts to discuss your collection in person or virtually. Complete discretion and personalized service guaranteed.
          </p>
          <Button variant="outline" size="lg" className="px-10 text-sm uppercase tracking-widest border-slate-300">
            Schedule Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};
