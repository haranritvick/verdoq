import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { FileText, Zap } from 'lucide-react';
import type { DocumentAnalysis } from '../../types';

interface SummaryCardProps {
  analysis: DocumentAnalysis;
  title: string;
}

export default function SummaryCard({ analysis, title }: SummaryCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-heading font-bold text-text-primary">{title}</h2>
              <Badge variant="primary" size="md">{analysis.documentType}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-medium">AI Analysis</span>
          </div>
        </div>

        <p className="text-text-secondary leading-relaxed">{analysis.summary}</p>
      </Card>
    </motion.div>
  );
}
