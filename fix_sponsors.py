import re

with open('src/components/SponsorsContent.tsx', 'r') as f:
    content = f.read()

old_card = '''  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <div
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Visit ${sponsor.name} website`}
        className="w-full bg-[#061820]/40 border border-border/30 rounded-2xl p-5 flex flex-col justify-between text-left transition-all duration-300 hover:border-cyan-400/40 hover:shadow-glass hover:-translate-y-1 group relative overflow-hidden"
      >
        {/* Animated Sweep Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]"
          aria-hidden="true"
        />

        {/* Branded Logo Container (White background to respect logo colors) */}
        <div className="w-full h-24 bg-white rounded-xl p-4 flex items-center justify-center relative overflow-hidden flex-shrink-0">
          {!logoLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full bg-[#f8fafc]" />
          )}
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className={`max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLogoLoaded(true)}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              setLogoLoaded(true);
            }}
          />
        </div>

        {/* Sponsor Details */}
        <div className="mt-5 relative z-10 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
              {sponsor.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-400" />
          </div>
          <span className="text-xs font-medium text-cyan-400/80 uppercase tracking-wider mb-2 block">
            {sponsor.industry}
          </span>
          <p className="text-sm text-gray-400/90 leading-relaxed line-clamp-3">
            {sponsor.description}
          </p>
        </div>
      </div>
    </motion.div>
  );'''

new_card = '''  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="w-full"
    >
      <div
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`Visit ${sponsor.name} website`}
        className="w-full h-full bg-[#061820]/60 border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-left transition-all duration-500 hover:border-cyan-400/50 hover:shadow-[0_10px_30px_-10px_rgba(34,211,238,0.3)] hover:-translate-y-2 group relative overflow-hidden backdrop-blur-md"
      >
        {/* Scanning Cyber-Grid Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxwYXRoIGQ9Ik0wIDIwaDIwdjFIMHptMjAtMjBWMEgxOXYyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Neon Scanline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400 opacity-0 group-hover:opacity-100 group-hover:animate-scanline shadow-[0_0_15px_rgba(34,211,238,0.8)] z-0" />

        {/* Branded Logo Container (White background to respect logo colors) */}
        <div className="w-full h-28 bg-white rounded-xl p-4 flex items-center justify-center relative overflow-hidden flex-shrink-0 z-10 shadow-inner group-hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] transition-shadow duration-500">
          {!logoLoaded && (
            <Skeleton className="absolute inset-0 w-full h-full bg-[#f8fafc]" />
          )}
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className={`max-w-full max-h-full object-contain transition-all duration-700 group-hover:scale-110 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setLogoLoaded(true)}
            onError={(e) => {
              const img = e.currentTarget;
              img.style.display = 'none';
              setLogoLoaded(true);
            }}
          />
        </div>

        {/* Sponsor Details */}
        <div className="mt-5 relative z-10 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
              {sponsor.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-cyan-400" />
          </div>
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-3 block">
            {sponsor.industry}
          </span>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
            {sponsor.description}
          </p>
        </div>
      </div>
    </motion.div>
  );'''

content = content.replace(old_card, new_card)

with open('src/components/SponsorsContent.tsx', 'w') as f:
    f.write(content)
