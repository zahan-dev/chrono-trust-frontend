'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnalogClock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    // Delay first update to next tick to avoid synchronous update during render
    const timeout = setTimeout(() => {
      setTime(new Date());
      interval = setInterval(() => {
        setTime(new Date());
      }, 50); // High frequency for smooth second hand
    }, 0);
    
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  if (!time) return <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 rounded-full border border-slate-800/50 bg-[#02050A]" />;

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Calculate degrees
  // Smooth second hand: 360 deg / 60 sec = 6 deg per sec, plus fraction of current second
  const secondsDegrees = (seconds + milliseconds / 1000) * 6;
  const minutesDegrees = minutes * 6 + seconds * 0.1;
  const hoursDegrees = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-100 lg:h-100 rounded-full border border-slate-800/50 bg-[#02050A] shadow-2xl flex items-center justify-center overflow-hidden">
      
      {/* Outer bezel ring */}
      <div className="absolute inset-2 rounded-full border border-white/5 bg-linear-to-tr from-[#050B14] to-[#0A1526] shadow-[inset_0_0_20px_rgba(0,0,0,1)]" />

      {/* Inner dial */}
      <div className="absolute inset-4 rounded-full border border-white/10 bg-[#03060C] shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]" />

      {/* Dial markings (Minutes/Seconds) */}
      {[...Array(60)].map((_, i) => (
        <div
          key={`min-${i}`}
          className="absolute w-full h-full"
          style={{ transform: `rotate(${i * 6}deg)` }}
        >
          <div 
            className={`mx-auto ${i % 5 === 0 ? 'w-0.5 h-3 bg-white/60 mt-4' : 'w-px h-1.5 bg-white/20 mt-4'}`}
          />
        </div>
      ))}
      
      {/* Hour Markers */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`hour-${i}`}
          className="absolute w-full h-full"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <div className="mx-auto w-1.5 h-6 bg-linear-to-b from-white to-silver/50 mt-5 rounded-sm shadow-[0_0_5px_rgba(255,255,255,0.2)]" />
        </div>
      ))}
      
      {/* Brand Text */}
      <div className="absolute text-[12px] sm:text-[14px] tracking-[0.3em] text-white/80 uppercase font-serif top-[25%] drop-shadow-md">
        ChronoTrust
      </div>
      
      {/* Subtext */}
      <div className="absolute text-[8px] sm:text-[10px] tracking-widest text-white/40 uppercase bottom-[25%] flex flex-col items-center">
        <span className="mb-1">Automatic</span>
        <span>Swiss Parts</span>
      </div>

      {/* Hour Hand */}
      <motion.div
        className="absolute w-1.5 sm:w-2 h-20 sm:h-24 lg:h-28 bg-linear-to-t from-white/90 to-white/60 rounded-full origin-bottom shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        style={{ rotate: hoursDegrees, bottom: '50%' }}
      >
        {/* Lume on hour hand */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-blue-100/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
      </motion.div>
      
      {/* Minute Hand */}
      <motion.div
        className="absolute w-1 sm:w-1.5 h-28 sm:h-36 lg:h-44 bg-linear-to-t from-white/90 to-white/60 rounded-full origin-bottom shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        style={{ rotate: minutesDegrees, bottom: '50%' }}
      >
        {/* Lume on minute hand */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-0.5 h-20 bg-blue-100/80 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
      </motion.div>
      
      {/* Second Hand - Smooth motion */}
      <motion.div
        className="absolute w-px sm:w-[1.5px] h-32 sm:h-40 lg:h-48 bg-blue-400 rounded-full origin-bottom shadow-[0_0_8px_rgba(59,130,246,0.6)]"
        style={{ rotate: secondsDegrees, bottom: '50%' }}
      />
      
      {/* Counterweight for second hand */}
      <motion.div
        className="absolute w-px sm:w-[1.5px] h-6 sm:h-8 lg:h-10 bg-blue-400 rounded-full origin-top"
        style={{ rotate: secondsDegrees, top: '50%' }}
      >
        {/* Circle on counterweight */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-blue-400 bg-[#02050A]" />
      </motion.div>

      {/* Center dot/pinion */}
      <div className="absolute w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-linear-to-br from-white to-silver shadow-[0_2px_5px_rgba(0,0,0,0.5)] z-10" />
      <div className="absolute w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-blue-500 z-20" />
      
      {/* Glass reflection/dome effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.15),transparent_50%)] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 rounded-full pointer-events-none transform -rotate-45" />
    </div>
  );
}
