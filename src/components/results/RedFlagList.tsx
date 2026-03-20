import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import { AlertTriangle } from 'lucide-react';
import type { RedFlag } from '../../types';

interface RedFlagListProps {
  redFlags: RedFlag[];
}

export default function RedFlagList({ redFlags }: RedFlagListProps) {
  if (redFlags.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="glass-card p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-safe/10 mx-auto mb-3 flex items-center justify-center">
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-text-primary font-medium">No red flags detected</p>
          <p className="text-sm text-text-secondary mt-1">This document appears to have standard terms</p>
        </div>
      </motion.div>
    );
  }

  const severityVariant = (severity: string) => {
    switch (severity) {
      case 'high': return 'danger' as const;
      case 'medium': return 'warning' as const;
      case 'low': return 'safe' as const;
      default: return 'default' as const;
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-warning" />
        <h3 className="text-lg font-heading font-bold text-text-primary">Red Flags</h3>
        <Badge variant="danger" size="sm">{redFlags.length}</Badge>
      </div>
      <div className="space-y-3">
        {redFlags.map((flag, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card p-4 border-l-2"
            style={{
              borderLeftColor: flag.severity === 'high' ? '#FF4D4D' : flag.severity === 'medium' ? '#FF9A3C' : '#4DFF91',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-text-secondary italic">"{flag.clause}"</p>
              <Badge variant={severityVariant(flag.severity)} size="sm">{flag.severity}</Badge>
            </div>
            <p className="text-sm text-text-primary">{flag.explanation}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
