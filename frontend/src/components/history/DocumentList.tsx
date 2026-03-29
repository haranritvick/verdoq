import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocument } from '../../hooks/useDocument';
import type { DocumentSummary } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Spinner from '../ui/Spinner';
import { FileText, Trash2, Clock } from 'lucide-react';
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
  }, []);

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

  const getRiskVariant = (score: number | null) => {
    if (score === null) return 'default' as const;
    if (score <= 30) return 'safe' as const;
    if (score <= 60) return 'warning' as const;
    return 'danger' as const;
  };

  if (loading && documents.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-2xl bg-surface border border-border mx-auto mb-4 flex items-center justify-center">
          <FileText className="w-8 h-8 text-text-secondary" />
        </div>
        <p className="text-text-primary font-medium">No documents yet</p>
        <p className="text-sm text-text-secondary mt-1">Upload or paste a document to get started</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-heading font-bold text-text-primary">Your Documents</h2>
        <span className="text-sm text-text-secondary">{total} total</span>
      </div>
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card hover onClick={() => navigate(`/document/${doc.id}`)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{doc.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge size="sm">{doc.fileType.toUpperCase()}</Badge>
                      {doc.documentType && <Badge variant="primary" size="sm">{doc.documentType}</Badge>}
                      {doc.riskScore !== null && (
                        <Badge variant={getRiskVariant(doc.riskScore)} size="sm">
                          Risk: {doc.riskScore}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1 text-text-secondary">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{new Date(doc.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="text-text-secondary hover:text-danger transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
