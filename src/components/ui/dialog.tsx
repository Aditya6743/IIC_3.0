import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <DialogPortal onOpenChange={onOpenChange}>{children}</DialogPortal>
      )}
    </AnimatePresence>
  );
};

const DialogPortal: React.FC<{
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
}> = ({ children, onOpenChange }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    role="dialog"
    aria-modal="true"
  >
    {/* Backdrop */}
    <motion.div
      className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
      aria-hidden="true"
    />
    {children}
  </motion.div>
);

const DialogContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    className={cn(
      'relative z-50 glass-card rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-auto',
      className
    )}
    onClick={(e) => e.stopPropagation()}
  >
    {children}
  </motion.div>
);

const DialogClose: React.FC<{
  onClose: () => void;
  className?: string;
}> = ({ onClose, className }) => (
  <button
    onClick={onClose}
    aria-label="Close dialog"
    className={cn(
      'absolute top-4 right-4 z-10 glass-surface p-2 rounded-full text-gray-300',
      'hover:text-pink-400 hover:border-pink-400/50 transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400',
      className
    )}
  >
    <X className="h-5 w-5" />
  </button>
);

const DialogHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
    {children}
  </div>
);

const DialogTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h2 className={cn('text-xl font-semibold text-white', className)}>
    {children}
  </h2>
);

export { Dialog, DialogContent, DialogClose, DialogHeader, DialogTitle };
