"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Virtual } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";

import imagesData from "../../data/images.json";
import AdSenseAd from "../components/AdSenseAd";
import ImageSlide from "./ImageSlide";

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

  // Criar array de slides mesclando imagens e anúncios (memoizado)
  const memoizedSlides = useMemo(() => {
    if (images.length === 0) return [];

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

    return newSlides;
  }, [images]);

  // Atualizar slides quando memoizedSlides mudar
  useEffect(() => {
    setSlides(memoizedSlides);
  }, [memoizedSlides]);

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

  // Memoized callback for ad timer completion
  const handleAdTimerComplete = useCallback(
    (adIndex: number) => () => {
      setAdTimersCompleted((prev) => {
        const newSet = new Set(prev);
        newSet.add(adIndex);
        return newSet;
      });

      // Reabilitar swiper
      if (swiperRef.current) {
        swiperRef.current.enable();
        swiperRef.current.allowTouchMove = true;
        swiperRef.current.allowSlideNext = true;
        swiperRef.current.allowSlidePrev = true;
      }
    },
    []
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
      virtual={{
        enabled: true,
        addSlidesAfter: 2,
        addSlidesBefore: 1,
      }}
      watchSlidesProgress={true}
      noSwipingClass="no-swipe"
      noSwipingSelector=".no-swipe"
      modules={[Keyboard, Mousewheel, Virtual]}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      onSlideChange={handleSlideChange}
      className="w-full h-screen"
      style={{ width: "100%", height: "100vh" }}
    >
      {slides.map((slide, slideIndex) => {
        if (slide.type === "image" && slide.data) {
          // Renderizar slide de imagem usando componente memoizado
          return (
            <SwiperSlide key={`image-${slide.data.id}-${slideIndex}`}>
              <ImageSlide
                imageData={slide.data}
                slideIndex={slideIndex}
                swiperRef={swiperRef}
              />
            </SwiperSlide>
          );
        } else if (slide.type === "ad" && slide.adIndex !== undefined) {
          // Renderizar slide de anúncio
          return (
            <SwiperSlide key={`ad-${slide.adIndex}`}>
              <div className="relative w-full h-full bg-black">
                <AdSenseAd
                  adSlot={`ad-${slide.adIndex}`}
                  onTimerComplete={handleAdTimerComplete(slide.adIndex)}
                />
              </div>
            </SwiperSlide>
          );
        }
        return null;
      })}
    </Swiper>
  );
}
