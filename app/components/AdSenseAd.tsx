'use client';

import { useEffect, useRef } from 'react';

interface AdSenseAdProps {
  adSlot: string;
}

export default function AdSenseAd({ adSlot }: AdSenseAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdPushed = useRef(false);

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
    </div>
  );
}
