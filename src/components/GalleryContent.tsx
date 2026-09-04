import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { galleryItems, galleryCategories, type GalleryItem, type GalleryCategory } from '../data/galleryData';
import { preloadAndDecodeImage, preloadImageBufferRange, isImageBuffered } from '../utils/imageBuffer';

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  openLightbox: (idx: number) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, openLightbox }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(() => isImageBuffered(item.thumbnail));
  const [shouldLoad, setShouldLoad] = useState<boolean>(() => isImageBuffered(item.thumbnail));

  // Advance Buffer Preloading via IntersectionObserver with 600px lookahead
  useEffect(() => {
    if (shouldLoad) return;

    const currentCard = cardRef.current;
    if (!currentCard) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          // Proactively decode bitmap into GPU buffer off main thread
          preloadAndDecodeImage(item.thumbnail).then(() => {
            setIsLoaded(true);
          });
          observer.disconnect();
        }
      },
      {
        rootMargin: '600px 0px 600px 0px', // Buffer zone: fetch 600px before reaching viewport
        threshold: 0.01,
      }
    );

    observer.observe(currentCard);

    return () => {
      observer.disconnect();
    };
  }, [item.thumbnail, shouldLoad]);

  const getCategoryBadgeVariant = (category: GalleryItem['category']) => {
    switch (category) {
      case 'IIC 2.0':
        return 'cyan';
      case 'IIC 1.0':
        return 'purple';
      case 'Workshops':
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      onClick={() => openLightbox(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View larger version of ${item.text}`}
      className="break-inside-avoid overflow-hidden rounded-2xl border border-border/20 bg-[#051820]/40 transition-all duration-300 relative group cursor-pointer hover:border-cyan-400/40 hover:shadow-glass w-full mb-5"
      style={{
        contentVisibility: 'auto',
        containIntrinsicSize: '320px',
      }}
    >
      {/* Aspect Ratio Box to reserve exact card dimensions and prevent layout shift (CLS = 0) */}
      <div className={`w-full relative overflow-hidden rounded-2xl ${item.aspect}`}>
        {/* Placeholder skeleton while prebuffering */}
        {!isLoaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl bg-white/5" />
        )}

        {shouldLoad && (
          <img
            src={item.thumbnail}
            alt={item.caption}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            className={`w-full h-full object-cover rounded-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:brightness-95 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Hover Scrim & Metadata Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left rounded-2xl pointer-events-none"
        aria-hidden="true"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <Badge variant={getCategoryBadgeVariant(item.category)} className="text-[10px] px-2.5 py-0.5">
            {item.category}
          </Badge>
          <span className="text-[10px] text-gray-400 font-mono">
            {item.date}
          </span>
        </div>

        <h3 className="text-white font-bold text-base mb-1 tracking-tight drop-shadow-sm">
          {item.text}
        </h3>
        <p className="text-gray-300 text-xs leading-normal line-clamp-2">
          {item.caption}
        </p>

        {/* Top-Right Maximize Icon */}
        <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 border border-white/10 text-white group-hover:border-cyan-500/30 transition-all duration-200">
          <Maximize2 className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
};

const GalleryContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-60px' });

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx);
    setIsZoomed(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
    document.body.style.overflow = '';
  }, []);

  const navigateLightbox = useCallback(
    (direction: number) => {
      setLightboxIndex((prevIndex) => {
        if (prevIndex === null) return null;
        return (prevIndex + direction + filteredItems.length) % filteredItems.length;
      });
      setIsZoomed(false);
    },
    [filteredItems.length]
  );

  // Proactive Buffer Preloading for Lightbox (Preloads current, prev, and next 2 images in background)
  useEffect(() => {
    if (lightboxIndex === null || filteredItems.length === 0) return;

    const current = filteredItems[lightboxIndex];
    const next1 = filteredItems[(lightboxIndex + 1) % filteredItems.length];
    const next2 = filteredItems[(lightboxIndex + 2) % filteredItems.length];
    const prev1 = filteredItems[(lightboxIndex - 1 + filteredItems.length) % filteredItems.length];

    preloadImageBufferRange([
      current?.image,
      next1?.image,
      next2?.image,
      prev1?.image,
    ]);
  }, [lightboxIndex, filteredItems]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <div className="min-h-screen space-bg pb-24">
      {/* ── Page Header ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 pt-32 pb-6" ref={headerRef}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Event Gallery</span>
          </h1>
          <div className="section-divider mb-5" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore the spirit of innovation, hackathon breakthroughs, and memorable milestones from IIC.
          </p>
        </motion.div>

        {/* ── Filter Chips ───────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2.5 mt-8 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          role="tablist"
          aria-label="Filter gallery images by category"
        >
          {galleryCategories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 border ${
                  isActive
                    ? 'text-white border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                    : 'text-gray-400 border-cyan-500/10 bg-secondary/15 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="gallery-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-400/50"
                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>
      </div>

      {/* ── Masonry Grid / Cards (Existing Grid Layout Preserved) ────────── */}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5"
          role="region"
          aria-label="Gallery photo stream"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                openLightbox={openLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── High-Performance Lightbox Modal ────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-black/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery viewer"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {/* Lightbox Header Controls */}
            <div className="w-full flex items-center justify-between p-3 relative z-10">
              {/* Counter label */}
              <div className="text-gray-400 font-mono text-sm px-2">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={isZoomed ? 'Zoom out image' : 'Zoom in image'}
                  title={isZoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Close image viewer"
                  title="Close viewer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Main Stage */}
            <div className="flex-1 w-full flex items-center justify-center relative max-h-[80vh]">
              {/* Left Arrow Button */}
              <button
                onClick={() => navigateLightbox(-1)}
                className="absolute left-2 md:left-4 p-3 rounded-full bg-black/60 border border-white/15 text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-black/80 transition-all duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Centered Image Container */}
              <div
                className="max-w-5xl max-h-[75vh] px-10 md:px-14 overflow-hidden flex items-center justify-center select-none"
                onClick={() => setIsZoomed(!isZoomed)}
              >
                <motion.img
                  key={filteredItems[lightboxIndex].id}
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].caption}
                  decoding="async"
                  initial={{ scale: 0.97, opacity: 0 }}
                  animate={{
                    scale: isZoomed ? 1.25 : 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.97, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  className={`max-w-full max-h-[72vh] rounded-xl object-contain shadow-2xl transition-transform duration-300 ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-2 md:right-4 p-3 rounded-full bg-black/60 border border-white/15 text-gray-300 hover:text-white hover:border-cyan-400/50 hover:bg-black/80 transition-all duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Footer Details */}
            <div className="w-full max-w-xl text-center pb-6 px-4">
              <Badge variant="cyan" className="mb-2 text-xs">
                {filteredItems[lightboxIndex].category}
              </Badge>
              <h2 className="text-xl font-bold text-white mb-1.5 leading-tight">
                {filteredItems[lightboxIndex].text}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-1">
                {filteredItems[lightboxIndex].caption}
              </p>
              <span className="text-[11px] text-gray-500 font-mono">
                {filteredItems[lightboxIndex].date}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryContent;