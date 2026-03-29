import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface RiskScoreProps {
  score: number;
}

export default function RiskScore({ score }: RiskScoreProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s: number) => {
    if (s <= 30) return '#4DFF91';
    if (s <= 60) return '#E8FF59';
    if (s <= 80) return '#FF9A3C';
    return '#FF4D4D';
  };

  const getLabel = (s: number) => {
    if (s <= 30) return 'Safe';
    if (s <= 60) return 'Moderate';
    if (s <= 80) return 'Risky';
    return 'Dangerous';
  };

  const color = getColor(score);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-heading font-bold text-text-primary mb-4 text-center">Risk Score</h3>
      
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="#2A2A2A"
              strokeWidth="8"
            />
            {/* Progress arc */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s ease',
                filter: `drop-shadow(0 0 8px ${color}40)`,
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold font-heading" style={{ color }}>{score}</span>
            <span className="text-xs text-text-secondary uppercase tracking-wider mt-1">/ 100</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <span
          className="text-sm font-semibold px-3 py-1 rounded-full"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {getLabel(score)}
        </span>
      </div>

      {/* Risk scale */}
      <div className="mt-6 flex items-center gap-1 px-2">
        <div className="flex-1 h-1.5 rounded-full bg-safe/30" />
        <div className="flex-1 h-1.5 rounded-full bg-primary/30" />
        <div className="flex-1 h-1.5 rounded-full bg-warning/30" />
        <div className="flex-1 h-1.5 rounded-full bg-danger/30" />
      </div>
      <div className="flex justify-between text-[10px] text-text-secondary mt-1 px-2">
        <span>Safe</span>
        <span>Moderate</span>
        <span>Risky</span>
        <span>Dangerous</span>
      </div>
    </motion.div>
  );
}
