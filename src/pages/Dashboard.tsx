import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DocumentList from '../components/history/DocumentList';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Manage your analyzed documents</p>
        </div>
        <Button onClick={() => navigate('/analyze')}>
          <Plus className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
      </motion.div>

      <DocumentList />
    </div>
  );
}
