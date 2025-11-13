"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

import imagesData from "../../data/images.json";

// Lazy load do componente de anúncio para melhor performance
const AdSenseAd = lazy(() => import("../components/AdSenseAd"));

interface ImageData {
  id: string;
  thumb: string;
  img: string;
}

interface PhotoViewerProps {
  initialImage: ImageData;
}

interface SlideItem {
  type: "image" | "ad";
  data?: ImageData;
  adIndex?: number;
  originalIndex: number;
}

export default function PhotoViewerSwiper({ initialImage }: PhotoViewerProps) {
  const [images, setImages] = useState<ImageData[]>([]);
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [adTimersCompleted, setAdTimersCompleted] = useState<Set<number>>(
    new Set()
  );
  const swiperRef = useRef<SwiperType | null>(null);
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

  // Carregar mais imagens quando necessário
  const loadMoreImages = useCallback(() => {
    setImages((prev) => [
      ...prev,
      getNextImage(),
      getNextImage(),
      getNextImage(),
    ]);
  }, [getNextImage]);

  // Criar array de slides mesclando imagens e anúncios
  useEffect(() => {
    if (images.length === 0) return;

    const newSlides: SlideItem[] = [];
    let adCounter = 0;

    images.forEach((image, index) => {
      // Adicionar imagem
      newSlides.push({
        type: "image",
        data: image,
        originalIndex: index,
      });

      // Adicionar anúncio a cada 5 imagens (após a 5ª, 10ª, 15ª, etc.)
      if ((index + 1) % 5 === 0 && index > 0) {
        newSlides.push({
          type: "ad",
          adIndex: adCounter++,
          originalIndex: index,
        });
      }
    });

    setSlides(newSlides);
  }, [images]);

  // Handle slide change
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const slideIndex = swiper.activeIndex;
      const currentSlide = slides[slideIndex];

      if (!currentSlide) return;

      // Se for imagem, atualizar URL
      if (currentSlide.type === "image" && currentSlide.data) {
        window.history.replaceState(null, "", `/${currentSlide.data.id}`);

        // Carregar mais imagens quando próximo do fim
        if (currentSlide.originalIndex >= images.length - 2) {
          loadMoreImages();
        }
      }

      // Se for anúncio, verificar se o timer foi completado
      if (currentSlide.type === "ad" && currentSlide.adIndex !== undefined) {
        const timerCompleted = adTimersCompleted.has(currentSlide.adIndex);

        if (!timerCompleted) {
          swiper.disable();
          swiper.allowTouchMove = false;
          swiper.allowSlideNext = false;
          swiper.allowSlidePrev = false;
        } else {
          swiper.enable();
          swiper.allowTouchMove = true;
          swiper.allowSlideNext = true;
          swiper.allowSlidePrev = true;
        }
      } else {
        // Se for imagem, sempre desbloquear
        swiper.enable();
        swiper.allowTouchMove = true;
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
      }
    },
    [slides, images.length, loadMoreImages, adTimersCompleted]
  );

  // Preload das próximas imagens
  useEffect(() => {
    if (images.length < 2) return;

    const preloadImages = images.slice(1, 3);
    preloadImages.forEach((img) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.as = "image";
      link.href = img.thumb;
      document.head.appendChild(link);
    });
  }, [images]);

  if (images.length === 0 || slides.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Swiper
      direction="vertical"
      slidesPerView={1}
      spaceBetween={0}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      }}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      speed={600}
      resistance={true}
      resistanceRatio={0.85}
      threshold={10}
      touchStartPreventDefault={false}
      modules={[Keyboard, Mousewheel]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={handleSlideChange}
      className="w-full h-screen"
      style={{ width: "100%", height: "100vh" }}
    >
      {slides.map((slide, slideIndex) => {
        if (slide.type === "image" && slide.data) {
          // Renderizar slide de imagem
          return (
            <SwiperSlide key={`image-${slide.data.id}-${slideIndex}`}>
              <div className="relative w-full h-full bg-black">
                <Image
                  src={slide.data.thumb}
                  alt={`HD iPhone wallpaper ${slide.data.id.substring(0, 8)} - Free download for iOS 26 lock screen and home screen`}
                  fill
                  className="object-cover"
                  priority={slideIndex === 0}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  sizes="100vw"
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />

                {/* Botões de ação */}
                <div className="absolute bottom-[120px] w-full px-4 flex items-center justify-between gap-3 z-10">
                  {/* Botão de compartilhar */}
                  <button
                    onClick={async () => {
                      const siteUrl =
                        process.env.NEXT_PUBLIC_SITE_URL ||
                        window.location.origin;
                      const shareData = {
                        title: `HD iPhone Wallpaper - iOS 26`,
                        text: `Check out this stunning iPhone wallpaper for iOS 26! Perfect for lock screen and home screen.`,
                        url: `${siteUrl}/${slide.data?.id}`,
                      };

                      try {
                        if (navigator.share) {
                          await navigator.share(shareData);
                        } else {
                          // Fallback: copiar link
                          await navigator.clipboard.writeText(shareData.url);
                          alert("Link copied to clipboard!");
                        }
                      } catch (err) {
                        console.log("Error sharing:", err);
                      }
                    }}
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-200 border border-white/20"
                    aria-label="Share image"
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
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                  </button>

                  {/* Botão de download */}
                  <a
                    href={slide.data.img}
                    download
                    rel="noopener noreferrer"
                    className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full shadow-lg transition-all duration-200 border border-white/20"
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
                  </a>
                </div>

                {/* Indicador de swipe - apenas na primeira imagem */}
                {slideIndex === 0 && (
                  <div className="absolute bottom-[120px] left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="flex flex-col items-center gap-1 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      <p className="text-xs text-white/90 font-medium">
                        Swipe or scroll
                      </p>
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
                        className="text-white/90"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        } else if (slide.type === "ad" && slide.adIndex !== undefined) {
          // Renderizar slide de anúncio
          return (
            <SwiperSlide key={`ad-${slide.adIndex}-${slideIndex}`}>
              <div className="relative w-full h-full bg-black">
                <Suspense
                  fallback={
                    <div className="w-full h-full bg-black flex items-center justify-center">
                      <div className="text-white/50">Loading ad...</div>
                    </div>
                  }
                >
                  <AdSenseAd
                    adSlot={`ad-${slide.adIndex}`}
                    onTimerComplete={() => {
                      setAdTimersCompleted((prev) => {
                        const newSet = new Set(prev);
                        newSet.add(slide.adIndex!);
                        return newSet;
                      });

                      // Reabilitar swiper
                      if (swiperRef.current) {
                        swiperRef.current.enable();
                        swiperRef.current.allowTouchMove = true;
                        swiperRef.current.allowSlideNext = true;
                        swiperRef.current.allowSlidePrev = true;
                      }
                    }}
                  />
                </Suspense>
              </div>
            </SwiperSlide>
          );
        }
        return null;
      })}
    </Swiper>
  );
}
