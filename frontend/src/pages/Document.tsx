import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDocument } from '../hooks/useDocument';
import { useChat } from '../hooks/useChat';
import type { DocumentFull } from '../types';
import SummaryCard from '../components/results/SummaryCard';
import SectionList from '../components/results/SectionList';
import RedFlagList from '../components/results/RedFlagList';
import RiskScore from '../components/results/RiskScore';
import ChatWindow from '../components/chat/ChatWindow';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/Button';
import { ArrowLeft, Trash2, Calendar, FileText, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Badge from '../components/ui/Badge';

export default function Document() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDocument, deleteDocument, loading: docLoading } = useDocument();
  const { messages, loading: chatLoading, sending, fetchHistory, sendMessage, clearChat } = useChat(id!);
  const [doc, setDoc] = useState<DocumentFull | null>(null);
  const [chatExpanded, setChatExpanded] = useState(false);
  const toggleChatExpand = useCallback(() => setChatExpanded((prev) => !prev), []);

  useEffect(() => {
    if (id) {
      getDocument(id)
        .then(setDoc)
        .catch(() => navigate('/dashboard'));
      fetchHistory();
    }
  }, [id, getDocument, fetchHistory, navigate]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await deleteDocument(id!);
      toast.success('Document deleted');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to delete document');
    }
  };

  if (docLoading || !doc) {
    return (
      <div className="flex justify-center items-center py-24 px-6 min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="mb-4 pl-0">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="w-full sm:w-auto">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-2 line-clamp-2 md:line-clamp-none">
              {doc.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{doc.fileType.toUpperCase()}</Badge>
              <div className="flex items-center text-sm text-text-secondary gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(doc.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-text-secondary gap-1">
                <FileText className="w-4 h-4" />
                {doc.originalText.length.toLocaleString()} chars
              </div>
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={handleDelete} className="w-full sm:w-auto mt-2 sm:mt-0">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Document
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Analysis */}
        <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
          {doc.analysis ? (
            <>
              <SummaryCard analysis={doc.analysis} title="Document Overview" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-6">
                <SectionList sections={doc.analysis.sections} />
              </div>
              <RedFlagList redFlags={doc.analysis.redFlags} />
            </>
          ) : (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-surface border border-border flex items-center justify-center mx-auto mb-4">
                 <FileText className="w-8 h-8 text-text-secondary" />
              </div>
              <p className="text-text-secondary">No AI analysis available for this document.</p>
            </div>
          )}
        </div>

        {/* Right Column: Risk & Chat */}
        <div className="space-y-8 order-1 lg:order-2">
          {doc.analysis && (
            <RiskScore score={doc.analysis.riskScore} />
          )}

          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-heading font-bold text-text-primary flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                AI Assistant
              </h3>
            </div>
            <ChatWindow
              messages={messages}
              loading={chatLoading}
              sending={sending}
              onSendMessage={sendMessage}
              onClearChat={clearChat}
              isExpanded={chatExpanded}
              onToggleExpand={toggleChatExpand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
