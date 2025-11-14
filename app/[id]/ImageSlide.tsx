"use client";

import { memo } from "react";
import Image from "next/image";
import ClockDisplay from "./ClockDisplay";

interface ImageData {
  id: string;
  thumb: string;
  img: string;
}

interface ImageSlideProps {
  imageData: ImageData;
  slideIndex: number;
  swiperRef: React.RefObject<any>;
}

// Componente memoizado para renderizar cada slide de imagem
const ImageSlide = memo(function ImageSlide({
  imageData,
  slideIndex,
  swiperRef,
}: ImageSlideProps) {
  return (
    <div className="relative w-full h-full bg-black">
      {/* Mobile: Full screen image */}
      <div className="md:hidden relative w-full h-full">
        <Image
          src={imageData.thumb}
          alt={`HD iPhone wallpaper ${imageData.id.substring(
            0,
            8
          )} - Free download for iOS 26 lock screen and home screen`}
          fill
          className="object-cover"
          priority={slideIndex === 0}
          loading={slideIndex === 0 ? "eager" : "lazy"}
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
        />

        {/* iOS 26 Lock Screen Time & Date */}
        <ClockDisplay
          className="absolute top-[70px] left-0 right-0 flex flex-col items-center z-20 pointer-events-none"
          dateClassName="text-white/90 text-lg font-semibold mb-1"
          timeClassName="text-white font-light tracking-tight"
        />
      </div>

      {/* Desktop: iPhone frame with image inside */}
      <div className="hidden md:flex w-full h-full items-center justify-center lg:gap-12 gap-6 relative overflow-hidden lg:px-8 px-4 py-8">
        {/* Blurred background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={imageData.thumb}
            alt=""
            fill
            className="object-cover"
            quality={60}
            priority={slideIndex === 0}
            style={{
              filter: "blur(10px) brightness(0.9)",
              transform: "scale(1.1)",
            }}
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        {/* Wallpaper info - Left side - Hide on medium screens, show on large */}
        <div className="hidden lg:flex flex-col gap-6 max-w-md flex-shrink-0 relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">
              iPhone Wallpaper
            </h1>
            <p className="text-gray-400 text-lg">Optimized for iOS 26</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Compatible Devices
              </h3>
              <div className="space-y-2 text-gray-300 text-xs">
                <div>• iPhone 16 Pro Max</div>
                <div>• iPhone 16 Pro</div>
                <div>• iPhone 15 Pro Max</div>
                <div>• iPhone 15 Pro</div>
                <div>• All iPhone models</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                Features
              </h3>
              <div className="space-y-2 text-gray-300 text-xs">
                <div>✓ High Quality HD/4K</div>
                <div>✓ Lock Screen Ready</div>
                <div>✓ Home Screen Ready</div>
                <div>✓ Free Download</div>
              </div>
            </div>
          </div>

          {/* Action buttons - Desktop */}
          <div className="flex items-center gap-3">
            {/* Share button */}
            <button
              onClick={async () => {
                const siteUrl =
                  process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
                const shareData = {
                  title: `HD iPhone Wallpaper - iOS 26`,
                  text: `Check out this stunning iPhone wallpaper for iOS 26! Perfect for lock screen and home screen.`,
                  url: `${siteUrl}/${imageData.id}`,
                };

                try {
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(shareData.url);
                    alert("Link copied to clipboard!");
                  }
                } catch (err) {
                  console.log("Error sharing:", err);
                }
              }}
              className="flex-1 bg-white/10 hover:bg-white/25 hover:scale-105 backdrop-blur-2xl text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center gap-2"
              aria-label="Share wallpaper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
              <span className="text-sm font-medium">Share</span>
            </button>

            {/* Download button */}
            <a
              href={imageData.img}
              download
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/25 hover:scale-105 backdrop-blur-2xl text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50 flex items-center justify-center gap-2"
              aria-label="Download wallpaper"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
              <span className="text-sm font-medium">Download</span>
            </a>
          </div>
        </div>

        {/* iPhone Frame Container - Responsive */}
        <div className="relative flex items-center justify-center h-full z-10">
          {/* iPhone Frame */}
          <div
            className="relative iphone-frame w-auto"
            style={{
              height: "min(844px, calc(100vh - 160px))",
              aspectRatio: "390/844",
            }}
          >
            {/* iPhone body */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl"
              style={{
                borderRadius: "25px",
                borderWidth: "10px",
                borderStyle: "solid",
                borderColor: "#000",
              }}
            >
              {/* Dynamic Island - iPhone 15/16 Pro */}
              <div
                className="absolute left-1/2 -translate-x-1/2 bg-black z-10 shadow-inner"
                style={{
                  top: "min(10px, 1.2%)",
                  width: "min(125px, 32%)",
                  height: "min(37px, 4.4%)",
                  borderRadius: "min(15px, 50%)",
                  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                {/* Camera and sensors subtle effect */}
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gray-900/50"></div>
                <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-900/50"></div>
              </div>

              {/* Screen */}
              <div
                className="relative w-full h-full overflow-hidden"
                style={{
                  borderRadius: "min(10px, 5%)",
                }}
              >
                <Image
                  src={imageData.thumb}
                  alt={`HD iPhone wallpaper ${imageData.id.substring(
                    0,
                    8
                  )} - Free download for iOS 26 lock screen and home screen`}
                  fill
                  className="object-cover"
                  priority={slideIndex === 0}
                  loading={slideIndex === 0 ? "eager" : "lazy"}
                  sizes="390px"
                  quality={90}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
                />

                {/* iOS 26 Lock Screen Time & Date - Desktop Frame */}
                <ClockDisplay
                  className="absolute top-[60px] left-0 right-0 flex flex-col items-center z-20 pointer-events-none"
                  dateClassName="text-white/90 text-xs font-semibold mb-0.5"
                  timeClassName="text-white font-light tracking-tight text-[72px] leading-none"
                />
              </div>
            </div>

            {/* Side buttons */}
            <div
              className="absolute rounded-l-sm"
              style={{
                left: "-2px",
                top: "14.2%",
                width: "3px",
                height: "5.9%",
                backgroundColor: "#374151",
              }}
            ></div>
            <div
              className="absolute rounded-l-sm"
              style={{
                left: "-2px",
                top: "22.5%",
                width: "3px",
                height: "5.9%",
                backgroundColor: "#374151",
              }}
            ></div>
            <div
              className="absolute rounded-l-sm"
              style={{
                left: "-2px",
                top: "29.6%",
                width: "3px",
                height: "5.9%",
                backgroundColor: "#374151",
              }}
            ></div>
            <div
              className="absolute rounded-r-sm"
              style={{
                right: "-2px",
                top: "21.3%",
                width: "3px",
                height: "9.5%",
                backgroundColor: "#374151",
              }}
            ></div>
          </div>

          {/* Desktop navigation arrows */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute lg:-left-16 -left-12 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 hover:scale-110 backdrop-blur-2xl text-white lg:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50"
            aria-label="Previous wallpaper"
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
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute lg:-left-16 -left-12 top-1/2 lg:translate-y-12 translate-y-10 bg-white/10 hover:bg-white/25 hover:scale-110 backdrop-blur-2xl text-white lg:p-4 p-3 rounded-full shadow-2xl transition-all duration-300 border border-white/30 hover:border-white/50"
            aria-label="Next wallpaper"
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
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Botões de ação - Mobile only */}
      <div className="md:hidden absolute bottom-[120px] w-full px-4 flex items-center justify-between gap-3 z-20">
        {/* Botão de compartilhar */}
        <button
          onClick={async () => {
            const siteUrl =
              process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
            const shareData = {
              title: `HD iPhone Wallpaper - iOS 26`,
              text: `Check out this stunning iPhone wallpaper for iOS 26! Perfect for lock screen and home screen.`,
              url: `${siteUrl}/${imageData.id}`,
            };

            try {
              if (navigator.share) {
                await navigator.share(shareData);
              } else {
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
          href={imageData.img}
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
        <div className="absolute bottom-[120px] lg:hidden left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-1 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <p className="text-xs text-white/90 font-medium">Swipe or scroll</p>
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
  );
});

export default ImageSlide;
