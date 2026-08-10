import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionItemProps {
  value: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: (value: string) => void;
}

interface AccordionProps {
  type?: 'single' | 'multiple';
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

const AccordionContext = React.createContext<{
  openItems: Set<string>;
  toggle: (value: string) => void;
  type: 'single' | 'multiple';
}>({
  openItems: new Set(),
  toggle: () => {},
  type: 'single',
});

const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  children,
  className,
  defaultValue,
}) => {
  const [openItems, setOpenItems] = React.useState<Set<string>>(
    defaultValue ? new Set([defaultValue]) : new Set()
  );

  const toggle = React.useCallback((value: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        if (type === 'single') next.clear();
        next.add(value);
      }
      return next;
    });
  }, [type]);

  const contextValue = React.useMemo(() => ({ openItems, toggle, type }), [openItems, toggle, type]);

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={cn('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  title,
  children,
  className,
}) => {
  const { openItems, toggle } = React.useContext(AccordionContext);
  const isOpen = openItems.has(value);

  return (
    <div
      className={cn(
        'glass-card rounded-xl overflow-hidden border border-pink-500/20 transition-all duration-300',
        isOpen && 'border-pink-500/40',
        className
      )}
    >
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between focus-visible:outline-none group hover:bg-white/5 transition-colors duration-300"
        onClick={() => toggle(value)}
        aria-expanded={isOpen}
      >
        <span className="text-white font-medium text-base md:text-lg leading-snug">
          {title}
        </span>
        <div className="bg-gradient-to-br from-pink-500/20 to-purple-600/20 p-2 rounded-full ml-4 flex-shrink-0 transition-colors duration-300 group-hover:from-pink-500/30 group-hover:to-purple-600/30">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <ChevronDown className="h-5 w-5 text-pink-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-6 pb-5 text-gray-300 text-base leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Accordion, AccordionItem };
