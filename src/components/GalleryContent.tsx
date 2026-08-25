import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface GalleryItem {
  image: string;
  text: string;
  category: 'IIC 1.0' | 'IIC 2.0' | 'Workshops' | 'Ceremony' | 'Winners';
  caption: string;
  date: string;
  aspect: string; // e.g. "aspect-[4/3]" or "aspect-[3/4]" to prevent layout shift
}

const galleryItems: GalleryItem[] = [
  { image: '/20241115_101932.jpg', text: 'Opening Session', category: 'Ceremony', caption: 'Inaugural address of IIC 2024 by university leadership.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/20241115_224002.jpg', text: 'Late Night Hacking', category: 'IIC 1.0', caption: 'Participants developing prototypes past midnight.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/20241115_224201.jpg', text: 'Mentor Interaction', category: 'Workshops', caption: 'Expert mentors assisting teams with engineering design.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/20241116_122330.jpg', text: 'Pitch Presentation', category: 'IIC 2.0', caption: 'Final prototype demonstration in front of panel judges.', date: 'Nov 16, 2024', aspect: 'aspect-[4/3]' },
  { image: '/IMG_0001.jpeg', text: 'Team Brainstorming', category: 'IIC 1.0', caption: 'Developing the initial concept and system architecture.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/IMG_1930.JPG', text: 'Hardware Assembly', category: 'Workshops', caption: 'Integrating IoT components and microcontroller boards.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2016.JPG', text: 'Colleague Coding', category: 'IIC 1.0', caption: 'Collaborative development of the web client backend.', date: 'Nov 15, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2025.JPG', text: 'Deep Focus', category: 'IIC 2.0', caption: 'Putting final touches on the user interface before the demo.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2028.JPG', text: 'Testing & Calibration', category: 'IIC 2.0', caption: 'Testing and debugging sensor inputs on the test rig.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2038.JPG', text: 'Innovation Showcase', category: 'Ceremony', caption: 'Attendees exploring interactive project stalls.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2094.JPG', text: 'Closing Panel', category: 'Ceremony', caption: 'Panel discussion on the future of strategic tech.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_2121.JPG', text: 'Victory Celebration', category: 'Winners', caption: 'Team celebrating after securing a podium finish.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG_20241116_015025_570.jpg', text: 'Winner Announcement', category: 'Winners', caption: 'Awarding the first prize for smart village solutions.', date: 'Nov 16, 2024', aspect: 'aspect-[3/4]' },
  { image: '/IMG20241115230723.jpg', text: 'Hackathon Crowd', category: 'IIC 1.0', caption: 'Over 500 innovators gathered at the central arena.', date: 'Nov 15, 2024', aspect: 'aspect-[4/3]' },
  { image: '/IMG_0004.jpeg', text: 'Team Portrait', category: 'Winners', caption: 'Group picture of the project team with their awards.', date: 'Nov 16, 2024', aspect: 'aspect-[4/3]' },
];

const categories = ['All', 'IIC 1.0', 'IIC 2.0', 'Workshops', 'Ceremony', 'Winners'] as const;

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  openLightbox: (idx: number) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, index, openLightbox }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
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
    >
      {/* Aspect Ratio Box to reserve card space and prevent layout shift */}
      <div className={`w-full relative overflow-hidden ${item.aspect}`}>
        {/* Local Image Skeleton */}
        {!loaded && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-2xl" />
        )}
        <img
          src={item.image}
          alt={item.caption}
          className={`w-full h-full object-cover rounded-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:brightness-90 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Hover Scrim & Overlay details */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left rounded-2xl"
        aria-hidden="true"
      >
        <Badge variant="cyan" className="text-[9px] px-2 py-0.5 w-fit mb-2">
          {item.category}
        </Badge>
        <h3 className="text-white font-bold text-base mb-1 tracking-tight">
          {item.text}
        </h3>
        <p className="text-gray-300 text-xs leading-normal mb-1.5">
          {item.caption}
        </p>
        <span className="text-[10px] text-gray-400 font-medium">
          {item.date}
        </span>

        {/* Top-Right Maximize Icon */}
        <div className="absolute top-4 right-4 p-2 rounded-lg bg-black/50 border border-white/10 text-white hover:text-cyan-300 hover:border-cyan-500/30 transition-all duration-200">
          <Maximize2 className="h-3.5 w-3.5" />
        </div>
      </div>
    </motion.div>
  );
};

const GalleryContent: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: '-80px' });

  // Filter items
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

  const navigateLightbox = useCallback((direction: number) => {
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null;
      return (prevIndex + direction + filteredItems.length) % filteredItems.length;
    });
    setIsZoomed(false);
  }, [filteredItems.length]);

  // Keyboard navigation for Lightbox (safely defined after callbacks)
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
      <div className="container mx-auto px-4 pt-24 pb-8" ref={headerRef}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block p-3 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-full mb-5">
            <Camera className="h-7 w-7 text-pink-400" aria-hidden="true" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="gradient-text">Event Gallery</span>
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore and relive the moments from IIC 2024 through our Pinterest-style masonry collection.
          </p>
        </motion.div>

        {/* ── Filter Chips ───────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mt-10 mb-8"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          role="tablist"
          aria-label="Filter gallery images by category"
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 border ${
                  isActive
                    ? 'text-white border-cyan-400/60 bg-gradient-to-r from-cyan-500/20 to-teal-500/20'
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

      {/* ── Masonry Grid / Cards ────────────────────────────────────────── */}
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
                key={item.image}
                item={item}
                index={index}
                openLightbox={openLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Professional Full-Screen Lightbox ──────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-black/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery viewer"
          >
            {/* Lightbox Header Controls */}
            <div className="w-full flex items-center justify-between p-3 relative z-10">
              {/* Counter label */}
              <div className="text-gray-400 font-mono text-sm">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label={isZoomed ? "Zoom out image" : "Zoom in image"}
                >
                  {isZoomed ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
                </button>
                <button
                  onClick={closeLightbox}
                  className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Close image viewer"
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
                className="absolute left-4 p-3 rounded-full bg-black/50 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Centered Image Container */}
              <div className="max-w-5xl max-h-[75vh] px-12 overflow-hidden flex items-center justify-center select-none">
                <motion.img
                  key={lightboxIndex}
                  src={filteredItems[lightboxIndex].image}
                  alt={filteredItems[lightboxIndex].caption}
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{
                    scale: isZoomed ? 1.25 : 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className={`max-w-full max-h-[72vh] rounded-xl object-contain shadow-2xl transition-transform duration-300 ${
                    isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              {/* Right Arrow Button */}
              <button
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 p-3 rounded-full bg-black/50 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Lightbox Footer Details */}
            <div className="w-full max-w-xl text-center pb-6 px-4">
              <Badge variant="cyan" className="mb-2">
                {filteredItems[lightboxIndex].category}
              </Badge>
              <h2 className="text-xl font-bold text-white mb-2 leading-tight">
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