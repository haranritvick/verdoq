import { motion } from 'framer-motion';
import { Shield, FileText, Zap, MessageCircle, Eye, ArrowRight, Check, Scale } from 'lucide-react';

export default function Landing() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-background text-text-primary relative overflow-hidden">
      {/* Background Ambient Orbs */}
      <div className="glow-orb bg-primary w-[500px] h-[500px] top-[-100px] left-[-150px]" />
      <div className="glow-orb bg-blue-500 w-[600px] h-[600px] top-[20%] right-[-200px] opacity-20" />
      <div className="glow-orb bg-purple-500 w-[400px] h-[400px] bottom-[-100px] left-[20%] opacity-20" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Section — no duplicate nav, uses shared Navbar from Layout */}
      <main className="relative z-10 px-6 pt-16 pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-text-secondary">Powered by GPT-4o</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold font-heading leading-[1.1] mb-8">
            The verdict on <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">
              every document.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Upload any lease, contract, loan agreement, or policy. Get a plain-English breakdown, 
            detect hidden red flags, and instantly assess risk — before you sign.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleLogin} className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <Shield className="w-5 h-5 mr-2" />
              Get Started for Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              View Demo
            </button>
          </div>
        </motion.div>

        {/* Floating Mockup Elements */}
        <motion.div 
          className="relative mt-24 w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="glass-card p-2 md:p-4 border-white/10 ring-1 ring-white/5 shadow-2xl relative z-20">
            <div className="bg-black/50 rounded-xl overflow-hidden aspect-video relative flex flex-col border border-white/5">
              {/* Fake Chrome Topbar */}
              <div className="h-10 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5 border-r border-white/10 pr-4">
                  <div className="w-3 h-3 rounded-full bg-danger/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-safe/80" />
                </div>
                <div className="mx-2 flex-1 h-6 bg-black/40 rounded-md border border-white/5 flex items-center px-3 justify-center">
                  <span className="text-[10px] text-text-secondary font-medium tracking-wide">verdoq.com/analyze/contract</span>
                </div>
              </div>
              {/* Fake UI Body */}
              <div className="flex-1 p-6 flex gap-6 pattern-dots bg-center bg-[size:20px_20px]">
                 <div className="flex-1 space-y-4">
                   <div className="h-8 w-1/3 bg-white/10 rounded-md" />
                   <div className="h-4 w-full bg-white/5 rounded-md" />
                   <div className="h-4 w-full bg-white/5 rounded-md" />
                   <div className="h-4 w-5/6 bg-white/5 rounded-md" />
                   <div className="mt-8 space-y-3">
                     <div className="h-16 w-full rounded-xl bg-danger/10 border border-danger/20 flex items-center px-4 gap-4">
                        <AlertTriangle className="w-6 h-6 text-danger" />
                        <div>
                          <div className="h-3 w-32 bg-danger/50 rounded-full mb-2" />
                          <div className="h-2 w-64 bg-danger/30 rounded-full" />
                        </div>
                     </div>
                   </div>
                 </div>
                 <div className="w-1/3 hidden md:flex flex-col gap-4">
                   <div className="glass-card p-6 flex flex-col items-center justify-center border-primary/20 bg-primary/5">
                      <div className="w-32 h-32 rounded-full border-8 border-primary/20 border-t-primary animate-spin mb-4" />
                      <div className="text-3xl font-heading font-bold text-primary">85/100</div>
                      <div className="text-xs text-text-secondary mt-1">DANGEROUS</div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
          
          {/* Decorative floating badges */}
          <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-8 -right-8 md:-right-16 glass-card px-6 py-4 flex items-center gap-3 z-30 shadow-primary/20">
            <Check className="w-6 h-6 text-primary" />
            <div>
              <p className="font-bold text-sm">Red Flag Detected</p>
              <p className="text-xs text-text-secondary">Indemnification Clause</p>
            </div>
          </motion.div>
          <motion.div animate={{ y: [10, -10, 10] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -bottom-8 -left-8 md:-left-16 glass-card px-6 py-4 flex items-center gap-3 z-30">
            <Zap className="w-6 h-6 text-safe" />
            <div>
              <p className="font-bold text-sm">Auto-Summarized</p>
              <p className="text-xs text-text-secondary">2.5k words reduced to 2 paragraphs</p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Bento Grid Features */}
      <section className="relative z-10 px-6 py-32 bg-black/40 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">Decode complexity instantly.</h2>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">Upload any dense legal document and our models break it down into actionable insights.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 auto-rows-[250px]">
            <div className="glass-card p-8 md:col-span-2 flex flex-col justify-between group hover:border-primary/30 transition-colors">
              <div>
                <FileText className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-2">Plain English Translations</h3>
                <p className="text-text-secondary">We rewrite legal jargon into sentences a middle schooler could understand. No more guessing what "heretofore" means.</p>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full mt-4 overflow-hidden">
                <div className="h-full bg-primary w-2/3" />
              </div>
            </div>

            <div className="glass-card p-8 flex flex-col justify-between group hover:border-danger/30 transition-colors">
              <div>
                <Eye className="w-8 h-8 text-danger mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-2">Red Flag Detection</h3>
                <p className="text-text-secondary">We scan for unusual liabilities, crazy termination clauses, and hidden fees.</p>
              </div>
            </div>

            <div className="glass-card p-8 flex flex-col justify-between group hover:border-blue-500/30 transition-colors">
              <div>
                <MessageCircle className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-2">Contextual Q&A</h3>
                <p className="text-text-secondary">Ask "Can I break this lease early?" and get an exact answer based purely on the document text.</p>
              </div>
            </div>

            <div className="glass-card p-8 md:col-span-2 flex flex-col justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <Shield className="w-8 h-8 text-safe mb-4" />
                <h3 className="text-2xl font-bold font-heading mb-2">Enterprise-Grade Security</h3>
                <p className="text-text-secondary max-w-md">Your documents are processed securely and scrubbed after analysis. We don't train our models on your private data.</p>
              </div>
              <div className="absolute right-[-10%] bottom-[-20%] w-64 h-64 bg-safe/10 rounded-full blur-[80px] group-hover:bg-safe/20 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative z-10 px-6 py-32 border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">Stop signing things blindly.</h2>
          <button onClick={handleLogin} className="btn-primary text-xl px-12 py-5 mx-auto">
            Try Verdoq Now
            <ArrowRight className="w-6 h-6 ml-2" />
          </button>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-sm text-text-secondary max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <Scale className="w-4 h-4 text-primary" />
          <span className="font-heading font-semibold text-text-primary">Verdoq</span>
        </div>
        <p>© {new Date().getFullYear()} Verdoq AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

function AlertTriangle(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  );
}
