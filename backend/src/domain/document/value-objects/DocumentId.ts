import crypto from 'crypto';

export class DocumentId {
  private constructor(private readonly value: string) {}

  static generate(): DocumentId {
    return new DocumentId(crypto.randomUUID());
  }

  static from(id: string): DocumentId {
    if (!id || id.trim().length === 0) {
      throw new Error('DocumentId cannot be empty');
    }
    return new DocumentId(id);
  }

  toString(): string {
    return this.value;
  }

  equals(other: DocumentId): boolean {
    return this.value === other.value;
  }
}
