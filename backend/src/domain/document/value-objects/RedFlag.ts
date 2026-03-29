export class RedFlag {
  private constructor(
    public readonly clause: string,
    public readonly explanation: string,
    public readonly severity: 'low' | 'medium' | 'high',
  ) {}

  static create(props: { clause: string; explanation: string; severity: string }): RedFlag {
    if (!['low', 'medium', 'high'].includes(props.severity)) {
      throw new Error('Invalid severity level');
    }
    return new RedFlag(props.clause, props.explanation, props.severity as 'low' | 'medium' | 'high');
  }
}
