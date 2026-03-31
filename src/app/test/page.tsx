'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useTestSessionStore } from '@/features/test/store/testSession.store'
import { fetcher } from '@/lib/fetcher'
import type { CompleteTestResponse } from '@/features/test/types'

export default function TestPage() {
  const router = useRouter()
  const {
    sessionId, questions, answers, currentIndex,
    setAnswer, next, prev, setResult,
  } = useTestSessionStore()

  useEffect(() => {
    if (!sessionId || questions.length === 0) router.replace('/')
  }, [sessionId, questions, router])

  if (!sessionId || questions.length === 0) return null

  const question = questions[currentIndex]
  const total = questions.length
  const selectedValue = answers.find((a) => a.questionId === question.id)?.value
  const isLast = currentIndex === total - 1
  const progress = ((currentIndex + 1) / total) * 100

  async function handleNext() {
    if (selectedValue === undefined) return
    if (!isLast) { next(); return }

    // 마지막 질문 → 결과 계산
    try {
      const data = await fetcher<CompleteTestResponse>(
        `/api/tests/${sessionId}/complete`,
        { method: 'POST', body: JSON.stringify({ answers }) }
      )
      setResult(data.result)
      router.push(`/result/${sessionId}`)
    } catch {
      alert('결과를 계산할 수 없어요. 다시 시도해주세요.')
    }
  }

  function handleSelect(value: 1 | 2 | 3 | 4 | 5) {
    setAnswer({ questionId: question.id, value })
  }

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="topbar" style={{ paddingBottom: 14 }}>
        <button
          className="nav-icon-btn"
          onClick={() => currentIndex === 0 ? router.replace('/') : prev()}
        >
          ←
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
              {currentIndex + 1} / {total}
            </span>
            <span style={{ fontSize: 13, color: 'var(--toss-blue)', fontWeight: 700 }}>
              {Math.round(progress)}%
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} key={question.id} className="fade-in">
        <div className="question-card" style={{ marginBottom: 16 }}>
          <span className="question-chip">질문 {currentIndex + 1}</span>
          <p style={{ margin: '14px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
            지금 내 소비 습관에 가장 가까운 답을 골라주세요.
          </p>
          <h2 className="question-title">
            {question.content}
          </h2>
          {question.description && (
            <p className="question-copy">
              {question.description}
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((option) => (
            <button
              key={option.value}
              className={`answer-btn${selectedValue === option.value ? ' selected' : ''}`}
              onClick={() => handleSelect(option.value as 1 | 2 | 3 | 4 | 5)}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                border: `1.5px solid ${selectedValue === option.value ? '#3182F6' : '#D6DCE2'}`,
                background: selectedValue === option.value ? '#3182F6' : 'transparent',
                flexShrink: 0, transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {selectedValue === option.value && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                )}
              </div>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bottom-cta" style={{ display: 'flex', gap: 10 }}>
        <button
          className="btn-secondary"
          style={{ flex: 1 }}
          onClick={() => currentIndex === 0 ? router.replace('/') : prev()}
        >
          이전
        </button>
        <button
          className="btn-primary"
          style={{ flex: 2 }}
          onClick={handleNext}
          disabled={selectedValue === undefined}
        >
          {isLast ? '결과 확인하기' : '다음'}
        </button>
      </div>
    </div>
  )
}
