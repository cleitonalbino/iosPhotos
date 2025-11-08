"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import imagesData from "../../data/images.json";
import AdSenseAd from "../components/AdSenseAd";

interface ImageData {
  id: string;
  thumb: string;
  img: string;
}

interface PhotoViewerProps {
  initialImage: ImageData;
}

export default function PhotoViewer({ initialImage }: PhotoViewerProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isLoadingRef = useRef(false);
  const initializedRef = useRef(false);

  // Pool de imagens embaralhadas e índice atual
  const shuffledPoolRef = useRef<ImageData[]>([]);
  const currentIndexRef = useRef(0);

  // Função para embaralhar array (Fisher-Yates shuffle)
  const shuffleArray = useCallback((array: ImageData[]): ImageData[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Função para obter a próxima imagem sem repetição
  const getNextImage = useCallback((): ImageData => {
    // Se o pool estiver vazio ou chegamos ao fim, reembaralhamos
    if (
      shuffledPoolRef.current.length === 0 ||
      currentIndexRef.current >= shuffledPoolRef.current.length
    ) {
      shuffledPoolRef.current = shuffleArray(imagesData);
      currentIndexRef.current = 0;
    }

    const nextImage = shuffledPoolRef.current[currentIndexRef.current];
    currentIndexRef.current += 1;
    return nextImage;
  }, [shuffleArray]);

  // Inicializar com a imagem atual e mais algumas
  useEffect(() => {
    if (initializedRef.current) return;

    initializedRef.current = true;

    // Inicializar o pool embaralhado removendo a imagem atual
    const otherImages = imagesData.filter((img) => img.id !== initialImage.id);
    shuffledPoolRef.current = shuffleArray(otherImages);
    currentIndexRef.current = 0;

    const initialImages = [
      initialImage,
      getNextImage(),
      getNextImage(),
      getNextImage(),
      getNextImage(),
    ];
    setImages(initialImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Adicionar mais imagens quando estiver próximo ao final
  const loadMoreImages = useCallback(() => {
    if (isLoadingRef.current) return;

    isLoadingRef.current = true;
    setImages((prev) => [
      ...prev,
      getNextImage(),
      getNextImage(),
      getNextImage(),
    ]);

    setTimeout(() => {
      isLoadingRef.current = false;
    }, 300);
  }, [getNextImage]);

  // Bloquear/desbloquear scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (isScrollLocked) {
      container.style.overflow = "hidden";

      const preventScroll = (e: WheelEvent | TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };

      container.addEventListener("wheel", preventScroll, { passive: false });
      container.addEventListener("touchmove", preventScroll, {
        passive: false,
      });

      return () => {
        container.removeEventListener("wheel", preventScroll);
        container.removeEventListener("touchmove", preventScroll);
      };
    } else {
      container.style.overflow = "scroll";
    }
  }, [isScrollLocked]);

  // Detectar qual imagem está visível e carregar mais quando necessário
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "200px", // Começar a carregar quando estiver a 200px
      threshold: 0.5, // Aumentado para 50% para melhor detecção
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLDivElement;
        const isAd = target.dataset.isAd === "true";

        if (entry.isIntersecting) {
          const index = parseInt(target.dataset.index || "0", 10);
          const image = images[index];

          if (image) {
            // Atualizar URL sem recarregar a página
            window.history.replaceState(null, "", `/${image.id}`);
          }

          // Se estamos vendo uma das últimas 2 imagens, carregar mais
          if (index >= images.length - 2) {
            loadMoreImages();
          }

          // Verificar se é um anúncio e bloquear scroll
          if (isAd) {
            const timerCompleted = target.dataset.timerCompleted === "true";
            if (!timerCompleted) {
              setIsScrollLocked(true);
            } else {
              setIsScrollLocked(false);
            }
          } else {
            // Se não é anúncio, desbloquear scroll
            setIsScrollLocked(false);
          }
        } else {
          // Quando sair do viewport
          if (isAd) {
            // Se saiu do anúncio, desbloquear scroll
            setIsScrollLocked(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observar todas as divs de imagens e anúncios
    const imageElements = document.querySelectorAll(
      "[data-image-container], [data-ad-container]"
    );
    imageElements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [images, loadMoreImages]);

  if (images.length === 0) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-y-scroll scroll-smooth snap-y snap-mandatory"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {images.map((image, index) => {
        const shouldShowAd = (index + 1) % 5 === 0 && index > 0;

        return (
          <div key={`content-${index}`}>
            {/* Imagem */}
            <div
              data-image-container
              data-index={index}
              className="relative w-full h-screen snap-start snap-always"
            >
              <Image
                src={image.thumb}
                alt={`High-quality photo ${image.id} - Browse and download stunning photography from our curated collection`}
                fill
                className="object-cover"
                priority={index < 3}
                unoptimized
              />

              {/* Botão de download */}
              <a
                href={image.img}
                download
                rel="noopener noreferrer"
                className="absolute bottom-8 right-8 bg-white/90 hover:bg-white text-black px-6 py-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 font-medium z-10"
                aria-label="Download image"
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
              </a>

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

            {/* Anúncio a cada 5 imagens */}
            {shouldShowAd && (
              <div
                data-ad-container
                data-is-ad="true"
                data-timer-completed="false"
                id={`ad-container-${index}`}
              >
                <AdSenseAd
                  adSlot={`ad-${Math.floor(index / 5)}`}
                  onTimerComplete={() => {
                    setIsScrollLocked(false);
                    const adContainer = document.getElementById(
                      `ad-container-${index}`
                    );
                    if (adContainer) {
                      adContainer.dataset.timerCompleted = "true";
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
