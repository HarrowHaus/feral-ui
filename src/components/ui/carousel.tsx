import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";
import { Button } from "./button";

type CarouselContextValue = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  index: number;
  count: number;
  setCount: (count: number) => void;
  scrollTo: (index: number) => void;
  next: () => void;
  previous: () => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarouselContext() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("Carousel pieces must live inside Carousel. The slide goblin needs tracks.");
  return context;
}

export function Carousel({ className, children, defaultIndex = 0, ...props }: React.HTMLAttributes<HTMLDivElement> & { defaultIndex?: number }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [index, setIndex] = React.useState(defaultIndex);
  const [count, setCount] = React.useState(0);

  const scrollTo = React.useCallback((nextIndex: number) => {
    const clamped = Math.max(0, Math.min(nextIndex, Math.max(0, count - 1)));
    const track = trackRef.current;
    const item = track?.children.item(clamped) as HTMLElement | null;
    item?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setIndex(clamped);
  }, [count]);

  const previous = React.useCallback(() => scrollTo(index - 1), [index, scrollTo]);
  const next = React.useCallback(() => scrollTo(index + 1), [index, scrollTo]);

  const value = React.useMemo(() => ({ trackRef, index, count, setCount, scrollTo, next, previous }), [index, count, scrollTo, next, previous]);

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn("feral-carousel", className)} aria-roledescription="carousel" onKeyDown={(event) => { if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); }} {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

export function CarouselTrack({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { trackRef, setCount } = useCarouselContext();
  const childArray = React.Children.toArray(children);
  React.useEffect(() => { setCount(childArray.length); }, [childArray.length, setCount]);
  return <div ref={trackRef} className={cn("feral-carousel-track", className)} tabIndex={0} {...props}>{childArray.map((child, index) => React.isValidElement(child) ? React.cloneElement(child as React.ReactElement<{ "aria-label"?: string }>, { "aria-label": `Slide ${index + 1} of ${childArray.length}` }) : child)}</div>;
}

export function CarouselItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("feral-carousel-item", className)} role="group" {...props} />;
}

export function CarouselControls({ className }: { className?: string }) {
  const { previous, next, index, count } = useCarouselContext();
  return (
    <div className={cn("feral-carousel-controls", className)}>
      <Button type="button" size="sm" tone="paper" aria-label="Previous slide" disabled={index === 0} onClick={previous}><ChevronLeft size={16} /></Button>
      <span>{index + 1} / {Math.max(count, 1)}</span>
      <Button type="button" size="sm" tone="paper" aria-label="Next slide" disabled={index >= count - 1} onClick={next}><ChevronRight size={16} /></Button>
    </div>
  );
}

export function CarouselDots({ className }: { className?: string }) {
  const { count, index, scrollTo } = useCarouselContext();
  return <div className={cn("feral-carousel-dots", className)}>{Array.from({ length: count }, (_, dot) => <button key={dot} type="button" className="feral-focus-ring" aria-label={`Go to slide ${dot + 1}`} aria-current={dot === index} onClick={() => scrollTo(dot)} />)}</div>;
}
