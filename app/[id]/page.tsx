'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import imagesData from '../../data/images.json';

interface ImageData {
  id: string;
  thumb: string;
  img: string;
}

export default function PhotoPage() {
  const router = useRouter();
  const params = useParams();
  const currentId = params.id as string;

  const [images, setImages] = useState<ImageData[]>([]);
  const [currentVisibleIndex, setCurrentVisibleIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef<number>(0);

  // Função para obter uma imagem aleatória
  const getRandomImage = useCallback((): ImageData => {
    return imagesData[Math.floor(Math.random() * imagesData.length)];
  }, []);

  // Inicializar com a imagem atual e mais algumas
  useEffect(() => {
    const current = imagesData.find(img => img.id === currentId);
    if (current) {
      const initialImages = [
        current,
        getRandomImage(),
        getRandomImage(),
        getRandomImage(),
      ];
      setImages(initialImages);
    } else {
      // Se o ID não existir, redireciona para uma imagem aleatória
      const randomImage = imagesData[Math.floor(Math.random() * imagesData.length)];
      router.push(`/${randomImage.id}`);
    }
  }, [currentId, router, getRandomImage]);

  // Adicionar mais imagens quando estiver próximo ao final
  const loadMoreImages = useCallback(() => {
    setImages(prev => [...prev, getRandomImage(), getRandomImage()]);
  }, [getRandomImage]);

  // Detectar qual imagem está visível e atualizar URL
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 50% da imagem visível
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = imageRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1 && index !== currentVisibleIndex) {
            setCurrentVisibleIndex(index);
            const image = images[index];
            if (image) {
              // Atualizar URL sem recarregar a página
              window.history.replaceState(null, '', `/${image.id}`);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [images, currentVisibleIndex]);

  // Detectar quando estamos próximos ao final e carregar mais imagens
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollHeight = container.scrollHeight;
      const scrollTop = container.scrollTop;
      const clientHeight = container.clientHeight;

      // Se estiver a 2 telas do final, carregar mais
      if (scrollHeight - scrollTop - clientHeight < clientHeight * 2) {
        const now = Date.now();
        // Throttle para não carregar muitas vezes
        if (now - lastScrollTime.current > 500) {
          lastScrollTime.current = now;
          loadMoreImages();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [loadMoreImages]);

  // Função de download
  const handleDownload = async (image: ImageData) => {
    try {
      const response = await fetch(image.img);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Erro ao baixar imagem:', error);
    }
  };

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-y-scroll scroll-smooth snap-y snap-mandatory"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {images.map((image, index) => (
        <div
          key={`${image.id}-${index}`}
          ref={(el) => (imageRefs.current[index] = el)}
          className="relative w-full h-screen snap-start snap-always"
        >
          <Image
            src={image.img}
            alt={`Imagem ${image.id}`}
            fill
            className="object-cover"
            priority={index < 3}
            unoptimized
          />

          {/* Botão de download */}
          <button
            onClick={() => handleDownload(image)}
            className="absolute bottom-8 right-8 bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 font-medium z-10"
            aria-label="Download imagem"
          >
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
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download
          </button>

          {/* Indicador de scroll - apenas na primeira imagem */}
          {index === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
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
          )}
        </div>
      ))}
    </div>
  );
}
