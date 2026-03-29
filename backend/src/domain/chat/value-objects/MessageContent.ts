export class MessageContent {
  private constructor(private readonly value: string) {}

  static create(content: string): MessageContent {
    if (!content || content.trim().length === 0) {
      throw new Error('Message content cannot be empty');
    }
    if (content.length > 4000) {
      throw new Error('Message content exceeds 4000 character limit');
    }
    return new MessageContent(content.trim());
  }

  toString(): string {
    return this.value;
  }
}
