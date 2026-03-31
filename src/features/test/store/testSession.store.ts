import { create } from 'zustand'
import type { Question, TestAnswer, TestResult } from '../types'

interface TestSessionState {
  sessionId: string | null
  questions: Question[]
  answers: TestAnswer[]
  currentIndex: number
  result: TestResult | null

  setSession: (sessionId: string, questions: Question[]) => void
  setAnswer: (answer: TestAnswer) => void
  next: () => void
  prev: () => void
  setResult: (result: TestResult) => void
  reset: () => void
}

export const useTestSessionStore = create<TestSessionState>((set) => ({
  sessionId: null,
  questions: [],
  answers: [],
  currentIndex: 0,
  result: null,

  setSession: (sessionId, questions) =>
    set({ sessionId, questions, answers: [], currentIndex: 0, result: null }),

  setAnswer: (answer) =>
    set((state) => {
      const exists = state.answers.some((a) => a.questionId === answer.questionId)
      const answers = exists
        ? state.answers.map((a) => (a.questionId === answer.questionId ? answer : a))
        : [...state.answers, answer]
      return { answers }
    }),

  next: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
    })),

  prev: () =>
    set((state) => ({ currentIndex: Math.max(state.currentIndex - 1, 0) })),

  setResult: (result) => set({ result }),

  reset: () => set({ sessionId: null, questions: [], answers: [], currentIndex: 0, result: null }),
}))
