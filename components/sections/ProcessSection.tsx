'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'Connect with our experts to discuss your specific requirements. Whether buying, selling, or trading, we ensure absolute confidentiality.',
    },
    {
      number: '02',
      title: 'Expert Evaluation',
      description: 'Our master watchmakers and market analysts authenticate and evaluate your timepiece, providing a transparent and competitive assessment.',
    },
    {
      number: '03',
      title: 'Secure Transaction',
      description: 'Finalize the deal through our secure banking channels or in-person at our private showroom, ensuring peace of mind every step of the way.',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section className="py-18 bg-white relative overflow-hidden border-t border-slate-100" ref={containerRef}>
      {/* Subtle Premium Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Side: Title */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:w-1/3 lg:sticky lg:top-32"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-blue-500"></div>
              <span className="text-slate-400 font-medium text-xs tracking-[0.3em] uppercase">
                How It Works
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-[#050B14] tracking-tight leading-[1.1] mb-6">
              A Seamless <br/> Experience
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-500 text-lg leading-relaxed font-light">
              We have refined the process of acquiring and selling luxury timepieces into a secure, effortless journey tailored to the most discerning collectors.
            </motion.p>
          </motion.div>
          
          {/* Right Side: Timeline */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="lg:w-2/3 flex flex-col gap-12 lg:gap-16 relative"
          >
            {/* Background Line */}
            <div className="absolute left-6.75 md:left-9.75 top-4 bottom-4 w-0.5 bg-slate-100" />
            
            {/* Animated Glowing Progress Line */}
            <motion.div 
              className="absolute left-6.75 md:left-9.75 top-4 w-0.5 bg-primary origin-top shadow-[0_0_10px_rgba(30,58,95,0.5)]" 
              style={{ height: lineHeight }}
            />
            
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="relative flex gap-6 md:gap-10 group"
              >
                {/* Large Number / Node */}
                <div className="relative z-10 shrink-0 bg-white py-2">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-silver/30 bg-slate-50 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-colors duration-500 shadow-sm group-hover:shadow-[0_0_20px_rgba(30,58,95,0.2)]">
                    <span className="text-lg md:text-2xl font-serif font-medium text-silver group-hover:text-white transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="pt-3 md:pt-5 pb-8 border-b border-slate-100 group-last:border-none w-full">
                  <h3 className="text-2xl md:text-3xl font-serif font-medium text-primary mb-4 group-hover:text-primary/80 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 font-light text-base md:text-lg leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </div>
                
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
