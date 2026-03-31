import { NextRequest, NextResponse } from 'next/server'
import { QUESTIONS } from '@/features/test/constants/questions'
import {
  calculateTotalScore,
  calculateCategoryScores,
  resolveGrade,
  resolveType,
  buildResult,
} from '@/features/test/lib/scoring'

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await context.params
  const body = await request.json()
  const answers = body.answers ?? []

  const totalScore = calculateTotalScore(answers, QUESTIONS)
  const categoryScores = calculateCategoryScores(answers, QUESTIONS)
  const typeCode = resolveType(categoryScores)
  const grade = resolveGrade(totalScore)

  const result = buildResult({ sessionId, totalScore, grade, typeCode, categoryScores })

  return NextResponse.json({ result })
}
