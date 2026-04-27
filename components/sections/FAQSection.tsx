'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: 'Are all watches authenticated?',
      answer: 'Yes, every luxury watch in our collection undergoes rigorous authentication by our team of experts. We guarantee the authenticity of every timepiece we sell.',
    },
    {
      question: 'How do you determine the value of my watch?',
      answer: 'Our valuation process considers multiple factors including brand, model, condition, rarity, market demand, and current market trends. We provide fair, competitive offers based on real-time market data.',
    },
    {
      question: 'Can I trade my current watch for a different model?',
      answer: 'Absolutely. We offer flexible trade-in options. Bring your current watch, and we\'ll provide a fair valuation that can be applied toward your next purchase.',
    },
  ];
  
  return (
    <section className="py-24 bg-[#f8f8f8]" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-slate-100 rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between transition-colors focus:outline-none"
                >
                  <span className="font-medium text-slate-900 pr-8">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-slate-500 font-light leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
