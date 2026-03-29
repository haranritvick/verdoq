import { useState, useEffect } from 'react';
import { FileText, Loader2, AlertTriangle, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { DocumentFull } from './types';

export default function Popup() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DocumentFull | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Attempt to read token from extension storage (simulated auth sync)
    chrome.storage?.local.get(['verdoq_token'], (res: { [key: string]: any }) => {
      if (res.verdoq_token) setToken(res.verdoq_token);
    });
  }, []);

  const handleAnalyzePage = () => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: chrome.tabs.Tab[]) => {
      const activeTab = tabs[0];
      if (activeTab?.id) {
        chrome.tabs.sendMessage(activeTab.id, { type: 'SCRAPE_TEXT' }, async (response: any) => {
          if (chrome.runtime.lastError || !response?.text) {
            setAnalyzing(false);
            setError('Could not read page text. Try manually selecting text.');
            return;
          }

          try {
            // Note: In real production we will have tokens synced from the web app
            const API_URL = 'http://localhost:5000/api/documents/text';
            const { data } = await axios.post(
              API_URL, 
              { title: activeTab.title || 'Web Page Analysis', text: response.text },
              { headers: token ? { Authorization: `Bearer ${token}` } : {} }
            );
            
            setResult(data.data);
          } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to analyze page');
          } finally {
            setAnalyzing(false);
          }
        });
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-background text-text-primary p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6 border-b border-border pb-3">
        <div className="w-6 h-6 bg-primary rounded shadow-lg shadow-primary/20 flex items-center justify-center">
          <ShieldCheck className="w-4 h-4 text-background" />
        </div>
        <h1 className="font-heading font-bold text-lg">Verdoq Ext</h1>
      </div>

      {!result && !analyzing && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <FileText className="w-12 h-12 text-text-secondary mb-3" />
          <h2 className="text-base font-semibold mb-1">Analyze This Page</h2>
          <p className="text-xs text-text-secondary mb-6 px-4">
            Extracts the main readable text from the current page and runs our AI plain-English breakdown.
          </p>
          <button
            onClick={handleAnalyzePage}
            className="w-full bg-primary text-background font-semibold py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Decode Page
          </button>
          {error && <p className="text-danger text-xs mt-4">{error}</p>}
        </div>
      )}

      {analyzing && (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
          <p className="font-medium text-sm">Decoding page...</p>
        </div>
      )}

      {result?.analysis && (
        <div className="flex flex-col gap-4 animate-fade-in">
          {/* Risk Score */}
          <div className="bg-surface border border-border rounded-xl p-4 flex items-center justify-between">
            <span className="text-sm font-semibold">Risk Score</span>
            <div className="flex items-center gap-2">
               <span 
                className="font-heading font-bold text-xl" 
                style={{ color: result.analysis.riskScore > 60 ? '#FF4D4D' : '#4DFF91' }}
              >
                {result.analysis.riskScore}/100
              </span>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-surface border border-border rounded-xl p-4">
            <span className="text-xs uppercase text-primary font-bold tracking-wider mb-2 block">Summary</span>
            <p className="text-sm text-text-secondary leading-relaxed">{result.analysis.summary}</p>
          </div>

          {/* Red Flags count */}
          {result.analysis.redFlags.length > 0 && (
             <div className="bg-danger/10 border border-danger/20 rounded-xl p-4">
               <div className="flex items-center gap-2 mb-2">
                 <AlertTriangle className="w-4 h-4 text-danger" />
                 <span className="text-sm font-bold text-danger">{result.analysis.redFlags.length} Red Flags Found</span>
               </div>
               <p className="text-xs text-danger/80">View full dashboard to see the exact risky clauses.</p>
             </div>
          )}

          <button
            onClick={() => window.open(`http://localhost:5173/document/${result.id}`, '_blank')}
            className="mt-2 w-full bg-surface border border-border text-text-primary py-2.5 rounded-lg hover:bg-border/50 transition-colors text-sm font-medium"
          >
            Open Full Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
