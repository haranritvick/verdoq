import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DropZone from '../components/upload/DropZone';
import TextPaste from '../components/upload/TextPaste';
import SummaryCard from '../components/results/SummaryCard';
import SectionList from '../components/results/SectionList';
import RedFlagList from '../components/results/RedFlagList';
import RiskScore from '../components/results/RiskScore';
import { useDocument } from '../hooks/useDocument';
import type { DocumentFull } from '../types';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function Analyze() {
  const [result, setResult] = useState<DocumentFull | null>(null);
  const { uploadFile, submitText, loading, error } = useDocument();
  const navigate = useNavigate();

  const handleFileSelected = async (file: File) => {
    try {
      const doc = await uploadFile(file);
      setResult(doc);
      toast.success('Document analyzed successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Analysis failed');
    }
  };

  const handleTextSubmit = async (text: string, title?: string) => {
    try {
      const doc = await submitText(text, title);
      setResult(doc);
      toast.success('Text analyzed successfully!');
    } catch (err: any) {
      toast.error(err.message || 'Analysis failed');
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col items-center justify-center gap-6">
          <Spinner size="lg" />
          <div className="text-center">
            <h2 className="text-xl font-heading font-bold text-text-primary mb-2">Analyzing your document...</h2>
            <p className="text-sm text-text-secondary">Our AI is reading and breaking down your document. This may take 10-15 seconds.</p>
          </div>
          {/* Skeleton loading cards */}
          <div className="w-full space-y-4 mt-6">
            <div className="shimmer-loading h-32" />
            <div className="shimmer-loading h-24" />
            <div className="shimmer-loading h-24" />
          </div>
        </div>
      </div>
    );
  }

  if (result?.analysis) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-heading font-bold text-text-primary"
          >
            Analysis Results
          </motion.h1>
          <div className="flex gap-3">
            <Button variant="secondary" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
            <Button size="sm" onClick={() => navigate(`/document/${result.id}`)}>
              View Full Details
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SummaryCard analysis={result.analysis} title={result.title} />
            <SectionList sections={result.analysis.sections} />
            <RedFlagList redFlags={result.analysis.redFlags} />
          </div>
          <div>
            <RiskScore score={result.analysis.riskScore} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">Analyze a Document</h1>
        <p className="text-text-secondary">Upload a file or paste text to get a plain-English breakdown</p>
      </motion.div>

      {error && (
        <div className="glass-card p-4 border-danger/30 mb-6 text-center">
          <p className="text-danger text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        <DropZone onFileSelected={handleFileSelected} isLoading={loading} />

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-text-secondary uppercase tracking-wider">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <TextPaste onTextSubmit={handleTextSubmit} isLoading={loading} />
      </div>
    </div>
  );
}
