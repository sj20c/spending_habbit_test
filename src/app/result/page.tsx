'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useTestSessionStore } from '@/features/test/store/testSession.store'
import { generateStaticComment } from '@/features/test/lib/staticComment'
import { AppTopBar } from '@/components/AppTopBar'

export default function ResultPage() {
  const router = useRouter()
  const { result, reset } = useTestSessionStore()
  const arcRef = useRef<SVGCircleElement>(null)
  const scoreRef = useRef<HTMLSpanElement>(null)

  const aiComment = result ? generateStaticComment(result) : null

  useEffect(() => {
    if (!result) {
      router.replace('/')
      return
    }

    const target = result.totalScore
    const circ = 364.4
    let current = 0
    const step = () => {
      current = Math.min(current + 2, target)
      if (scoreRef.current) scoreRef.current.textContent = String(current)
      if (arcRef.current) arcRef.current.style.strokeDashoffset = String(circ - (circ * current) / 100)
      if (current < target) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [result, router])

  function handleRetry() {
    reset()
    router.push('/')
  }

  if (!result) return null

  return (
    <div className="app-shell">
      <AppTopBar
        title="소비 습관 결과"
        leftSlot={
          <button
            className="nav-icon-btn"
            onClick={handleRetry}
          >
            ×
          </button>
        }
      />

      <div className="result-score-card fade-in">
        <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto 16px' }}>
          <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="70" cy="70" r="58" fill="none" stroke="#F2F4F6" strokeWidth="10" />
            <circle
              ref={arcRef}
              cx="70" cy="70" r="58"
              fill="none"
              stroke={result.gradeColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray="364.4"
              strokeDashoffset="364.4"
              style={{ transition: 'stroke-dashoffset 0.05s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span ref={scoreRef} style={{ fontSize: 38, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              0
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>100점 만점</span>
          </div>
        </div>

        <span
          className="status-pill"
          style={{ background: `${result.gradeColor}12`, color: result.gradeColor, marginBottom: 10 }}
        >
          {result.gradeLabel} 등급
        </span>
        <h2 style={{ fontSize: 24, fontWeight: 700, lineHeight: 1.35, margin: '0 0 8px', color: 'var(--text-primary)' }}>
          {result.typeTitle}
        </h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {result.summary}
        </p>
      </div>

      <div style={{ padding: '16px 0 120px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Section title="한 줄 코멘트">
          <p style={{ margin: 0, fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.7 }}>
            {aiComment}
          </p>
        </Section>

        <Section title="강점">
          <div className="info-list">
            {result.strengths.map((s) => (
              <TagItem key={s} color="#F4FBF6" dotColor="#23B26D" textColor="#1B6B3A" text={s} />
            ))}
          </div>
        </Section>

        <Section title="주의 포인트">
          <div className="info-list">
            {result.cautions.map((c) => (
              <TagItem key={c} color="#FFF9F0" dotColor="#FF9F0A" textColor="#8A5A00" text={c} />
            ))}
          </div>
        </Section>

        <Section title="카테고리별 점수">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {result.categoryScores.map((cat) => (
              <div key={cat.category} className="metric-row">
                <span className="metric-label">
                  {cat.label}
                </span>
                <div style={{ flex: 1, height: 8, background: '#E9EDF1', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${cat.normalizedScore}%`, background: cat.color }}
                  />
                </div>
                <span className="metric-value">
                  {cat.normalizedScore}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="실천 팁">
          <div className="info-list">
            {result.tips.map((tip) => (
              <div key={tip.title} className="bullet-item" style={{ background: '#F4F8FF' }}>
                <div className="bullet-dot" style={{ background: '#3182F6' }} />
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 600, color: '#1565C0' }}>{tip.title}</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#4E5968', lineHeight: 1.6 }}>{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      <div className="bottom-cta" style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480, paddingLeft: 16, paddingRight: 16 }}>
        <button className="btn-primary" onClick={handleRetry}>
          처음부터 다시 보기
        </button>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <p className="section-title">{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  )
}

function TagItem({ color, dotColor, textColor, text }: { color: string; dotColor: string; textColor: string; text: string }) {
  return (
    <div className="bullet-item" style={{ background: color }}>
      <div className="bullet-dot" style={{ background: dotColor }} />
      <span style={{ fontSize: 14, color: textColor, lineHeight: 1.6 }}>{text}</span>
    </div>
  )
}
