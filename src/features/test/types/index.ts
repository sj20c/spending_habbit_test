// ─── Question ───────────────────────────────────────────────────
export type QuestionCategory =
  | 'planning'
  | 'impulse'
  | 'subscription'
  | 'small_spending'
  | 'emotional'
  | 'review'

export interface AnswerOption {
  label: string
  value: 1 | 2 | 3 | 4 | 5
}

export interface Question {
  id: string
  order: number
  version: number
  category: QuestionCategory
  content: string
  description?: string
  isReverse: boolean
  options: AnswerOption[]
}

// ─── Answer ─────────────────────────────────────────────────────
export interface TestAnswer {
  questionId: string
  value: 1 | 2 | 3 | 4 | 5
}

// ─── Result ─────────────────────────────────────────────────────
export type ResultGrade = 'S' | 'A' | 'B' | 'C' | 'D'

export type ConsumerTypeCode =
  | 'planner'
  | 'small_happy'
  | 'emotional'
  | 'leaky'
  | 'balanced'

export interface CategoryScore {
  category: QuestionCategory
  label: string
  rawScore: number
  normalizedScore: number
  color: string
}

export interface ResultTip {
  title: string
  description: string
}

export interface TestResult {
  sessionId: string
  totalScore: number
  grade: ResultGrade
  gradeLabel: string
  gradeColor: string
  typeCode: ConsumerTypeCode
  typeTitle: string
  summary: string
  strengths: string[]
  cautions: string[]
  tips: ResultTip[]
  categoryScores: CategoryScore[]
  createdAt: string
  aiComment?: string
}

// ─── API ────────────────────────────────────────────────────────
export interface StartTestResponse {
  sessionId: string
  version: number
  questions: Question[]
}

export interface CompleteTestRequest {
  answers: TestAnswer[]
}

export interface CompleteTestResponse {
  result: TestResult
}

export interface AICommentRequest {
  totalScore: number
  typeTitle: string
  categoryScores: CategoryScore[]
}

export interface AICommentResponse {
  comment: string
}
