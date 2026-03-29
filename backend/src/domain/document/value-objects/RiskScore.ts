export class RiskScore {
  private constructor(private readonly value: number) {}

  static create(score: number): RiskScore {
    if (score < 0 || score > 100) throw new Error('RiskScore must be 0–100');
    return new RiskScore(Math.round(score));
  }

  get level(): 'safe' | 'moderate' | 'risky' | 'dangerous' {
    if (this.value <= 30) return 'safe';
    if (this.value <= 60) return 'moderate';
    if (this.value <= 80) return 'risky';
    return 'dangerous';
  }

  toNumber(): number {
    return this.value;
  }
}
