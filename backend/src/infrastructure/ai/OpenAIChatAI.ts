import OpenAI from 'openai';
import { IChatAIPort } from '../../application/chat/ports/IChatAIPort';
import { ChatMessage } from '../../domain/chat/entities/ChatMessage';
import { Document } from '../../domain/document/entities/Document';

export class OpenAIChatAI implements IChatAIPort {
  constructor(private readonly client: OpenAI) {}

  async reply(history: ChatMessage[], document: Document): Promise<string> {
    const analysisJson = document.analysis
      ? {
          summary: document.analysis.summary,
          documentType: document.analysis.documentType,
          riskScore: document.analysis.riskScore.toNumber(),
          sections: document.analysis.sections.map((s) => ({
            title: s.title,
            plainText: s.plainText,
            originalText: s.originalText,
          })),
          redFlags: document.analysis.redFlags.map((rf) => ({
            clause: rf.clause,
            explanation: rf.explanation,
            severity: rf.severity,
          })),
        }
      : {};

    const systemPrompt = `
You are a helpful assistant who has already read and analyzed a document on behalf of the user.
Your job is to answer the user's follow-up questions about this document clearly and in plain English.
Never use legal jargon without immediately explaining it. Be concise, friendly, and always reference the specific part of the document you are referring to.

--- DOCUMENT TEXT ---
${document.originalText.slice(0, 12000)}

--- YOUR PREVIOUS ANALYSIS ---
${JSON.stringify(analysisJson, null, 2)}

Answer the user's question based only on the document above. If the answer is not in the document, say so clearly.
`;

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content.toString(),
      })),
    ];

    const response = await this.client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 2048,
      messages,
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    return content;
  }
}
