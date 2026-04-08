'use client'

import { useRouter } from 'next/navigation'
import { useTestSessionStore } from '@/features/test/store/testSession.store'
import { QUESTIONS } from '@/features/test/constants/questions'
import { AppTopBar } from '@/components/AppTopBar'

export default function HomePage() {
  const router = useRouter()
  const { setSession, reset } = useTestSessionStore()

  function handleStart() {
    reset()
    const sessionId = crypto.randomUUID()
    setSession(sessionId, QUESTIONS)
    router.push('/test')
  }

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column' }}>
      <AppTopBar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <section className="card" style={{ paddingTop: 28, paddingBottom: 28 }}>
          <div className="status-pill" style={{ marginBottom: 18 }}>10문항, 1분 내외</div>
          <h1 className="hero-title">
            소비 패턴을
            <br />
            가볍게 점검해보세요
          </h1>
          <p className="hero-description">
            일상에서 자주 하는 소비 선택을 기준으로
            평소 소비 습관을 점수와 유형으로 정리해볼 수 있어요.
          </p>
        </section>

        <section className="card">
          <p className="section-title">테스트 안내</p>
          <div className="feature-row" style={{ paddingTop: 0 }}>
            <div className="feature-badge">01</div>
            <div>
              <p className="feature-title">일상적인 소비 습관만 묻습니다</p>
              <p className="feature-copy">복잡한 입력 없이 평소 선택에 가까운 답만 고르면 바로 진행돼요.</p>
            </div>
          </div>
          <div className="feature-row">
            <div className="feature-badge">02</div>
            <div>
              <p className="feature-title">결과를 한 번에 정리해드립니다</p>
              <p className="feature-copy">유형, 총점, 세부 항목 점수를 함께 보여줘서 현재 소비 패턴을 한눈에 볼 수 있어요.</p>
            </div>
          </div>
          <div className="feature-row" style={{ paddingBottom: 0 }}>
            <div className="feature-badge">03</div>
            <div>
              <p className="feature-title">실천 포인트까지 확인할 수 있어요</p>
              <p className="feature-copy">광고나 상품 추천 없이, 소비 습관을 돌아보는 데 필요한 내용만 담았습니다.</p>
            </div>
          </div>
        </section>

        <section className="card">
          <p className="section-title">결과 예시</p>
          <div className="type-grid">
            {[
              { name: '계획형', desc: '예산과 우선순위를 먼저 정하는 편' },
              { name: '균형형', desc: '필요한 지출과 즐거운 소비를 함께 챙김' },
              { name: '감정형', desc: '기분에 따라 지출 흐름이 달라질 수 있음' },
              { name: '누수형', desc: '작은 반복 지출을 점검해볼 필요가 있음' },
            ].map((t) => (
              <div key={t.name} className="type-chip">
                <strong>{t.name}</strong>
                <span>{t.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="bottom-cta">
        <button className="btn-primary" onClick={handleStart}>
          지금 시작하기
        </button>
        <p className="helper-copy">
          테스트 답변은 현재 결과를 보여주는 데만 사용됩니다
        </p>
      </div>
    </div>
  )
}
