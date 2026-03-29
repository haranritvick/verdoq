import { useState, useCallback } from 'react';
import api from '../services/api';
import type { ChatMessage } from '../types';

export function useChat(documentId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/chat/${documentId}`);
      setMessages(data.data.messages);
    } catch (err) {
      console.error('Failed to fetch chat history:', err);
    } finally {
      setLoading(false);
    }
  }, [documentId]);

  const sendMessage = useCallback(async (content: string) => {
    setSending(true);
    // Optimistically add user message
    const tempUserMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    try {
      const { data } = await api.post(`/api/chat/${documentId}`, { content });
      const assistantMsg = data.data as ChatMessage;
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== tempUserMsg.id),
        { ...tempUserMsg, id: `user-${Date.now()}` },
        assistantMsg,
      ]);
      return assistantMsg;
    } catch (err: any) {
      // Remove optimistic message on error
      setMessages((prev) => prev.filter((m) => m.id !== tempUserMsg.id));
      throw new Error(err.response?.data?.error || 'Failed to send message');
    } finally {
      setSending(false);
    }
  }, [documentId]);

  const clearChat = useCallback(async () => {
    try {
      await api.delete(`/api/chat/${documentId}`);
      setMessages([]);
    } catch (err) {
      console.error('Failed to clear chat:', err);
    }
  }, [documentId]);

  return { messages, loading, sending, fetchHistory, sendMessage, clearChat };
}
