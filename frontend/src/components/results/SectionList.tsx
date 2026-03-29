import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { DocumentSection } from '../../types';

interface SectionListProps {
  sections: DocumentSection[];
}

export default function SectionList({ sections }: SectionListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
        <div className="w-1.5 h-6 bg-primary rounded-full" />
        Section Breakdown
      </h3>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="glass-card !p-0 rounded-2xl overflow-hidden transition-all duration-300 border-border/40 hover:border-primary/20"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-bold text-text-primary text-sm sm:text-base pr-4">{section.title}</span>
              <div className={`p-1.5 rounded-lg transition-all ${openIndex === index ? 'bg-primary/10 text-primary' : 'bg-surface text-text-secondary'}`}>
                {openIndex === index ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-border/30 bg-white/[0.01]"
                >
                  <div className="p-5 sm:p-6 space-y-5">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
                        <p className="text-[10px] uppercase font-bold tracking-widest text-primary">Plain English Breakdown</p>
                      </div>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-light">{section.plainText}</p>
                    </div>
                    {section.originalText && (
                      <div className="pt-4 border-t border-border/20">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-text-secondary/60 mb-2">Original Document Text</p>
                        <p className="text-xs sm:text-sm text-text-secondary/50 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/[0.02] italic font-light shadow-inner">
                          "{section.originalText}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
