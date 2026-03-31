import { NextResponse } from 'next/server'
import { QUESTIONS, QUESTION_VERSION } from '@/features/test/constants/questions'

export async function POST() {
  const sessionId = crypto.randomUUID()
  return NextResponse.json({
    sessionId,
    version: QUESTION_VERSION,
    questions: QUESTIONS,
  })
}
