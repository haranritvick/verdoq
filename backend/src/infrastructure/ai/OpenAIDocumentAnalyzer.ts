import OpenAI from 'openai';
import { IDocumentAnalyzerPort } from '../../application/document/ports/IDocumentAnalyzerPort';
import { DocumentAnalysis } from '../../domain/document/entities/Document';
import { DocumentSection } from '../../domain/document/value-objects/DocumentSection';
import { RedFlag } from '../../domain/document/value-objects/RedFlag';
import { RiskScore } from '../../domain/document/value-objects/RiskScore';

const ANALYSIS_SYSTEM_PROMPT = `
You are a legal and financial document expert who specializes in explaining complex documents to everyday people with no legal background.

Analyze the provided document and respond ONLY with a valid JSON object in this exact structure:
{
  "documentType": "string — what type of document this is (e.g. Residential Lease Agreement)",
  "summary": "string — 2 to 4 sentence plain English summary of what this document is and what the person is agreeing to",
  "sections": [
    {
      "title": "string — section name",
      "originalText": "string — the actual clause text (max 300 chars)",
      "plainText": "string — plain English explanation of what this clause means for the reader"
    }
  ],
  "redFlags": [
    {
      "clause": "string — the exact risky text snippet",
      "explanation": "string — why this is potentially problematic in plain English",
      "severity": "low | medium | high"
    }
  ],
  "riskScore": number between 0 and 100
}

Risk score guide: 0–30 = standard document, 31–60 = some concerning clauses, 61–80 = significant risks, 81–100 = highly risky.

You must identify and list EVERY potential risk, hidden fee, or unfair obligation found in the document. Do not limit yourself to a specific number of red flags—if there are more than 3, list them all.

Return ONLY the JSON. No markdown, no explanation outside the JSON.
`;

export class OpenAIDocumentAnalyzer implements IDocumentAnalyzerPort {
  constructor(private readonly client: OpenAI) {}

  async analyze(rawText: string): Promise<DocumentAnalysis> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: `Analyze this document:\n\n${rawText.slice(0, 30000)}` },
      ],
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) throw new Error('No response from OpenAI');

    const json = JSON.parse(content);

    return {
      summary: json.summary,
      documentType: json.documentType,
      sections: json.sections.map((s: any) => DocumentSection.create(s)),
      redFlags: json.redFlags.map((rf: any) => RedFlag.create(rf)),
      riskScore: RiskScore.create(json.riskScore),
    };
  }
}
