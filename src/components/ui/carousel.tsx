import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselContextValue = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('useCarousel must be used inside <Carousel>');
  return ctx;
}

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
  children: ReactNode;
};

function Carousel({ opts, plugins, setApi, children }: CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel({ axis: 'x', ...opts }, plugins);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(
    (embla: CarouselApi) => {
      if (!embla) return;
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    },
    [],
  );

  useEffect(() => {
    if (api && setApi) setApi(api);
  }, [api, setApi]);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);
    return () => {
      api.off('reInit', onSelect);
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <CarouselContext.Provider
      value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

function CarouselContent({ children }: { children: ReactNode }) {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="carousel-viewport">
      <div className="carousel-track">{children}</div>
    </div>
  );
}

function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <div className="carousel-slide" role="group" aria-roledescription="slide">
      {children}
    </div>
  );
}

function CarouselPrevious({ disabled }: { disabled?: boolean }) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      className="carousel-btn"
      onClick={scrollPrev}
      disabled={disabled ?? !canScrollPrev}
      aria-label="Previous slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}

function CarouselNext({ disabled }: { disabled?: boolean }) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      className="carousel-btn"
      onClick={scrollNext}
      disabled={disabled ?? !canScrollNext}
      aria-label="Next slide"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    </button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
};
