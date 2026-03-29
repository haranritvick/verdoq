import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage.tsx';
import ChatInput from './ChatInput';
import type { ChatMessage as ChatMessageType } from '../../types';
import { MessageCircle, Trash2, Maximize2, Minimize2, X } from 'lucide-react';
import Spinner from '../ui/Spinner';

interface ChatWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
  sending: boolean;
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

export default function ChatWindow({
  messages,
  loading,
  sending,
  onSendMessage,
  onClearChat,
  isExpanded = false,
  onToggleExpand,
}: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const chatContent = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className={`font-semibold text-text-primary ${isExpanded ? 'text-lg' : 'text-sm'}`}>
            Ask about this document
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={onClearChat}
              className="text-text-secondary hover:text-danger transition-colors p-1.5 rounded-lg hover:bg-surface"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="text-text-secondary hover:text-primary transition-colors p-1.5 rounded-lg hover:bg-surface"
              title={isExpanded ? 'Minimize chat' : 'Expand chat'}
            >
              {!isExpanded && <Maximize2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6 text-text-secondary" />
            </div>
            <p className={`text-text-secondary ${isExpanded ? 'text-base' : 'text-sm'}`}>
              Ask any question about this document
            </p>
            <p className="text-xs text-text-secondary/70 mt-1">
              e.g. "What happens if I break the lease early?"
            </p>
          </div>
        ) : (
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)
        )}
        {sending && (
          <div className="flex items-center gap-2 px-4 py-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs text-text-secondary">AI is thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={sending} />
    </>
  );

  // ── EXPANDED MODAL MODE ──
  if (isExpanded) {
    return (
      <AnimatePresence>
        <motion.div
          key="chat-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onToggleExpand?.();
          }}
        >
          <motion.div
            key="chat-modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="glass-card flex flex-col w-full max-w-2xl h-[80vh] relative overflow-hidden"
            style={{
              boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.5), 0 0 40px -8px var(--color-primary-a20, rgba(59, 130, 246, 0.15))',
            }}
          >
            {/* Close button */}
            <button
              onClick={onToggleExpand}
              className="absolute top-4 right-4 z-10 text-text-secondary hover:text-text-primary transition-colors p-1.5 rounded-full hover:bg-surface"
            >
              <X className="w-5 h-5" />
            </button>
            {chatContent}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // ── INLINE COMPACT MODE ──
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card flex flex-col h-[500px]"
    >
      {chatContent}
    </motion.div>
  );
}
