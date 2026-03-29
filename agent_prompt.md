# 🧠 Verdoq — Master Agent Prompt

## 📌 Project Overview

**Name:** Verdoq — Plain Language Document Decoder  
**Tagline:** The verdict on every document.  
**What it does:**
- User uploads a PDF, DOCX, or pastes raw text (lease, loan agreement, insurance policy, tax form, contract, etc.)
- AI reads and analyzes the document
- Returns: plain-English summary, section-by-section breakdown, red flags highlighted, risk score
- User can ask follow-up questions about the document in a chat interface
- All documents and chat history are saved per user account
- Also ships as a Chrome + Firefox browser extension so users can decode documents found on any webpage

---

## 🏗️ Tech Stack (Non-Negotiable)

| Layer | Technology |
|---|---|
| Frontend (Web App) | React 18 + TypeScript + Tailwind CSS + Vite |
| Frontend (Extension) | React 18 + TypeScript + Tailwind CSS (same codebase, separate entry) |
| Backend | Node.js + Express + TypeScript |
| AI | OpenAI API (`gpt-4o` for analysis, `gpt-4o-mini` for chat Q&A) |
| Database | MongoDB Atlas (via Mongoose) |
| Auth | Google OAuth 2.0 (via Passport.js + JWT) |
| File Parsing | `pdf-parse` (PDF), `mammoth` (DOCX), plain text fallback |
| Deployment | Vercel (frontend) + Render (backend) + MongoDB Atlas (free tier) |

---

## 📁 Full Project Structure

```
verdoq/
├── frontend/                        # React web app
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                  # Reusable UI primitives
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── Badge.tsx
│   │   │   │   ├── Spinner.tsx
│   │   │   │   └── Tooltip.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   └── Layout.tsx
│   │   │   ├── upload/
│   │   │   │   ├── DropZone.tsx     # Drag & drop PDF/DOCX upload
│   │   │   │   └── TextPaste.tsx    # Paste raw text fallback
│   │   │   ├── results/
│   │   │   │   ├── SummaryCard.tsx  # Plain-English summary block
│   │   │   │   ├── SectionList.tsx  # Section-by-section breakdown
│   │   │   │   ├── RedFlagList.tsx  # Highlighted risky clauses
│   │   │   │   └── RiskScore.tsx    # Visual risk meter (0–100)
│   │   │   ├── chat/
│   │   │   │   ├── ChatWindow.tsx   # Q&A chat interface
│   │   │   │   ├── ChatMessage.tsx  # Individual message bubble
│   │   │   │   └── ChatInput.tsx    # Message input + send button
│   │   │   └── history/
│   │   │       └── DocumentList.tsx # Past documents sidebar
│   │   ├── pages/
│   │   │   ├── Landing.tsx          # Public landing page
│   │   │   ├── Dashboard.tsx        # Main app after login
│   │   │   ├── Analyze.tsx          # Upload + results view
│   │   │   ├── Document.tsx         # Single saved document view
│   │   │   └── AuthCallback.tsx     # Google OAuth redirect handler
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useDocument.ts
│   │   │   └── useChat.ts
│   │   ├── services/
│   │   │   └── api.ts               # Axios API client (base URL from env)
│   │   ├── store/
│   │   │   └── authStore.ts         # Zustand store for auth state
│   │   ├── types/
│   │   │   └── index.ts             # Shared TypeScript types
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── extension/                       # Chrome + Firefox extension
│   ├── src/
│   │   ├── popup/
│   │   │   ├── Popup.tsx            # Extension popup UI (React)
│   │   │   ├── PopupApp.tsx
│   │   │   └── popup.html
│   │   ├── content/
│   │   │   └── content.ts           # Content script: scrapes page text
│   │   ├── background/
│   │   │   └── background.ts        # Service worker: handles messages
│   │   └── types/
│   │       └── index.ts
│   ├── public/
│   │   ├── manifest.json            # MV3 manifest (Chrome + Firefox)
│   │   └── icons/                   # 16, 32, 48, 128px icons
│   ├── vite.config.ts               # Multi-entry Vite build
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                         # Node.js + Express + TypeScript — DDD Architecture
│   ├── src/
│   │   │
│   │   ├── domain/                  # 🔴 LAYER 1: Domain — pure business logic, no frameworks
│   │   │   │
│   │   │   ├── document/            # Document Bounded Context
│   │   │   │   ├── entities/
│   │   │   │   │   └── Document.ts          # Document entity (id, userId, title, text, analysis)
│   │   │   │   ├── value-objects/
│   │   │   │   │   ├── DocumentId.ts        # Branded type: DocumentId
│   │   │   │   │   ├── RiskScore.ts         # Value object: 0–100, validates range
│   │   │   │   │   ├── RedFlag.ts           # Value object: clause + explanation + severity
│   │   │   │   │   ├── DocumentSection.ts   # Value object: title + original + plain text
│   │   │   │   │   └── FileType.ts          # Enum value object: pdf | docx | text
│   │   │   │   ├── repositories/
│   │   │   │   │   └── IDocumentRepository.ts   # Interface — save, findById, findByUser, delete
│   │   │   │   └── events/
│   │   │   │       ├── DocumentUploaded.ts      # Domain event
│   │   │   │       └── DocumentAnalyzed.ts      # Domain event
│   │   │   │
│   │   │   ├── chat/                # Chat Bounded Context
│   │   │   │   ├── entities/
│   │   │   │   │   └── ChatMessage.ts       # Entity: id, documentId, userId, role, content
│   │   │   │   ├── value-objects/
│   │   │   │   │   ├── MessageRole.ts       # Enum: user | assistant
│   │   │   │   │   └── MessageContent.ts    # Value object: non-empty string, max 4000 chars
│   │   │   │   └── repositories/
│   │   │   │       └── IChatRepository.ts   # Interface — save, findByDocument, deleteByDocument
│   │   │   │
│   │   │   └── user/                # User Bounded Context
│   │   │       ├── entities/
│   │   │       │   └── User.ts              # Entity: id, googleId, email, name, avatar
│   │   │       ├── value-objects/
│   │   │       │   ├── UserId.ts            # Branded type: UserId
│   │   │       │   └── Email.ts             # Value object: validates email format
│   │   │       └── repositories/
│   │   │           └── IUserRepository.ts   # Interface — findByGoogleId, findById, save
│   │   │
│   │   ├── application/             # 🟡 LAYER 2: Application — use cases, orchestration
│   │   │   │
│   │   │   ├── document/
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── upload-document/
│   │   │   │   │   │   ├── IRequest.ts              # { userId, fileBuffer, mimeType, filename }
│   │   │   │   │   │   ├── IResponse.ts             # { id, title, fileType, analysis, createdAt }
│   │   │   │   │   │   ├── UploadDocumentUseCase.ts # Parse → extract text → analyze → save
│   │   │   │   │   │   └── UploadDocumentController.ts  # POST /api/documents/upload
│   │   │   │   │   ├── analyze-document/
│   │   │   │   │   │   ├── IRequest.ts              # { documentId, rawText }
│   │   │   │   │   │   ├── IResponse.ts             # { analysis: DocumentAnalysis }
│   │   │   │   │   │   ├── AnalyzeDocumentUseCase.ts
│   │   │   │   │   │   └── AnalyzeDocumentController.ts # POST /api/documents/:id/analyze
│   │   │   │   │   ├── get-document/
│   │   │   │   │   │   ├── IRequest.ts              # { documentId, requestingUserId }
│   │   │   │   │   │   ├── IResponse.ts             # Full document + analysis shape
│   │   │   │   │   │   ├── GetDocumentUseCase.ts
│   │   │   │   │   │   └── GetDocumentController.ts     # GET /api/documents/:id
│   │   │   │   │   ├── list-documents/
│   │   │   │   │   │   ├── IRequest.ts              # { userId, page, limit }
│   │   │   │   │   │   ├── IResponse.ts             # { docs: DocumentSummary[], total, page }
│   │   │   │   │   │   ├── ListDocumentsUseCase.ts
│   │   │   │   │   │   └── ListDocumentsController.ts   # GET /api/documents
│   │   │   │   │   └── delete-document/
│   │   │   │   │       ├── IRequest.ts              # { documentId, requestingUserId }
│   │   │   │   │       ├── IResponse.ts             # { success: boolean, message: string }
│   │   │   │   │       ├── DeleteDocumentUseCase.ts # Delete doc + cascade chat messages
│   │   │   │   │       └── DeleteDocumentController.ts  # DELETE /api/documents/:id
│   │   │   │   └── ports/
│   │   │   │       ├── IFileParserPort.ts           # parse(buffer, mimeType) → string
│   │   │   │       └── IDocumentAnalyzerPort.ts     # analyze(text) → DocumentAnalysis
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── use-cases/
│   │   │   │   │   ├── send-message/
│   │   │   │   │   │   ├── IRequest.ts              # { documentId, userId, content }
│   │   │   │   │   │   ├── IResponse.ts             # { id, role, content, createdAt }
│   │   │   │   │   │   ├── SendMessageUseCase.ts    # Save user msg → call AI → save reply
│   │   │   │   │   │   └── SendMessageController.ts     # POST /api/chat/:documentId
│   │   │   │   │   ├── get-chat-history/
│   │   │   │   │   │   ├── IRequest.ts              # { documentId, userId }
│   │   │   │   │   │   ├── IResponse.ts             # { messages: ChatMessage[] }
│   │   │   │   │   │   ├── GetChatHistoryUseCase.ts
│   │   │   │   │   │   └── GetChatHistoryController.ts  # GET /api/chat/:documentId
│   │   │   │   │   └── clear-chat-history/
│   │   │   │   │       ├── IRequest.ts              # { documentId, userId }
│   │   │   │   │       ├── IResponse.ts             # { success: boolean, deleted: number }
│   │   │   │   │       ├── ClearChatHistoryUseCase.ts
│   │   │   │   │       └── ClearChatHistoryController.ts # DELETE /api/chat/:documentId
│   │   │   │   └── ports/
│   │   │   │       └── IChatAIPort.ts               # reply(history, document) → string
│   │   │   │
│   │   │   └── auth/
│   │   │       ├── use-cases/
│   │   │       │   ├── google-auth/
│   │   │       │   │   ├── IRequest.ts              # { googleId, email, name, avatar }
│   │   │       │   │   ├── IResponse.ts             # { token: string, user: UserShape }
│   │   │       │   │   ├── GoogleAuthUseCase.ts     # Find-or-create user → sign JWT
│   │   │       │   │   └── GoogleAuthController.ts      # GET /api/auth/google/callback
│   │   │       │   └── get-current-user/
│   │   │       │       ├── IRequest.ts              # { token: string }
│   │   │       │       ├── IResponse.ts             # { id, email, name, avatar }
│   │   │       │       ├── GetCurrentUserUseCase.ts
│   │   │       │       └── GetCurrentUserController.ts  # GET /api/auth/me
│   │   │       └── ports/
│   │   │           └── ITokenPort.ts                # sign(payload) → string, verify(token) → payload
│   │   │
│   │   ├── infrastructure/          # 🟢 LAYER 3: Infrastructure — frameworks, DB, external APIs
│   │   │   │
│   │   │   ├── persistence/
│   │   │   │   ├── mongoose/
│   │   │   │   │   ├── schemas/
│   │   │   │   │   │   ├── UserSchema.ts            # Mongoose schema for User
│   │   │   │   │   │   ├── DocumentSchema.ts        # Mongoose schema for Document
│   │   │   │   │   │   └── ChatMessageSchema.ts     # Mongoose schema for ChatMessage
│   │   │   │   │   └── models/
│   │   │   │   │       ├── UserModel.ts             # mongoose.model('User', UserSchema)
│   │   │   │   │       ├── DocumentModel.ts
│   │   │   │   │       └── ChatMessageModel.ts
│   │   │   │   └── repositories/
│   │   │   │       ├── MongoUserRepository.ts       # Implements IUserRepository
│   │   │   │       ├── MongoDocumentRepository.ts   # Implements IDocumentRepository
│   │   │   │       └── MongoChatRepository.ts       # Implements IChatRepository
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── OpenAIDocumentAnalyzer.ts        # Implements IDocumentAnalyzerPort
│   │   │   │   └── OpenAIChatAI.ts                  # Implements IChatAIPort (streaming)
│   │   │   │
│   │   │   ├── parsers/
│   │   │   │   ├── PdfFileParser.ts                 # Implements IFileParserPort for PDF
│   │   │   │   ├── DocxFileParser.ts                # Implements IFileParserPort for DOCX
│   │   │   │   └── FileParserFactory.ts             # Returns correct parser by mimeType
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── JwtTokenAdapter.ts               # Implements ITokenPort using jsonwebtoken
│   │   │   │   └── PassportGoogleStrategy.ts        # Passport.js Google OAuth strategy
│   │   │   │
│   │   │   └── config/
│   │   │       ├── db.ts                            # MongoDB Atlas connect()
│   │   │       ├── openai.ts                        # OpenAI client singleton
│   │   │       └── container.ts                     # DI container — wires all implementations
│   │   │
│   │   ├── interfaces/              # 🔵 LAYER 4: Interface — routes, middleware, mappers
│   │   │   │                        # NOTE: Controllers live inside each use-case folder above
│   │   │   ├── routes/
│   │   │   │   ├── authRoutes.ts         # Mounts GoogleAuthController, GetCurrentUserController
│   │   │   │   ├── documentRoutes.ts     # Mounts Upload/Get/List/DeleteDocumentController
│   │   │   │   └── chatRoutes.ts         # Mounts SendMessage/GetHistory/ClearController
│   │   │   ├── middleware/
│   │   │   │   ├── authMiddleware.ts     # Extracts + verifies JWT → attaches userId to req
│   │   │   │   ├── uploadMiddleware.ts   # Multer memory storage for file uploads
│   │   │   │   ├── validateMiddleware.ts # Zod request body validation
│   │   │   │   └── errorMiddleware.ts    # Maps domain errors → HTTP status codes
│   │   │   └── mappers/
│   │   │       ├── DocumentMapper.ts     # Domain entity ↔ IResponse ↔ Mongoose doc
│   │   │       ├── ChatMapper.ts         # ChatMessage entity ↔ IResponse ↔ Mongoose doc
│   │   │       └── UserMapper.ts         # User entity ↔ IResponse ↔ Mongoose doc
│   │   │
│   │   └── app.ts                   # Express app bootstrap — mounts routes, middleware
│   │
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

---

## 🗄️ MongoDB Schemas

### User
```typescript
{
  _id: ObjectId,
  googleId: string,           // Google OAuth sub
  email: string,
  name: string,
  avatar: string,             // Google profile picture URL
  createdAt: Date,
  updatedAt: Date
}
```

### Document
```typescript
{
  _id: ObjectId,
  userId: ObjectId,           // ref: User
  title: string,              // filename or first 60 chars of pasted text
  originalText: string,       // full extracted text (max 50,000 chars)
  fileType: 'pdf' | 'docx' | 'text',
  analysis: {
    summary: string,          // 2–4 sentence plain-English summary
    sections: [
      {
        title: string,        // section heading
        plainText: string,    // plain-English explanation
        originalText: string  // original clause text
      }
    ],
    redFlags: [
      {
        clause: string,       // original risky text snippet
        explanation: string,  // why it's risky in plain English
        severity: 'low' | 'medium' | 'high'
      }
    ],
    riskScore: number,        // 0–100
    documentType: string      // e.g. "Lease Agreement", "Loan Contract"
  },
  createdAt: Date,
  updatedAt: Date
}
```

### ChatMessage
```typescript
{
  _id: ObjectId,
  documentId: ObjectId,       // ref: Document
  userId: ObjectId,           // ref: User
  role: 'user' | 'assistant',
  content: string,
  createdAt: Date
}
```

---

## 🏛️ Domain-Driven Design (DDD) Architecture

The backend follows strict DDD with four layers. **Dependencies only flow inward** — Infrastructure depends on Application, Application depends on Domain. The Domain layer has zero imports from any framework or library.

```
┌─────────────────────────────────────────┐
│           interfaces/ (HTTP)            │  ← Express routes, controllers, middleware
├─────────────────────────────────────────┤
│          application/ (Use Cases)       │  ← Orchestrates domain, calls ports
├─────────────────────────────────────────┤
│            domain/ (Core)               │  ← Entities, value objects, repo interfaces
├─────────────────────────────────────────┤
│        infrastructure/ (Adapters)       │  ← MongoDB, OpenAI, Passport, JWT
└─────────────────────────────────────────┘
         Dependencies flow INWARD only →
```

---

### 🔴 Layer 1: Domain

Pure TypeScript — no Express, no Mongoose, no OpenAI. This is the heart of the app.

#### Entities

```typescript
// domain/document/entities/Document.ts
export class Document {
  constructor(
    public readonly id: DocumentId,
    public readonly userId: UserId,
    public title: string,
    public originalText: string,
    public fileType: FileType,
    public analysis: DocumentAnalysis | null,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateDocumentProps): Document {
    if (!props.originalText || props.originalText.trim().length === 0)
      throw new Error('Document text cannot be empty');
    if (props.originalText.length > 50000)
      throw new Error('Document exceeds 50,000 character limit');
    return new Document(
      DocumentId.generate(),
      props.userId,
      props.title,
      props.originalText,
      props.fileType,
      null,
      new Date(),
    );
  }

  applyAnalysis(analysis: DocumentAnalysis): void {
    this.analysis = analysis;
  }

  isOwnedBy(userId: UserId): boolean {
    return this.userId.equals(userId);
  }
}
```

```typescript
// domain/chat/entities/ChatMessage.ts
export class ChatMessage {
  constructor(
    public readonly id: string,
    public readonly documentId: DocumentId,
    public readonly userId: UserId,
    public readonly role: MessageRole,
    public readonly content: MessageContent,
    public readonly createdAt: Date,
  ) {}

  static create(props: CreateMessageProps): ChatMessage {
    return new ChatMessage(
      crypto.randomUUID(),
      props.documentId,
      props.userId,
      props.role,
      MessageContent.create(props.content),
      new Date(),
    );
  }
}
```

#### Value Objects

```typescript
// domain/document/value-objects/RiskScore.ts
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

  toNumber(): number { return this.value; }
}
```

```typescript
// domain/document/value-objects/RedFlag.ts
export class RedFlag {
  private constructor(
    public readonly clause: string,
    public readonly explanation: string,
    public readonly severity: 'low' | 'medium' | 'high',
  ) {}

  static create(props: { clause: string; explanation: string; severity: string }): RedFlag {
    if (!['low', 'medium', 'high'].includes(props.severity))
      throw new Error('Invalid severity level');
    return new RedFlag(props.clause, props.explanation, props.severity as 'low' | 'medium' | 'high');
  }
}
```

```typescript
// domain/user/value-objects/Email.ts
export class Email {
  private constructor(private readonly value: string) {}

  static create(email: string): Email {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) throw new Error(`Invalid email: ${email}`);
    return new Email(email.toLowerCase());
  }

  toString(): string { return this.value; }
}
```

#### Repository Interfaces (Ports defined in domain)

```typescript
// domain/document/repositories/IDocumentRepository.ts
export interface IDocumentRepository {
  save(document: Document): Promise<void>;
  findById(id: DocumentId): Promise<Document | null>;
  findByUserId(userId: UserId, page: number, limit: number): Promise<{ docs: Document[]; total: number }>;
  delete(id: DocumentId): Promise<void>;
}

// domain/chat/repositories/IChatRepository.ts
export interface IChatRepository {
  save(message: ChatMessage): Promise<void>;
  findByDocumentId(documentId: DocumentId): Promise<ChatMessage[]>;
  deleteByDocumentId(documentId: DocumentId): Promise<void>;
}

// domain/user/repositories/IUserRepository.ts
export interface IUserRepository {
  findByGoogleId(googleId: string): Promise<User | null>;
  findById(id: UserId): Promise<User | null>;
  save(user: User): Promise<void>;
}
```

---

### 🟡 Layer 2: Application (Use Cases)

Each use case lives in its own folder: `use-cases/<use-case-name>/` containing exactly **4 files**:

| File | Purpose |
|---|---|
| `IRequest.ts` | TypeScript interface for input — what the controller passes in |
| `IResponse.ts` | TypeScript interface for output — what the use case returns |
| `<UseCaseName>UseCase.ts` | The use case class — one `execute(req: IRequest): Promise<IResponse>` method |
| `<UseCaseName>Controller.ts` | Express controller — translates HTTP ↔ IRequest/IResponse, calls the use case |

The controller is co-located with its use case, **not** in a separate `controllers/` folder. Routes in `interfaces/routes/` simply import and mount each controller.

#### 📂 Use Case Folder Pattern (apply to every use case)

```
application/document/use-cases/get-document/
├── IRequest.ts                  ← input contract
├── IResponse.ts                 ← output contract
├── GetDocumentUseCase.ts        ← business logic
└── GetDocumentController.ts     ← HTTP adapter
```

```typescript
// IRequest.ts
export interface IRequest {
  documentId: string;
  requestingUserId: string;
}

// IResponse.ts
export interface IResponse {
  id: string;
  title: string;
  fileType: string;
  analysis: {
    summary: string;
    documentType: string;
    riskScore: number;
    sections: { title: string; plainText: string; originalText: string }[];
    redFlags: { clause: string; explanation: string; severity: 'low' | 'medium' | 'high' }[];
  } | null;
  createdAt: string;
}

// GetDocumentUseCase.ts
export class GetDocumentUseCase {
  constructor(private readonly documentRepo: IDocumentRepository) {}

  async execute(req: IRequest): Promise<IResponse> {
    const doc = await this.documentRepo.findById(DocumentId.from(req.documentId));
    if (!doc) throw new NotFoundError('Document not found');
    if (!doc.isOwnedBy(UserId.from(req.requestingUserId))) throw new ForbiddenError('Forbidden');
    return DocumentMapper.toResponse(doc);
  }
}

// GetDocumentController.ts
export class GetDocumentController {
  constructor(private readonly useCase: GetDocumentUseCase) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.useCase.execute({
        documentId: req.params.id,
        requestingUserId: req.user!.userId,
      });
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  };
}
```

> Every other use case follows this **exact same 4-file pattern**. Only the names and types change.

#### Document Use Cases

```typescript
// application/document/use-cases/UploadDocumentUseCase.ts
export class UploadDocumentUseCase {
  constructor(
    private readonly fileParser: IFileParserPort,
    private readonly documentRepo: IDocumentRepository,
    private readonly analyzeUseCase: AnalyzeDocumentUseCase,
  ) {}

  async execute(dto: UploadDocumentDto): Promise<DocumentResponseDto> {
    // 1. Parse raw file bytes → plain text
    const rawText = await this.fileParser.parse(dto.fileBuffer, dto.mimeType);

    // 2. Create domain entity (validation happens inside)
    const document = Document.create({
      userId: UserId.from(dto.userId),
      title: dto.filename,
      originalText: rawText,
      fileType: FileType.fromMimeType(dto.mimeType),
    });

    // 3. Persist immediately (user sees it "uploaded" before analysis completes)
    await this.documentRepo.save(document);

    // 4. Run AI analysis (may take 5–15 seconds)
    const analyzed = await this.analyzeUseCase.execute({
      documentId: document.id,
      rawText: document.originalText,
    });

    return DocumentMapper.toResponseDto(analyzed);
  }
}
```

```typescript
// application/document/use-cases/AnalyzeDocumentUseCase.ts
export class AnalyzeDocumentUseCase {
  constructor(
    private readonly analyzer: IDocumentAnalyzerPort,
    private readonly documentRepo: IDocumentRepository,
  ) {}

  async execute(dto: AnalyzeDocumentDto): Promise<Document> {
    const document = await this.documentRepo.findById(DocumentId.from(dto.documentId));
    if (!document) throw new NotFoundError('Document not found');

    // Call AI port — infrastructure concern hidden behind interface
    const analysis = await this.analyzer.analyze(dto.rawText);

    // Apply analysis to domain entity
    document.applyAnalysis(analysis);
    await this.documentRepo.save(document);

    return document;
  }
}
```

```typescript
// application/document/use-cases/DeleteDocumentUseCase.ts
export class DeleteDocumentUseCase {
  constructor(
    private readonly documentRepo: IDocumentRepository,
    private readonly chatRepo: IChatRepository,
  ) {}

  async execute(dto: { documentId: string; requestingUserId: string }): Promise<void> {
    const docId = DocumentId.from(dto.documentId);
    const document = await this.documentRepo.findById(docId);
    if (!document) throw new NotFoundError('Document not found');

    // Domain enforces ownership — business rule lives here, not in controller
    if (!document.isOwnedBy(UserId.from(dto.requestingUserId)))
      throw new ForbiddenError('You do not own this document');

    // Cascade delete — application layer orchestrates across repos
    await this.chatRepo.deleteByDocumentId(docId);
    await this.documentRepo.delete(docId);
  }
}
```

#### Chat Use Cases

```typescript
// application/chat/use-cases/SendMessageUseCase.ts
export class SendMessageUseCase {
  constructor(
    private readonly chatRepo: IChatRepository,
    private readonly documentRepo: IDocumentRepository,
    private readonly chatAI: IChatAIPort,
  ) {}

  async execute(dto: SendMessageDto): Promise<ChatMessageResponseDto> {
    // Load document for context
    const document = await this.documentRepo.findById(DocumentId.from(dto.documentId));
    if (!document) throw new NotFoundError('Document not found');
    if (!document.isOwnedBy(UserId.from(dto.userId))) throw new ForbiddenError('Forbidden');

    // Save user's message
    const userMessage = ChatMessage.create({
      documentId: document.id,
      userId: UserId.from(dto.userId),
      role: MessageRole.USER,
      content: dto.content,
    });
    await this.chatRepo.save(userMessage);

    // Fetch history for context window
    const history = await this.chatRepo.findByDocumentId(document.id);

    // Call AI port — reply is streamed back to controller
    const replyText = await this.chatAI.reply(history, document);

    // Save assistant reply
    const assistantMessage = ChatMessage.create({
      documentId: document.id,
      userId: UserId.from(dto.userId),
      role: MessageRole.ASSISTANT,
      content: replyText,
    });
    await this.chatRepo.save(assistantMessage);

    return ChatMapper.toResponseDto(assistantMessage);
  }
}
```

#### Auth Use Cases

```typescript
// application/auth/use-cases/GoogleAuthUseCase.ts
export class GoogleAuthUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly tokenPort: ITokenPort,
  ) {}

  async execute(dto: GoogleProfileDto): Promise<{ token: string; user: AuthUserResponseDto }> {
    // Find or create user
    let user = await this.userRepo.findByGoogleId(dto.googleId);
    if (!user) {
      user = User.create({
        googleId: dto.googleId,
        email: Email.create(dto.email),
        name: dto.name,
        avatar: dto.avatar,
      });
      await this.userRepo.save(user);
    }

    // Sign JWT via port (infrastructure detail hidden)
    const token = this.tokenPort.sign({ userId: user.id.toString(), email: user.email.toString() });

    return { token, user: UserMapper.toAuthResponseDto(user) };
  }
}
```

#### Application Ports (interfaces that infrastructure must implement)

```typescript
// application/document/ports/IFileParserPort.ts
export interface IFileParserPort {
  parse(buffer: Buffer, mimeType: string): Promise<string>;
}

// application/document/ports/IDocumentAnalyzerPort.ts
export interface IDocumentAnalyzerPort {
  analyze(rawText: string): Promise<DocumentAnalysis>;
}

// application/chat/ports/IChatAIPort.ts
export interface IChatAIPort {
  reply(history: ChatMessage[], document: Document): Promise<string>;
}

// application/auth/ports/ITokenPort.ts
export interface ITokenPort {
  sign(payload: Record<string, string>): string;
  verify(token: string): Record<string, string>;
}
```

---

### 🟢 Layer 3: Infrastructure (Adapters)

Implements all ports and repository interfaces. Knows about Mongoose, OpenAI SDK, jsonwebtoken — the domain and application layers do not.

```typescript
// infrastructure/persistence/repositories/MongoDocumentRepository.ts
export class MongoDocumentRepository implements IDocumentRepository {
  async save(document: Document): Promise<void> {
    const raw = DocumentMapper.toPersistence(document);
    await DocumentModel.findByIdAndUpdate(raw._id, raw, { upsert: true, new: true });
  }

  async findById(id: DocumentId): Promise<Document | null> {
    const raw = await DocumentModel.findById(id.toString());
    return raw ? DocumentMapper.toDomain(raw) : null;
  }

  async findByUserId(userId: UserId, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      DocumentModel.find({ userId: userId.toString() }).sort({ createdAt: -1 }).skip(skip).limit(limit),
      DocumentModel.countDocuments({ userId: userId.toString() }),
    ]);
    return { docs: docs.map(DocumentMapper.toDomain), total };
  }

  async delete(id: DocumentId): Promise<void> {
    await DocumentModel.findByIdAndDelete(id.toString());
  }
}
```

```typescript
// infrastructure/ai/OpenAIDocumentAnalyzer.ts
export class OpenAIDocumentAnalyzer implements IDocumentAnalyzerPort {
  constructor(private readonly client: OpenAI) {}

  async analyze(rawText: string): Promise<DocumentAnalysis> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: `Analyze this document:\n\n${rawText.slice(0, 30000)}` },
      ],
    });

    const json = JSON.parse(response.choices[0].message.content!);

    // Map raw JSON → domain value objects (validates here, not in domain)
    return {
      summary: json.summary,
      documentType: json.documentType,
      sections: json.sections.map(DocumentSection.create),
      redFlags: json.redFlags.map(RedFlag.create),
      riskScore: RiskScore.create(json.riskScore),
    };
  }
}
```

```typescript
// infrastructure/auth/JwtTokenAdapter.ts
export class JwtTokenAdapter implements ITokenPort {
  constructor(private readonly secret: string, private readonly expiresIn: string) {}

  sign(payload: Record<string, string>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): Record<string, string> {
    return jwt.verify(token, this.secret) as Record<string, string>;
  }
}
```

```typescript
// infrastructure/config/container.ts  — DI wiring (no framework needed)
export function buildContainer() {
  const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const tokenAdapter = new JwtTokenAdapter(process.env.JWT_SECRET!, process.env.JWT_EXPIRES_IN!);

  // Repositories
  const userRepo = new MongoUserRepository();
  const documentRepo = new MongoDocumentRepository();
  const chatRepo = new MongoChatRepository();

  // AI Adapters
  const documentAnalyzer = new OpenAIDocumentAnalyzer(openaiClient);
  const chatAI = new OpenAIChatAI(openaiClient);

  // File Parsers
  const fileParserFactory = new FileParserFactory();

  // Use Cases
  const analyzeDocumentUseCase = new AnalyzeDocumentUseCase(documentAnalyzer, documentRepo);
  const uploadDocumentUseCase = new UploadDocumentUseCase(fileParserFactory, documentRepo, analyzeDocumentUseCase);
  const getDocumentUseCase = new GetDocumentUseCase(documentRepo);
  const listDocumentsUseCase = new ListDocumentsUseCase(documentRepo);
  const deleteDocumentUseCase = new DeleteDocumentUseCase(documentRepo, chatRepo);
  const sendMessageUseCase = new SendMessageUseCase(chatRepo, documentRepo, chatAI);
  const getChatHistoryUseCase = new GetChatHistoryUseCase(chatRepo);
  const clearChatHistoryUseCase = new ClearChatHistoryUseCase(chatRepo);
  const googleAuthUseCase = new GoogleAuthUseCase(userRepo, tokenAdapter);
  const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepo, tokenAdapter);

  // Controllers
  const documentController = new DocumentController(
    uploadDocumentUseCase, getDocumentUseCase, listDocumentsUseCase, deleteDocumentUseCase
  );
  const chatController = new ChatController(
    sendMessageUseCase, getChatHistoryUseCase, clearChatHistoryUseCase
  );
  const authController = new AuthController(googleAuthUseCase, getCurrentUserUseCase);

  return { documentController, chatController, authController };
}
```

---

### 🔵 Layer 4: Interfaces (HTTP)

Controllers are **co-located inside each use-case folder** — not in a global `controllers/` directory. Each controller is thin: translate HTTP request → `IRequest`, call `UseCase.execute()`, send `IResponse` back. Routes in `interfaces/routes/` import and mount these controllers.

```typescript
// application/document/use-cases/get-document/GetDocumentController.ts
// (each controller lives in its own use-case folder — shown here as a representative example)
export class GetDocumentController {
  constructor(
    private readonly uploadUseCase: UploadDocumentUseCase,
    private readonly getUseCase: GetDocumentUseCase,
    private readonly listUseCase: ListDocumentsUseCase,
    private readonly deleteUseCase: DeleteDocumentUseCase,
  ) {}

  upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.uploadUseCase.execute({
        userId: req.user!.userId,
        fileBuffer: req.file!.buffer,
        mimeType: req.file!.mimetype,
        filename: req.file!.originalname,
      });
      res.status(201).json({ success: true, data: result });
    } catch (err) { next(err); }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.getUseCase.execute({
        documentId: req.params.id,
        requestingUserId: req.user!.userId,
      });
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  };

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.listUseCase.execute({
        userId: req.user!.userId,
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
      });
      res.json({ success: true, data: result });
    } catch (err) { next(err); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteUseCase.execute({
        documentId: req.params.id,
        requestingUserId: req.user!.userId,
      });
      res.json({ success: true, message: 'Document deleted' });
    } catch (err) { next(err); }
  };
}
```

```typescript
// interfaces/http/middleware/errorMiddleware.ts
export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof NotFoundError) return res.status(404).json({ success: false, error: err.message });
  if (err instanceof ForbiddenError) return res.status(403).json({ success: false, error: err.message });
  if (err instanceof ValidationError) return res.status(400).json({ success: false, error: err.message });
  console.error(err);
  res.status(500).json({ success: false, error: 'Internal server error' });
};
```

#### Domain Errors (live in domain layer)
```typescript
// domain/errors.ts
export class NotFoundError extends Error { constructor(msg: string) { super(msg); this.name = 'NotFoundError'; } }
export class ForbiddenError extends Error { constructor(msg: string) { super(msg); this.name = 'ForbiddenError'; } }
export class ValidationError extends Error { constructor(msg: string) { super(msg); this.name = 'ValidationError'; } }
```

---

### 🗺️ DDD Dependency Rule (enforce with ESLint)

Add this to `tsconfig.json` paths + an ESLint `no-restricted-imports` rule to prevent layer violations:

```json
// tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@interfaces/*": ["src/interfaces/*"]
    }
  }
}
```

**Allowed imports per layer:**
| Layer | Can import from |
|---|---|
| `domain/` | Nothing (pure TypeScript only) |
| `application/` | `domain/` only |
| `infrastructure/` | `domain/`, `application/`, npm packages |
| `interfaces/` | `application/`, `domain/`, `infrastructure/config/container` |

---

## 🔌 API Endpoints

### Auth
| Method | Path | Description |
|---|---|---|
| GET | `/api/auth/google` | Redirect to Google OAuth |
| GET | `/api/auth/google/callback` | Google OAuth callback → set JWT cookie |
| GET | `/api/auth/me` | Get current user (JWT required) |
| POST | `/api/auth/logout` | Clear JWT cookie |

### Documents
| Method | Path | Description |
|---|---|---|
| POST | `/api/documents/upload` | Upload PDF/DOCX file, returns analysis |
| POST | `/api/documents/text` | Submit raw pasted text, returns analysis |
| GET | `/api/documents` | List all user's documents (paginated) |
| GET | `/api/documents/:id` | Get single document + full analysis |
| DELETE | `/api/documents/:id` | Delete document + its chat history |

### Chat
| Method | Path | Description |
|---|---|---|
| POST | `/api/chat/:documentId` | Send a message, get AI reply (streams) |
| GET | `/api/chat/:documentId` | Get full chat history for a document |
| DELETE | `/api/chat/:documentId` | Clear chat history for a document |

---

## 🤖 AI Prompts (Build These Exactly)

### 1. Document Analysis Prompt (`analyzerService.ts`)
```typescript
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
Return ONLY the JSON. No markdown, no explanation outside the JSON.
`;
```

### 2. Chat Q&A Prompt (`chatService.ts`)
```typescript
const CHAT_SYSTEM_PROMPT = (documentText: string, analysis: object) => `
You are a helpful assistant who has already read and analyzed a document on behalf of the user.
Your job is to answer the user's follow-up questions about this document clearly and in plain English.
Never use legal jargon without immediately explaining it. Be concise, friendly, and always reference the specific part of the document you are referring to.

--- DOCUMENT TEXT ---
${documentText.slice(0, 12000)}

--- YOUR PREVIOUS ANALYSIS ---
${JSON.stringify(analysis, null, 2)}

Answer the user's question based only on the document above. If the answer is not in the document, say so clearly.
`;
```

---

## 🧩 Browser Extension Behaviour

### What it does:
1. User visits any webpage containing a document (contract site, PDF viewer, government form, etc.)
2. User clicks the Verdoq extension icon
3. Popup appears with two options:
   - **"Decode this page"** — content script scrapes all visible text from the page and sends to the API
   - **"Upload a file"** — opens the full web app in a new tab
4. If logged in (JWT stored in `chrome.storage.local`), analysis runs directly in the popup
5. If not logged in, popup shows a "Sign in with Google" button that opens the web app auth flow

### `manifest.json` (Manifest V3 — works for both Chrome and Firefox):
```json
{
  "manifest_version": 3,
  "name": "Verdoq",
  "version": "1.0.0",
  "description": "Verdoq — get the verdict on any document, instantly",
  "permissions": ["activeTab", "storage", "scripting"],
  "host_permissions": ["<all_urls>"],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "32": "icons/icon32.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ]
}
```

### Content script logic (`content.ts`):
- Scrape: `document.body.innerText` (trim to 15,000 chars max)
- Listen for message `{ type: 'GET_PAGE_TEXT' }` from popup
- Respond with `{ text: scrapedText, url: window.location.href, title: document.title }`

### Popup logic (`Popup.tsx`):
- On mount: check `chrome.storage.local` for JWT token
- If token exists: show "Decode this page" button + past documents list (mini)
- If no token: show sign-in prompt
- "Decode this page" → sends message to content script → gets page text → POSTs to `/api/documents/text` → shows mini results inline in popup
- Results show: summary, risk score badge, top 3 red flags, link to "View full analysis" (opens web app)

---

## 🎨 UI Design Requirements

### Design Language: **"Legal clarity meets modern fintech"**
- **Font:** `Instrument Serif` (headings) + `DM Sans` (body) — import from Google Fonts
- **Colors:**
  - Background: `#0F0F0F` (near-black)
  - Surface: `#1A1A1A`
  - Border: `#2A2A2A`
  - Primary accent: `#E8FF59` (electric yellow-green)
  - Danger: `#FF4D4D`
  - Warning: `#FF9A3C`
  - Safe: `#4DFF91`
  - Text primary: `#F5F5F5`
  - Text secondary: `#888888`
- **Style:** Dark, high-contrast, minimal. Think Linear + Vercel design aesthetic.
- **Animations:** Subtle fade-ins on result cards, shimmer loading skeletons, smooth chat message slide-in
- **Risk Score:** Render as an animated radial progress arc (SVG), color transitions green→yellow→red based on score

### Key UI States to Build:
1. **Empty state:** Illustrated drop zone with dashed border, "Drop your document here or paste text below"
2. **Loading state:** Skeleton shimmer cards while AI is analyzing
3. **Results state:** Summary card at top → sections accordion → red flags list → risk meter → chat panel
4. **Error state:** Friendly error card with retry button
5. **Extension popup:** Compact 380×520px popup version of results

---

## 🔐 Auth Flow

1. User clicks "Sign in with Google" on landing page
2. Frontend redirects to `GET /api/auth/google`
3. Passport.js redirects to Google consent screen
4. Google redirects back to `GET /api/auth/google/callback`
5. Backend creates/updates User in MongoDB
6. Backend signs a JWT (`{ userId, email }`, 7-day expiry) and sets it as an `httpOnly` cookie
7. Backend redirects to `FRONTEND_URL/auth/callback`
8. Frontend `AuthCallback.tsx` reads the cookie (or a token from query param) and stores user in Zustand
9. Redirect to `/dashboard`

For the extension: after login, call `GET /api/auth/me` and store the JWT in `chrome.storage.local`.

---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/verdoq
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=7d
OPENAI_API_KEY=sk-...
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 📦 All Dependencies

### Backend
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "openai": "^4.20.0",
    "passport": "^0.7.0",
    "passport-google-oauth20": "^2.0.0",
    "jsonwebtoken": "^9.0.2",
    "cookie-parser": "^1.4.6",
    "multer": "^1.4.5-lts.1",
    "pdf-parse": "^1.1.1",
    "mammoth": "^1.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "helmet": "^7.1.0",
    "express-rate-limit": "^7.1.5"
  },
  "devDependencies": {
    "typescript": "^5.3.2",
    "@types/express": "^4.17.21",
    "@types/passport": "^1.0.16",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/multer": "^1.4.11",
    "@types/cors": "^2.8.17",
    "@types/pdf-parse": "^1.1.4",
    "ts-node-dev": "^2.0.0",
    "tsx": "^4.6.2"
  }
}
```

### Frontend + Extension
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "axios": "^1.6.2",
    "zustand": "^4.4.7",
    "react-dropzone": "^14.2.3",
    "@tanstack/react-query": "^5.10.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.1.0",
    "lucide-react": "^0.294.0",
    "react-hot-toast": "^2.4.1",
    "framer-motion": "^10.16.16"
  },
  "devDependencies": {
    "typescript": "^5.3.2",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "@types/chrome": "^0.0.252",
    "vite": "^5.0.7",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.6",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## 🚀 Deployment Instructions (Free Tier)

### MongoDB Atlas
1. Create free account at mongodb.com/atlas
2. Create a free M0 cluster
3. Create database user + whitelist all IPs (`0.0.0.0/0`)
4. Copy connection string → `MONGODB_URI`

### Render (Backend)
1. Push backend to GitHub
2. New Web Service on render.com → connect repo → select `/backend` root
3. Build command: `npm install && npm run build`
4. Start command: `node dist/app.js`
5. Add all backend env vars in Render dashboard
6. Free tier URL: `https://verdoq-api.onrender.com`

### Vercel (Frontend)
1. Push frontend to GitHub
2. Import project on vercel.com → select `/frontend` root
3. Add `VITE_API_BASE_URL=https://verdoq-api.onrender.com`
4. Deploy → free URL: `https://verdoq.vercel.app`

### Chrome Extension
1. Run `npm run build` in `/extension`
2. Go to `chrome://extensions` → Enable Developer Mode
3. Click "Load unpacked" → select `/extension/dist`
4. For Firefox: upload to `about:debugging` or submit to Firefox Add-ons

### Google OAuth Setup
1. Go to console.cloud.google.com
2. Create a project → Enable Google+ API
3. OAuth consent screen → External
4. Credentials → OAuth 2.0 Client ID
5. Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback` AND `https://verdoq-api.onrender.com/api/auth/google/callback`

---

## ✅ Build Order for Agent (Follow This Exactly)

### Phase 1 — Backend (DDD inside-out)
Build from the innermost layer outward. Never skip a layer.

1. **Domain layer** (`src/domain/`) — pure TypeScript, no dependencies
   - All value objects: `DocumentId`, `UserId`, `RiskScore`, `RedFlag`, `Email`, `MessageContent`, `FileType`
   - All entities: `Document`, `User`, `ChatMessage` with their factory methods and business rules
   - All repository interfaces: `IDocumentRepository`, `IUserRepository`, `IChatRepository`
   - Domain errors: `NotFoundError`, `ForbiddenError`, `ValidationError`

2. **Application layer** (`src/application/`) — depends only on domain
   - All port interfaces: `IFileParserPort`, `IDocumentAnalyzerPort`, `IChatAIPort`, `ITokenPort`
   - All DTOs for every use case
   - All use cases in order: Auth → Document → Chat
   - All mappers: `DocumentMapper`, `UserMapper`, `ChatMapper`

3. **Infrastructure layer** (`src/infrastructure/`) — implements ports + repos
   - Mongoose schemas + models
   - `MongoUserRepository`, `MongoDocumentRepository`, `MongoChatRepository`
   - `OpenAIDocumentAnalyzer`, `OpenAIChatAI`
   - `PdfFileParser`, `DocxFileParser`, `FileParserFactory`
   - `JwtTokenAdapter`, `PassportGoogleStrategy`
   - `container.ts` — wire everything together

4. **Interfaces layer** (`src/interfaces/`) — thin HTTP adapters
   - All controllers (call use cases, nothing else)
   - All Express routes
   - Middleware: auth, upload, validate, error handler
   - Zod validators for all request bodies

5. **`app.ts`** — mount routes, connect DB, start server
   - Test all endpoints with Postman/Thunder Client before moving to frontend

### Phase 2 — Frontend Web App
6. Vite + React + Tailwind setup with design tokens (colors, fonts from spec above)
7. Auth flow (Google OAuth redirect + callback page)
8. Dashboard + document list (connected to `GET /api/documents`)
9. Upload page — drag & drop + text paste (connected to `POST /api/documents/upload`)
10. Results page — summary card, sections accordion, red flags, risk score arc
11. Chat panel — connected to `POST /api/chat/:documentId` with streaming

### Phase 3 — Browser Extension
12. Manifest V3 setup (Chrome + Firefox)
13. Content script — page text scraper
14. Background service worker
15. Popup UI — mini results, sign-in prompt, "Decode this page" button
16. Multi-entry Vite build → `/dist`

### Phase 4 — Polish
17. Loading skeletons on all async states
18. Error states + retry buttons
19. Empty states with illustrations
20. Mobile responsiveness (frontend)
21. Rate limiting on backend (`express-rate-limit`)
22. README with full setup instructions

---

## 🎯 Interview Demo Script (What to Show in 30 Minutes)

1. Open the web app → show the landing page (30 sec)
2. Sign in with Google → show dashboard (30 sec)
3. Upload a real lease agreement PDF → show the analysis loading (1 min)
4. Walk through: summary, sections, red flags, risk score (3 min)
5. Ask a follow-up question in the chat: *"What happens if I break the lease early?"* (2 min)
6. Switch to the browser extension → visit a random terms-of-service page → click "Decode this page" → show mini results in popup (2 min)
7. Talk about AI usage: what you used AI for, what you accepted/changed, what you wrote yourself (5 min)

---

*Generated for Haran Ritvick — Intuit Recruiter Interview Project*  
*Stack: React + Tailwind · Node.js + Express + TypeScript · MongoDB Atlas · OpenAI GPT-4o · Google OAuth · Chrome + Firefox Extension*  
*Deployment: Vercel + Render + MongoDB Atlas (all free tier)*