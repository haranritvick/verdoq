import { useState } from 'react';
import Button from '../ui/Button';
import { Type } from 'lucide-react';
import { motion } from 'framer-motion';

interface TextPasteProps {
  onTextSubmit: (text: string, title?: string) => void;
  isLoading?: boolean;
}

export default function TextPaste({ onTextSubmit, isLoading }: TextPasteProps) {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (text.trim()) {
      onTextSubmit(text, title || undefined);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center">
          <Type className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-text-primary">Paste raw text</h3>
          <p className="text-xs text-text-secondary">Paste document content directly</p>
        </div>
      </div>

      <input
        type="text"
        placeholder="Document title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input-dark w-full mb-3 text-sm"
      />

      <textarea
        placeholder="Paste your document text here... (lease agreement, contract, policy, etc.)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input-dark w-full h-40 resize-none text-sm mb-4"
        maxLength={50000}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary">{text.length.toLocaleString()} / 50,000 chars</span>
        <Button onClick={handleSubmit} disabled={!text.trim() || isLoading} size="sm">
          {isLoading ? 'Analyzing...' : 'Analyze Text'}
        </Button>
      </div>
    </motion.div>
  );
}
