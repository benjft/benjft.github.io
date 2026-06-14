import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from './ui/carousel';

type ProjectCard = {
  id: string;
  title: string;
  tagLine: string;
  tags: string[];
  thumbnailImage: string | null;
  dateCreated: string;
};

function tagSlug(tag: string): string {
  const lower = tag.toLowerCase();
  const overrides: Record<string, string> = { 'c#': 'csharp', 'c++': 'cpp', '.net': 'dotnet' };
  return overrides[lower] ?? lower.replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function groupIntoPages<T>(items: T[], size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size));
  return pages;
}

export default function ProjectsCarousel({ projects }: { projects: ProjectCard[] }) {
  const probeRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);

  // Read actual column count from CSS grid — fires before paint so there's no flash
  function measureCols() {
    if (!probeRef.current) return;
    const tpl = window.getComputedStyle(probeRef.current).gridTemplateColumns;
    setCols(Math.max(1, tpl.split(' ').length));
  }
  useLayoutEffect(measureCols, []);

  useEffect(() => {
    if (!probeRef.current) return;
    const ro = new ResizeObserver(measureCols);
    ro.observe(probeRef.current);
    return () => ro.disconnect();
  }, []);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setCurrent(embla.selectedScrollSnap());
    setTotal(embla.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('select', onSelect);
    api.on('reInit', onSelect);
    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api, onSelect]);

  const pages = groupIntoPages(projects, cols);

  return (
    <div>
      {/* Hidden probe: lets CSS determine the actual column count before rendering pages */}
      <div aria-hidden="true" style={{ height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div ref={probeRef} className="grid">
          <div /><div /><div />
        </div>
      </div>
      <Carousel key={cols} opts={{ align: 'start' }} setApi={setApi}>
        <CarouselContent>
          {pages.map((page, pageIndex) => (
            <CarouselItem key={pageIndex}>
              <div className="grid">
                {page.map((project) => (
                  <div key={project.id} className="card">
                    {project.thumbnailImage && (
                      <img
                        src={project.thumbnailImage}
                        alt={project.title}
                        className="card-thumbnail"
                      />
                    )}
                    <div className="card-header">
                      <h3>
                        <a href={`/projects/${project.id}`} className="card-link">
                          {project.title}
                        </a>
                      </h3>
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
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="description">{project.tagLine}</p>
                    {project.tags.length > 0 && (
                      <div className="tag-pills">
                        {project.tags.map((tag) => (
                          <a key={tag} href={`/tags/${tagSlug(tag)}`} className="tag-pill">
                            {tag}
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="project-date">
                      {new Date(project.dateCreated).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {total > 1 && (
          <div className="carousel-controls">
            <CarouselPrevious />
            <div className="page-dots">
              {Array.from({ length: total }, (_, i) => (
                <button
                  key={i}
                  className={i === current ? 'page-dot active' : 'page-dot'}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
            <CarouselNext />
          </div>
        )}
      </Carousel>
    </div>
  );
}
