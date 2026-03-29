import { useState, useCallback } from 'react';
import api from '../services/api';
import type { DocumentFull, DocumentSummary, PaginatedResponse } from '../types';

export function useDocument() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const { data } = await api.post('/api/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data.data as DocumentFull;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to upload document';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitText = useCallback(async (text: string, title?: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.post('/api/documents/text', { text, title });
      return data.data as DocumentFull;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to submit text';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const getDocument = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/documents/${id}`);
      return data.data as DocumentFull;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to load document';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const listDocuments = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/documents?page=${page}&limit=${limit}`);
      return data.data as PaginatedResponse<DocumentSummary>;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to load documents';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFiles = useCallback(async (files: File[]): Promise<DocumentFull[]> => {
    setLoading(true);
    setError(null);
    const results: DocumentFull[] = [];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        const { data } = await api.post('/api/documents/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        results.push(data.data as DocumentFull);
      }
      return results;
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Failed to upload documents';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDocument = useCallback(async (id: string) => {
    try {
      await api.delete(`/api/documents/${id}`);
    } catch (err: any) {
      throw new Error(err.response?.data?.error || 'Failed to delete document');
    }
  }, []);

  return { uploadFile, uploadFiles, submitText, getDocument, listDocuments, deleteDocument, loading, error };
}
