'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseAdProps {
  adSlot: string;
  onTimerComplete?: () => void;
}

export default function AdSenseAd({ adSlot, onTimerComplete }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (adRef.current && !isAdPushed.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, []);

  // Timer de 5 segundos
  useEffect(() => {
    const duration = 5000; // 5 segundos
    const interval = 50; // Atualizar a cada 50ms para suavidade
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsComplete(true);
        if (onTimerComplete) {
          onTimerComplete();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onTimerComplete]);

  return (
    <div className="relative w-full h-screen snap-start snap-always bg-black flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        <div ref={adRef} className="w-full">
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX" // Substitua pelo seu ID
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </div>

      {/* Indicador visual de que é um anúncio */}
      <div className="absolute top-4 left-4 text-white/50 text-xs uppercase tracking-wider">
        Anúncio
      </div>

      {/* Barra de progresso e mensagem */}
      {!isComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 space-y-3">
            <p className="text-white text-center text-sm">
              Aguarde {Math.ceil((100 - progress) / 20)} segundos para continuar...
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className="bg-white h-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Indicador de que pode continuar */}
      {isComplete && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm">Arraste para continuar</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
