import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ChatMessage from './ChatMessage.tsx';
import ChatInput from './ChatInput';
import type { ChatMessage as ChatMessageType } from '../../types';
import { MessageCircle, Trash2 } from 'lucide-react';
import Spinner from '../ui/Spinner';

interface ChatWindowProps {
  messages: ChatMessageType[];
  loading: boolean;
  sending: boolean;
  onSendMessage: (content: string) => void;
  onClearChat: () => void;
}

export default function ChatWindow({ messages, loading, sending, onSendMessage, onClearChat }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card flex flex-col h-[500px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-sm font-semibold text-text-primary">Ask about this document</h3>
        </div>
        {messages.length > 0 && (
          <button
            onClick={onClearChat}
            className="text-text-secondary hover:text-danger transition-colors p-1"
            title="Clear chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
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
            <p className="text-sm text-text-secondary">Ask any question about this document</p>
            <p className="text-xs text-text-secondary/70 mt-1">e.g. "What happens if I break the lease early?"</p>
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
    </motion.div>
  );
}
