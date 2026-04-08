import type { TestResult } from '../types'

const COMMENTS: Record<string, string[]> = {
  planner: [
    '계획적으로 소비하고 계시네요. 가끔 예산 밖 소비를 점검하면 더 단단해질 거예요.',
    '소비 기준이 분명한 편이에요. 정기결제만 한 번 정리하면 한 단계 더 나아갈 수 있어요.',
  ],
  small_happy: [
    '작은 행복을 잘 챙기시는군요. 이번 주 소액 소비를 합산해보면 새로운 발견이 있을 거예요.',
    '일상의 소비를 즐길 줄 아는 게 장점이에요. 주간 한도를 정해보면 균형이 더 좋아져요.',
  ],
  emotional: [
    '감정에 솔직한 소비를 하고 계시네요. 결제 전 5초만 멈추는 습관을 시도해보세요.',
    '스트레스가 소비로 연결되기 쉬운 패턴이에요. 다른 해소법을 하나 만들어보면 도움이 돼요.',
  ],
  leaky: [
    '큰 지출보다 작은 반복 지출을 점검해보세요. 한 번 정리하면 효과가 바로 보일 거예요.',
    '구독이나 배달처럼 반복되는 소비를 체크해보세요. 의외로 줄일 수 있는 부분이 보여요.',
  ],
  balanced: [
    '전반적으로 균형 잡힌 소비를 하고 계세요. 이 패턴을 유지하면서 월 단위 점검을 추가해보세요.',
    '건강한 소비 습관이에요. 목표 저축액을 하나 정해두면 동기부여가 더 생길 거예요.',
  ],
}

export function generateStaticComment(result: TestResult): string {
  const pool = COMMENTS[result.typeCode] ?? COMMENTS.balanced
  const index = result.totalScore % pool.length
  return pool[index]
}
