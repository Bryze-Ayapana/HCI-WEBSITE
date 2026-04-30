import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const SportsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  const [tweenValues, setTweenValues] = useState([]);

  const sportsData = [
    { id: 1, src: '/sportsImage1.png', title: 'FOOTBALL' },
    { id: 2, src: '/sportsImage2.png', title: 'ARNIS' },
    { id: 3, src: '/sportsImage3.png', title: 'VOLLEYBALL' },
    { id: 4, src: '/sportsImage4.png', title: 'BASKETBALL' },
    { id: 5, src: '/sportsImage5.png', title: 'BOXING' },
    { id: 6, src: '/sportsImage6.png', title: 'SWIMMING' },
    { id: 7, src: '/sportsImage7.png', title: 'TRACK' },
    { id: 8, src: '/sportsImage8.png', title: 'WEIGHTLIFTING' },
    { id: 9, src: '/sportsImage9.png', title: 'GYMNASTICS' },
    { id: 10, src: '/sportsImage10.png', title: 'TAEKWONDO' },
  ];

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }

      const absDiff = Math.abs(diffToTarget);

      // Scale: center=1.0, edges=0.78
      const scale = Math.max(0.78, 1 - absDiff * 1.1);

      // Dim overlay: center=0 (no dim), edges=0.55 (dark)
      const dimOpacity = Math.min(0.58, absDiff * 1.4);

      // Slight vertical offset so non-center cards sit lower
      const translateY = absDiff * 18;

      return {
        scale,
        dimOpacity,
        translateY,
        zIndex: Math.round((1 - absDiff) * 100),
        isCenter: absDiff < 0.08,
      };
    });

    setTweenValues(styles);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#030A17] overflow-hidden">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/sportsSectionBackground.png"
          alt=""
          className="w-full h-full object-cover opacity-10"
        />
        {/* Subtle radial glow in the center behind the carousel */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(30,80,180,0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full flex flex-col items-center">

        {/* ── TITLE ── */}
        <div className="w-full max-w-7xl px-4 md:px-8 mb-8 md:mb-10">
          <h2
            className="text-[20px] md:text-3xl font-black text-white uppercase tracking-widest"
            style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif" }}
          >
            SPORTS
          </h2>
        </div>

        {/* ── EMBLA CAROUSEL ── */}
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div
            className="flex cursor-grab active:cursor-grabbing"
            // Negative gap so cards overlap each other
            style={{ gap: '-8px' }}
          >
            {sportsData.map((sport, index) => {
              const t = tweenValues.length ? tweenValues[index] : null;
              const scale = t ? t.scale : 0.82;
              const dimOpacity = t ? t.dimOpacity : 0.5;
              const translateY = t ? t.translateY : 16;
              const zIdx = t ? t.zIndex : 1;
              const isCenter = t ? t.isCenter : false;

              return (
                <div
                  key={sport.id}
                  // Width: wider on mobile to show 1 card; on desktop ~22% so 5 are visible
                  className="flex-none w-[78%] sm:w-[42%] md:w-[24%] lg:w-[22%] px-1"
                  style={{ zIndex: zIdx }}
                >
                  <div
                    className="relative w-full overflow-hidden shadow-2xl"
                    style={{
                      // Tall portrait ratio
                      aspectRatio: '3 / 4.4',
                      transform: `scale(${scale}) translateY(${translateY}px) skewX(-6deg)`,
                      transition: 'transform 0.25s ease-out',
                      // Glow on center card
                      boxShadow: isCenter
                        ? '0 0 40px 6px rgba(50,120,255,0.22), 0 20px 60px rgba(0,0,0,0.7)'
                        : '0 12px 40px rgba(0,0,0,0.5)',
                    }}
                  >
                    {/* ── SPORT IMAGE (counter-skew so it looks straight) ── */}
                    <img
                      src={sport.src}
                      alt={sport.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ transform: 'skewX(6deg) scale(1.18)' }}
                    />

                    {/* ── DIM OVERLAY for non-center cards ── */}
                    <div
                      className="absolute inset-0 bg-[#020d22] transition-opacity duration-300"
                      style={{ opacity: dimOpacity }}
                    />

                    {/* ── BOTTOM GRADIENT ── */}
                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                    {/* ── SPORT TITLE (counter-skew so text stays upright) ── */}
                    <div className="absolute bottom-5 left-0 w-full px-4 text-center">
                      <h3
                        className="text-white font-black uppercase tracking-widest drop-shadow-lg"
                        style={{
                          fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                          fontSize: 'clamp(14px, 2.2vw, 22px)',
                          transform: 'skewX(6deg)',
                          letterSpacing: '0.12em',
                        }}
                      >
                        {sport.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SportsSection;