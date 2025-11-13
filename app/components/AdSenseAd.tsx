"use client";

import { useEffect, useRef, useState } from "react";

interface AdSenseAdProps {
  adSlot: string;
  onTimerComplete?: () => void;
}

export default function AdSenseAd({ adSlot, onTimerComplete }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);
  const timerStarted = useRef(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detectar quando o anúncio entra na viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !timerStarted.current) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 } // Trigger quando 50% do anúncio estiver visível
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Carregar o AdSense
  useEffect(() => {
    if (adRef.current && !isAdPushed.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdPushed.current = true;
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  // Timer de 5 segundos - só inicia quando o anúncio fica visível
  useEffect(() => {
    if (!isVisible || timerStarted.current) return;

    timerStarted.current = true;
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
        onTimerComplete?.();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, onTimerComplete]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen snap-start snap-always bg-black flex items-center justify-center"
      style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
    >
      {/* Anúncio ocupa 100% da tela */}
      <div
        ref={adRef}
        className="w-full h-full flex items-center justify-center p-4"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%", height: "100%" }}
          data-ad-client={process.env.NEXT_PUBLIC_CA_PUB_KEY} // Substitua pelo seu ID
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>

      {/* Indicador visual de que é um anúncio */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded text-white/70 text-xs uppercase tracking-wider z-20">
        Advertisement
      </div>

      {/* Barra de progresso e mensagem - Só mostra se visível */}
      {isVisible && !isComplete && (
        <div className="absolute bottom-[120px] left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-8 px-4 z-20">
          <div className="max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-5 space-y-3 shadow-2xl border border-white/10">
            <p className="text-white text-center text-base font-medium">
              Wait {Math.ceil((100 - progress) / 20)} seconds to continue...
            </p>
            <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden border border-white/10">
              <div
                className="bg-white h-full transition-all duration-100 ease-linear rounded-full shadow-lg"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Indicador de que pode continuar */}
      {isComplete && (
        <div className="absolute bottom-[120px] left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex flex-col items-center gap-2 animate-bounce border border-white/20">
            <p className="text-white text-sm font-medium">Scroll to continue</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
