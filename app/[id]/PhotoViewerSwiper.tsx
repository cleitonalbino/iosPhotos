"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Mousewheel, Virtual } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";

import imagesData from "../../data/images.json";
import ImageSlide from "./ImageSlide";

interface ImageData {
  id: string;
  thumb: string;
  img: string;
}

interface PhotoViewerProps {
  initialImage: ImageData;
}

export default function PhotoViewerSwiper({ initialImage }: PhotoViewerProps) {
  const [images, setImages] = useState<ImageData[]>([]);
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

  // Handle slide change
  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      const slideIndex = swiper.activeIndex;
      const currentImage = images[slideIndex];

      if (!currentImage) return;

      // Atualizar URL
      const newPath = `/${currentImage.id}`;
      window.history.replaceState(null, "", newPath);

      // Enviar pageview para Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
          page_path: newPath,
        });
      }

      // Carregar mais imagens quando próximo do fim
      if (slideIndex >= images.length - 2) {
        loadMoreImages();
      }
    },
    [images, loadMoreImages]
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

  if (images.length === 0) {
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
      {images.map((image, index) => (
        <SwiperSlide key={`image-${image.id}-${index}`}>
          <ImageSlide
            imageData={image}
            slideIndex={index}
            swiperRef={swiperRef}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
