// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

// === КОМПОНЕНТЫ ===
import DesktopHeader from './components/desktop/DesktopHeader';
import DesktopFooter from './components/desktop/DesktopFooter';
import MobileBottomBar from './components/mobile/MobileBottomBar';

// === ФОТО ===
import h1 from './assets/horizontal/h1.jpg';
import h2 from './assets/horizontal/h2.jpg';
import h3 from './assets/horizontal/h3.jpg';
import h4 from './assets/horizontal/h4.jpg';
import h5 from './assets/horizontal/h5.jpg';
import h6 from './assets/horizontal/h6.jpg';
import h7 from './assets/horizontal/h7.jpg';

import v1 from './assets/vertical/v1.jpg';
import v2 from './assets/vertical/v2.jpg';
import v3 from './assets/vertical/v3.jpg';
import v4 from './assets/vertical/v4.jpg';
import v5 from './assets/vertical/v5.jpg';
import v6 from './assets/vertical/v6.jpg';

const horizontals = [h1, h2, h3, h4, h5, h6, h7];
const verticals = [v1, v2, v3, v4, v5, v6];

/* -------------------------------------------------
   Десктопная логика
-------------------------------------------------- */
function buildSlides(horizontals, verticals) {
  const groups = [];
  for (let i = 0; i < verticals.length; i += 3) {
    const group = verticals.slice(i, i + 3);
    if (group.length === 3) groups.push(group);
  }

  const slides = [];
  if (groups.length === 0) {
    horizontals.forEach(src => slides.push({ type: 'horizontal', src }));
    return slides;
  }

  const totalSlots = groups.length + 1;
  const hPerSlot = Math.floor(horizontals.length / totalSlots);
  const remainder = horizontals.length % totalSlots;

  let hIndex = 0;
  let gIndex = 0;

  for (let slot = 0; slot < totalSlots; slot++) {
    const numH = hPerSlot + (slot < remainder ? 1 : 0);
    for (let i = 0; i < numH; i++) {
      if (hIndex < horizontals.length) slides.push({ type: 'horizontal', src: horizontals[hIndex++] });
    }
    if (gIndex < groups.length) slides.push({ type: 'group', srcs: groups[gIndex++] });
  }

  return slides;
}

/* -------------------------------------------------
   Мобильная логика
-------------------------------------------------- */
function buildMobileSlides(horizontals, verticals) {
  const slides = [];

  // 1. Группируем горизонтальные по 3
  const hGroups = [];
  for (let i = 0; i < horizontals.length; i += 3) {
    hGroups.push(horizontals.slice(i, i + 3));
  }

  // 2. Если нет вертикальных — просто горизонтальные группы
  if (verticals.length === 0) {
    return hGroups.map(srcs => ({ type: 'horizontal-group', srcs }));
  }

  // 3. Вставляем вертикальные по 2, с горизонтальной группой между ними
  let vIndex = 0;
  let hIndex = 0;

  // Проходим по вертикальным: по 2 за раз
  while (vIndex < verticals.length) {
    // Добавляем 1-ю вертикаль
    if (vIndex < verticals.length) {
      slides.push({ type: 'vertical', src: verticals[vIndex++] });
    }

    // Добавляем 2-ю вертикаль (если есть)
    if (vIndex < verticals.length) {
      slides.push({ type: 'vertical', src: verticals[vIndex++] });
    }

    // Вставляем горизонтальную группу (если есть)
    if (hIndex < hGroups.length) {
      slides.push({ type: 'horizontal-group', srcs: hGroups[hIndex++] });
    }
  }

  // 4. Остаток горизонтальных — в конец
  while (hIndex < hGroups.length) {
    slides.push({ type: 'horizontal-group', srcs: hGroups[hIndex++] });
  }

  return slides;
}

/* -------------------------------------------------
   Основной компонент
-------------------------------------------------- */
export default function App() {
  const [isMobile, setIsMobile] = React.useState(null);

  React.useEffect(() => {
    const checkDevice = () => {
      const ua = navigator.userAgent || navigator.vendor || window.opera;
      const screenWidth = window.innerWidth;

      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;

      const mobileRegex = /android|iphone|ipad|ipod|opera mini|iemobile|mobile/i;
      const mobileDetected =
        mobileRegex.test(ua) || (isTouchDevice && screenWidth < 1024);

      setIsMobile(mobileDetected);
    };

    checkDevice();
    window.addEventListener('orientationchange', checkDevice);
    return () => window.removeEventListener('orientationchange', checkDevice);
  }, []);

  if (isMobile === null) return null; // пока определяем устройство

  return isMobile ? <MobileVersion /> : <DesktopVersion />;
}

/* -------------------------------------------------
   Десктопная версия
-------------------------------------------------- */
function DesktopVersion() {
  const slides = buildSlides(horizontals, verticals);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [lastActionTime, setLastActionTime] = useState(Date.now());
  const visibleDots = 9;
  const total = slides.length;

  const handleSlideChange = (swiper) => {
    const index = swiper.realIndex;
    setActiveIndex(index);
    const localIndex = (index - windowStart + total) % total;
    if (localIndex >= visibleDots - 1) setWindowStart((p) => (p + 1) % total);
    else if (localIndex <= 0) setWindowStart((p) => (p - 1 + total) % total);
  };

  // --- Таймер возврата автоплея ---
  useEffect(() => {
    if (!isAutoplay) {
      const timer = setTimeout(() => setIsAutoplay(true), 12000);
      return () => clearTimeout(timer);
    }
  }, [isAutoplay, lastActionTime]);

  // --- Обработка прокрутки колесом мыши ---
  useEffect(() => {
    let scrollTimeout = null;
    const handleWheel = (e) => {
      if (!swiperRef.current) return;
      if (scrollTimeout) return; // блокируем спам

      const delta = e.deltaY || e.wheelDelta;
      if (Math.abs(delta) < 10) return;

      setIsAutoplay(false);
      setLastActionTime(Date.now());

      // === Быстрое переключение по "галерее" ===
      const step = 1; // сколько слайдов прокручивать за раз
      if (delta > 0) swiperRef.current.slideToLoop((swiperRef.current.realIndex + step) % total);
      else swiperRef.current.slideToLoop((swiperRef.current.realIndex - step + total) % total);

      scrollTimeout = setTimeout(() => (scrollTimeout = null), 200);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [total]);

  const visibleIndices = Array.from({ length: visibleDots }, (_, i) => (windowStart + i) % total);

  return (
    <div
      className="desktop-swiper-area"
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={isAutoplay ? { delay: 12000, disableOnInteraction: false } : false}
        speed={1500}
        loop={true}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={handleSlideChange}
        style={{
          height: '100%',
          width: '100%',
          maxWidth: '1920px',
          maxHeight: '1080px',
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide.type === 'horizontal' ? (
              <img src={slide.src} alt="" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                {slide.srcs.map((src, j) => (
                  <img
                    key={j}
                    src={src}
                    alt=""
                    style={{ height: '100%', width: '33.333%', objectFit: 'cover' }}
                  />
                ))}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* --- Пагинация --- */}
      <div
        style={{
          position: 'absolute',
          top: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
          width: 'calc(9 * 14px)',
          height: '12px',
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        {visibleIndices.map((realIndex) => {
          const isActive = realIndex === activeIndex;
          return (
            <span
              key={realIndex}
              onClick={() => {
                swiperRef.current?.slideToLoop(realIndex);
                setIsAutoplay(false);
                setLastActionTime(Date.now());
              }}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isActive ? 'transparent' : 'white',
                border: isActive ? '2px solid white' : 'none',
                cursor: 'pointer',
                transition: 'background 0.5s ease',
              }}
            />
          );
        })}
      </div>

      <DesktopHeader />
      <DesktopFooter />
    </div>
  );
}

/* -------------------------------------------------
   Мобильная версия (автоплей + вертикальный скролл)
-------------------------------------------------- */
function MobileVersion() {
  const slides = buildMobileSlides(horizontals, verticals);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Автоплей
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      const nextY =
        ((currentSlide + 1) * window.innerWidth * 9) / 16;
      containerRef.current?.scrollTo({
        top: nextY,
        behavior: 'smooth',
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying, currentSlide, slides.length]);

  return (
    <>
      {/* Скроллируемый контейнер — pointerEvents: 'none' при автоплее */}
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          height: '100vh',
          background: 'black',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
          margin: 0,
          padding: 0,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          pointerEvents: isPlaying ? 'none' : 'auto',
        }}
      >
        {/* Скрываем ползунок iOS/Safari */}
        <style>
          {`
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              height: 'auto',
              scrollSnapAlign: 'start',
              display: 'flex',
              flexDirection: slide.type === 'vertical' ? 'row' : 'column',
              background: 'black',
            }}
          >
            {slide.type === 'vertical' ? (
              <div
                style={{
                  width: '100%',
                  aspectRatio: '2/3',
                  background: 'black',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={slide.src}
                    alt=""
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
            ) : (
              slide.srcs.map((src, j) => (
                <div
                  key={j}
                  style={{
                    width: '100%',
                    background: 'black',
                    borderTop: 'none',
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: '100%',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {/* MobileBottomBar — ВНЕ контейнера, всегда кликабелен */}
      <MobileBottomBar
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
      />
    </>
  );
}