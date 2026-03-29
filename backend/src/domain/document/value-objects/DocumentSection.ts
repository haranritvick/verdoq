export class DocumentSection {
  private constructor(
    public readonly title: string,
    public readonly originalText: string,
    public readonly plainText: string,
  ) {}

  static create(props: { title: string; originalText: string; plainText: string }): DocumentSection {
    if (!props.title || props.title.trim().length === 0) {
      throw new Error('Section title cannot be empty');
    }
    return new DocumentSection(props.title, props.originalText, props.plainText);
  }
}
