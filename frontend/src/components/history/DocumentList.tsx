import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocument } from '../../hooks/useDocument';
import type { DocumentSummary } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';
import { FileText, Trash2, Clock, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DocumentList() {
  const [documents, setDocuments] = useState<DocumentSummary[]>([]);
  const [total, setTotal] = useState(0);
  const { listDocuments, deleteDocument, loading } = useDocument();
  const navigate = useNavigate();

  const fetchDocs = async () => {
    try {
      const result = await listDocuments(1, 20);
      setDocuments(result.docs);
      setTotal(result.total);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [listDocuments]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Delete this document and its chat history?')) return;
    try {
      await deleteDocument(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      toast.success('Document deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-20 h-20 rounded-3xl bg-surface/50 border border-border mx-auto mb-6 flex items-center justify-center opacity-50">
          <FileText className="w-10 h-10 text-text-secondary" />
        </div>
        <h3 className="text-xl font-heading font-bold text-text-primary">No Documents analyzed yet</h3>
        <p className="text-sm text-text-secondary mt-2 max-w-xs mx-auto mb-8">
          Upload or paste a document to let our AI break it down for you.
        </p>
        <button 
          onClick={() => navigate('/analyze')}
          className="btn-primary px-6 py-2.5 rounded-full text-sm"
        >
          Start First Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2 px-4 pt-4">
        <h2 className="text-xs font-heading font-bold text-text-secondary uppercase tracking-[0.2em] pl-1">
          Recent Documents
        </h2>
        <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
           {total} Total
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover onClick={() => navigate(`/document/${doc.id}`)} className="group cursor-pointer !p-0 overflow-hidden relative border-border/50 hover:border-primary/30 transition-all duration-300">
              <div className="flex flex-col sm:flex-row min-h-[100px]">
                
                {/* Risk Indicator Column (Desktop & Side on Mobile) */}
                <div className={`w-2 sm:w-3 flex-shrink-0 ${
                  doc.riskScore === null ? 'bg-border' :
                  doc.riskScore > 60 ? 'bg-danger' : 
                  doc.riskScore > 30 ? 'bg-warning' : 
                  'bg-success'
                }`} />

                {/* Main Content */}
                <div className="flex-1 p-6 md:p-5 flex flex-col justify-center min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-4 md:mb-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[17px] md:text-base font-heading font-bold text-text-primary truncate group-hover:text-primary transition-colors leading-tight">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-2 md:mt-1 opacity-70">
                        <div className="flex items-center gap-1.5 text-xs text-text-secondary font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {new Date(doc.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </div>
                        <Badge size="sm" className="bg-surface border-border/40 text-[10px] uppercase font-bold tracking-wider">{doc.fileType}</Badge>
                      </div>
                    </div>

                    {/* Risk Score Bubble - Prominent on mobile */}
                    {doc.riskScore !== null && (
                      <div className={`flex flex-col items-center justify-center w-14 h-14 md:w-12 md:h-12 rounded-2xl border shadow-lg transition-transform group-hover:scale-110 ${
                        doc.riskScore > 60 ? 'bg-danger/10 border-danger/30 text-danger' : 
                        doc.riskScore > 30 ? 'bg-warning/10 border-warning/30 text-warning' : 
                        'bg-success/10 border-success/30 text-success'
                      }`}>
                        <span className="text-lg md:text-sm font-black leading-none">{doc.riskScore}</span>
                        <span className="text-[9px] md:text-[8px] uppercase font-bold mt-1 opacity-70">Risk</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {doc.documentType ? (
                        <Badge variant="primary" size="sm" className="bg-primary/10 text-primary border-primary/20 text-[11px]">
                           {doc.documentType}
                        </Badge>
                      ) : (
                        <Badge size="sm" className="bg-transparent border-border/30 text-text-secondary/60 italic text-[11px]">Uncategorized</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => handleDelete(doc.id, e)}
                        className="p-2 md:p-1.5 text-text-secondary/40 hover:text-danger hover:bg-danger/10 rounded-xl transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 md:w-4 md:h-4" />
                      </button>
                      <ChevronRight className="w-5 h-5 text-text-secondary/20 group-hover:text-primary group-hover:translate-x-1 transition-all hidden md:block" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
