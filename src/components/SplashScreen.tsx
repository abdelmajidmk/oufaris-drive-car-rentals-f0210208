import { useEffect, useState } from 'react';
import carLogo from '@/assets/car-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [phase, setPhase] = useState<'initial' | 'logo' | 'text' | 'exit'>('initial');

  useEffect(() => {
    // Phase 1: Show logo with car animation
    const timer1 = setTimeout(() => setPhase('logo'), 100);
    // Phase 2: Show text
    const timer2 = setTimeout(() => setPhase('text'), 800);
    // Phase 3: Exit animation
    const timer3 = setTimeout(() => setPhase('exit'), 2500);
    // Complete
    const timer4 = setTimeout(onComplete, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-dark transition-all duration-700 ${
        phase === 'exit' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Road lines animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[45%] left-0 right-0 h-1 flex gap-8 animate-road-lines">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="w-16 h-1 bg-gold/30 rounded-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Car logo with driving animation */}
        <div 
          className={`relative transition-all duration-1000 ease-out ${
            phase === 'initial' 
              ? '-translate-x-[200%] opacity-0' 
              : phase === 'logo' || phase === 'text'
              ? 'translate-x-0 opacity-100'
              : 'translate-x-0 opacity-100'
          }`}
        >
          {/* Glow behind car */}
          <div className={`absolute inset-0 bg-gold/30 blur-3xl rounded-full scale-150 transition-opacity duration-500 ${
            phase === 'logo' || phase === 'text' ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Car image */}
          <img 
            src={carLogo} 
            alt="Ou Faris Drive Car" 
            className={`relative w-64 h-64 object-contain transition-transform duration-300 ${
              phase === 'logo' ? 'animate-car-bounce' : ''
            }`}
          />
          
          {/* Speed lines */}
          <div className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full flex flex-col gap-2 transition-opacity duration-500 ${
            phase === 'logo' ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-20 h-0.5 bg-gradient-to-l from-gold to-transparent animate-speed-line" />
            <div className="w-16 h-0.5 bg-gradient-to-l from-gold/70 to-transparent animate-speed-line" style={{ animationDelay: '0.1s' }} />
            <div className="w-24 h-0.5 bg-gradient-to-l from-gold/50 to-transparent animate-speed-line" style={{ animationDelay: '0.2s' }} />
          </div>
        </div>

        {/* Text content */}
        <div 
          className={`mt-8 text-center transition-all duration-700 ${
            phase === 'text' || phase === 'exit'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-2">
            <span className="text-gradient-gold">Ou Faris</span>
          </h1>
          <p className="text-gold font-semibold tracking-[0.3em] uppercase text-lg">
            Drive Car
          </p>
          <p className="text-primary-foreground/60 mt-4 text-sm tracking-wider">
            Location de Voitures Premium
          </p>
        </div>

        {/* Loading bar */}
        <div className={`mt-12 w-48 h-1 bg-gold/20 rounded-full overflow-hidden transition-opacity duration-500 ${
          phase === 'text' ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="h-full bg-gold-gradient rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
