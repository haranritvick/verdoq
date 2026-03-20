import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { Shield, FileText, Zap, MessageCircle, Eye, ArrowRight, Check } from 'lucide-react';

export default function Landing() {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/auth/google`;
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero */}
      <section className="relative px-6 pt-24 pb-32">
        {/* Background effects */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px]" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-text-secondary">Powered by GPT-4o</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading font-bold text-text-primary leading-tight mb-6">
              The verdict on<br />
              <span className="text-primary">every document.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Upload any lease, contract, loan agreement, or policy. Get a plain-English breakdown,
              red flags highlighted, and a risk score — in seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" onClick={handleLogin} className="text-base">
                <Shield className="w-5 h-5 mr-2" />
                Sign in with Google
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="secondary" size="lg" className="text-base">
                See how it works
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Decode any document in seconds
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              No more legal jargon. No more confusion. Just clear answers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FileText, title: 'Plain English Summary', desc: 'Get a 2-4 sentence overview of what the document actually says.' },
              { icon: Zap, title: 'Section Breakdown', desc: 'Every clause explained simply. See what you\'re actually agreeing to.' },
              { icon: Eye, title: 'Red Flags Detected', desc: 'Risky clauses highlighted with severity levels and plain explanations.' },
              { icon: MessageCircle, title: 'Ask Follow-ups', desc: 'Chat with AI about your document. Ask anything, get clear answers.' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-text-primary font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported docs */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">Works with any document</h2>
            <p className="text-text-secondary mb-10">Upload PDF, DOCX, or paste text directly</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Lease Agreements', 'Loan Contracts', 'Insurance Policies',
                'Employment Contracts', 'NDAs', 'Terms of Service',
                'Tax Forms', 'Rental Agreements', 'Privacy Policies',
              ].map((doc) => (
                <span key={doc} className="inline-flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-2 text-sm text-text-secondary">
                  <Check className="w-3.5 h-3.5 text-primary" />
                  {doc}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
              Stop signing things you don't understand.
            </h2>
            <p className="text-text-secondary mb-8">
              Join thousands of people who decode their documents before signing.
            </p>
            <Button size="lg" onClick={handleLogin} className="text-base">
              Get Started — It's Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-border">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-text-primary">Verdoq</span>
          </div>
          <p className="text-xs text-text-secondary">© 2024 Verdoq. The verdict on every document.</p>
        </div>
      </footer>
    </div>
  );
}
