import type { TestAnswer, Question, CategoryScore, ConsumerTypeCode, ResultGrade } from '../types'
import { CATEGORY_META, GRADE_CONFIG, RESULT_TEMPLATES } from '../constants/resultTemplates'
import type { TestResult } from '../types'

export function reverseScore(value: 1 | 2 | 3 | 4 | 5): number {
  return 6 - value
}

export function normalizeAnswer(answer: TestAnswer, question: Question): number {
  return question.isReverse ? reverseScore(answer.value) : answer.value
}

export function calculateTotalScore(answers: TestAnswer[], questions: Question[]): number {
  const min = questions.length * 1
  const max = questions.length * 5
  const raw = answers.reduce((sum, answer) => {
    const q = questions.find((q) => q.id === answer.questionId)
    if (!q) return sum
    return sum + normalizeAnswer(answer, q)
  }, 0)
  return Math.round(((raw - min) / (max - min)) * 100)
}

export function calculateCategoryScores(answers: TestAnswer[], questions: Question[]): CategoryScore[] {
  const categories = Array.from(new Set(questions.map((q) => q.category)))

  return categories.map((category) => {
    const catQs = questions.filter((q) => q.category === category)
    const catAs = answers.filter((a) => catQs.some((q) => q.id === a.questionId))
    const raw = catAs.reduce((sum, a) => {
      const q = catQs.find((q) => q.id === a.questionId)
      if (!q) return sum
      return sum + normalizeAnswer(a, q)
    }, 0)
    const min = catQs.length * 1
    const max = catQs.length * 5
    const normalizedScore = max === min ? 0 : Math.round(((raw - min) / (max - min)) * 100)
    const meta = CATEGORY_META[category] ?? { label: category, color: '#888' }
    return { category, label: meta.label, color: meta.color, rawScore: raw, normalizedScore }
  })
}

export function resolveGrade(score: number): ResultGrade {
  if (score >= 90) return 'S'
  if (score >= 75) return 'A'
  if (score >= 55) return 'B'
  if (score >= 35) return 'C'
  return 'D'
}

export function resolveType(categoryScores: CategoryScore[]): ConsumerTypeCode {
  const get = (cat: string) =>
    categoryScores.find((c) => c.category === cat)?.normalizedScore ?? 50

  const planning = get('planning')
  const impulse = get('impulse')
  const emotional = get('emotional')
  const small = get('small_spending')
  const subscription = get('subscription')

  if (planning >= 70 && impulse >= 65) return 'planner'
  if (emotional < 45) return 'emotional'
  if (small < 45 || subscription < 45) return 'leaky'
  if (small < 60) return 'small_happy'
  return 'balanced'
}

export function buildResult(params: {
  sessionId: string
  totalScore: number
  grade: ResultGrade
  typeCode: ConsumerTypeCode
  categoryScores: CategoryScore[]
}): TestResult {
  const template = RESULT_TEMPLATES[params.typeCode]
  const gradeConfig = GRADE_CONFIG[params.grade]

  return {
    sessionId: params.sessionId,
    totalScore: params.totalScore,
    grade: params.grade,
    gradeLabel: gradeConfig.label,
    gradeColor: template.gradeColor,
    typeCode: params.typeCode,
    typeTitle: template.typeTitle,
    summary: template.summary,
    strengths: template.strengths,
    cautions: template.cautions,
    tips: template.tips,
    categoryScores: params.categoryScores,
    createdAt: new Date().toISOString(),
  }
}
