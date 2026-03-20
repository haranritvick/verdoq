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
      <h3 className="text-lg font-heading font-bold text-text-primary mb-4">Section Breakdown</h3>
      <div className="space-y-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="glass-card overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-border/20 transition-colors"
            >
              <span className="font-medium text-text-primary text-sm">{section.title}</span>
              {openIndex === index ? (
                <ChevronDown className="w-4 h-4 text-primary flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-text-secondary flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary mb-1 font-semibold">Plain English</p>
                      <p className="text-sm text-text-secondary leading-relaxed">{section.plainText}</p>
                    </div>
                    {section.originalText && (
                      <div>
                        <p className="text-xs uppercase tracking-wider text-text-secondary mb-1 font-semibold">Original Text</p>
                        <p className="text-xs text-text-secondary/70 leading-relaxed bg-background/50 p-3 rounded-lg italic">
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
