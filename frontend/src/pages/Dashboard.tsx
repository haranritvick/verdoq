import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DocumentList from '../components/history/DocumentList';
import Button from '../components/ui/Button';
import { Plus, History } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 md:py-16 min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
             <History className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-text-primary">Analysis History</h1>
            <p className="text-sm text-text-secondary mt-1">Manage and revisit your analyzed documents</p>
          </div>
        </div>
        <Button onClick={() => navigate('/analyze')} className="w-full sm:w-auto shadow-lg shadow-primary/10">
          <Plus className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </motion.div>

      <div className="glass-card overflow-hidden">
        <DocumentList />
      </div>
    </div>
  );
}
