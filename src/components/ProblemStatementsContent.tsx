import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ArrowUpRight, Search, X } from 'lucide-react';
import problemStatements from '@/data/problemstatement.json';

type ProblemStatement = {
  id: string;
  category: string;
  title: string;
  summary: string;
  description?: string;
};

const statementData: ProblemStatement[] = problemStatements;

const aspectsResources = [
  { label: 'APIS dataset paper', url: 'https://arxiv.org/abs/2309.15243' },
  { label: 'AISD dataset paper', url: 'https://arxiv.org/abs/2110.05039' },
  { label: 'ISLES reference', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9741583/' },
  { label: 'NCCT ASPECTS atlas code', url: 'https://github.com/BravoSun/NCCT-atlas-for-ASPECTS-scoring' },
  { label: 'NCCT ASPECTS atlas files', url: 'https://doi.org/10.6084/m9.figshare.26819290' },
  { label: 'NCCT ASPECTS atlas paper', url: 'https://doi.org/10.1038/s41597-024-03973-y' },
  { label: 'MIPLAB elderly NCCT/FLAIR atlas', url: 'https://github.com/deepthirajashekar/FLAIR-and-NCCT-atlas-for-elderly' },
  { label: 'Whole-brain stroke-population CT-MRI atlas', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9271109/' },
  { label: 'Siemens atlas-based scoring reference', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC7966210/' },
];

const ProblemStatementsContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  const [selectedStatement, setSelectedStatement] = useState<ProblemStatement | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!selectedStatement) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedStatement(null);
    };

    document.body.style.overflowY = 'scroll';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [selectedStatement]);

  const filteredStatements = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return statementData;

    return statementData.filter((statement) =>
      [statement.title, statement.category, statement.summary, statement.description ?? '']
        .join(' ')
        .toLowerCase()
        .includes(query),
    );
  }, [searchQuery]);

  return (
    <div ref={sectionRef} className="min-h-screen space-bg">
      <main className="container mx-auto px-4 pt-32 pb-24">
        <motion.header
          className="mx-auto mb-14 max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300/80">
            IIC 3.0 / Challenge Library
          </p>
          <h1 className="mb-5 text-4xl font-bold text-white md:text-6xl">
            Problem <span className="gradient-text">Statements</span>
          </h1>
          <div className="section-divider mb-6" aria-hidden="true" />
          <p className="mx-auto max-w-3xl text-base leading-7 text-gray-300 md:text-lg">
            Explore real-world challenges across technology, public service, and industry. Open any card to understand the opportunity, constraints, and intended impact.
          </p>
        </motion.header>

        <div className="mb-10 flex justify-center">
          <label className="relative block w-full max-w-xl">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search by challenge, theme, or keyword..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="glass-surface w-full rounded-xl border border-emerald-400/20 bg-transparent py-3 pl-11 pr-4 text-sm text-white outline-none transition-colors placeholder:text-gray-500 focus:border-emerald-300/70"
              aria-label="Search problem statements"
            />
          </label>
        </div>

        <div className="mb-6 flex items-center justify-between text-sm text-gray-400">
          <span>{filteredStatements.length} challenges</span>
          {searchQuery && <span>Showing results for &quot;{searchQuery}&quot;</span>}
        </div>

        {filteredStatements.length > 0 ? (
          <motion.div layout className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredStatements.map((statement, index) => (
              <motion.article
                layout
                key={statement.id}
                className="glass-card group flex min-w-0 flex-col rounded-2xl border border-white/10 p-5 md:p-6"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(index * 0.035, 0.35), duration: 0.4 }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    {statement.category}
                  </span>
                  <span className="text-xs text-gray-500">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="mb-3 text-xl font-semibold leading-tight text-white transition-colors group-hover:text-emerald-200">
                  {statement.title}
                </h2>
                <div className="flex-1">
                  <p className="text-sm font-medium leading-6 text-gray-300">{statement.summary}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStatement(statement)}
                  className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                >
                  View details <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <div className="glass-surface rounded-2xl border border-white/10 px-6 py-16 text-center">
            <p className="text-lg font-semibold text-white">No matching challenges</p>
            <p className="mt-2 text-sm text-gray-400">Try a different theme or search term.</p>
          </div>
        )}
      </main>

            {isMounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
        {selectedStatement && (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedStatement(null)}
            onWheel={(event) => {
              if (event.target === event.currentTarget) event.preventDefault();
            }}
            role="presentation"
            onKeyDown={(event) => event.key === 'Escape' && setSelectedStatement(null)}
          >
            <motion.div
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-emerald-300/30 bg-[#07171b]/95 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.75),0_0_40px_rgba(16,185,129,0.12)] backdrop-blur-xl md:p-10"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="statement-title"
              aria-describedby="statement-summary"
            >
              <button
                type="button"
                onClick={() => setSelectedStatement(null)}
                className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.06] p-2.5 text-gray-300 transition-colors hover:border-emerald-300/50 hover:bg-emerald-300/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                aria-label="Close problem statement details"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="mb-7 flex items-start gap-4 pr-12">
                <div className="mt-1 h-10 w-1 shrink-0 rounded-full bg-gradient-to-b from-emerald-300 to-cyan-400" />
                <div>
                  <span className="mb-3 inline-block rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    {selectedStatement.category}
                  </span>
                  <h2 id="statement-title" className="text-2xl font-bold leading-tight text-white md:text-4xl">
                    {selectedStatement.title}
                  </h2>
                </div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <p id="statement-summary" className="text-base font-medium leading-8 text-gray-200 md:text-lg">
                  {selectedStatement.summary}
                </p>
                {selectedStatement.description && (
                  <p className="mt-6 whitespace-pre-line border-l-2 border-emerald-300/70 pl-4 text-sm leading-7 text-gray-300 md:text-base">
                    {selectedStatement.description}
                  </p>
                )}
                {selectedStatement.id === 'health-aspects-scoring' && (
                  <div className="mt-8 border-t border-white/10 pt-6">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      Resource Links
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {aspectsResources.map((resource) => (
                        <a
                          key={resource.url}
                          href={resource.url}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-gray-300 transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-100"
                        >
                          {resource.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
              </AnimatePresence>,
        document.body
      )}
    </div>
  );
};

export default ProblemStatementsContent;