import type { ConsumerTypeCode, ResultTip } from '../types'

interface ResultTemplate {
  typeTitle: string
  summary: string
  strengths: string[]
  cautions: string[]
  tips: ResultTip[]
  gradeColor: string
  gradeLabel: string
}

export const RESULT_TEMPLATES: Record<ConsumerTypeCode, ResultTemplate> = {
  planner: {
    typeTitle: '계획형 소비자',
    summary: '필요한 소비를 중심으로 비교적 안정적인 지출을 하고 있어요.',
    strengths: [
      '예산 기준이 비교적 명확해요.',
      '충동 소비를 잘 통제하는 편이에요.',
    ],
    cautions: [
      '작은 보상 소비가 누적될 수 있어요.',
      '정기 지출 점검을 놓치면 새는 돈이 생길 수 있어요.',
    ],
    tips: [
      { title: '주 1회 소비 점검하기', description: '이번 주 지출 중 예상 밖 소비가 있었는지 짧게 확인해보세요.' },
      { title: '고정비 점검일 만들기', description: '한 달에 한 번 정기결제와 구독을 정리해보세요.' },
    ],
    gradeColor: '#2ECC71',
    gradeLabel: '안정적',
  },
  small_happy: {
    typeTitle: '소확행 소비자',
    summary: '작은 만족을 위한 소비가 잦은 편이에요. 합산하면 예상보다 클 수 있어요.',
    strengths: [
      '생활 만족을 잘 챙기는 편이에요.',
      '일상의 즐거움을 아는 소비를 해요.',
    ],
    cautions: [
      '소액 소비가 누적되면 예상보다 큰 지출이 돼요.',
      '월말 잔액이 갑자기 줄어드는 패턴이 생길 수 있어요.',
    ],
    tips: [
      { title: '소액 소비 주간 한도 정하기', description: '카페·배달·간식 등 일상 소비 주간 한도를 미리 정해보세요.' },
      { title: '주간 소비 합산 보기', description: '일별 소액 지출을 주 단위로 합산해보세요.' },
    ],
    gradeColor: '#F4A300',
    gradeLabel: '주의 필요',
  },
  emotional: {
    typeTitle: '감정형 소비자',
    summary: '기분과 스트레스에 따라 소비가 달라지는 편이에요.',
    strengths: [
      '자기 보상을 통해 에너지를 회복하려는 경향이 있어요.',
      '감성적 욕구에 솔직한 편이에요.',
    ],
    cautions: [
      '스트레스성 지출이 반복될 수 있어요.',
      '기분에 따라 소비 편차가 커질 수 있어요.',
    ],
    tips: [
      { title: '24시간 보류 규칙', description: '갑자기 사고 싶은 물건은 하루 뒤 다시 판단해보세요.' },
      { title: '감정 소비 인지하기', description: '결제 전 "지금 기분 때문에 사는 건 아닐까?" 잠깐 확인해보세요.' },
    ],
    gradeColor: '#E74C3C',
    gradeLabel: '개선 필요',
  },
  leaky: {
    typeTitle: '무심한 누수형',
    summary: '큰 소비보다 작은 반복 지출에서 돈이 새고 있을 가능성이 높아요.',
    strengths: [
      '한 번 점검하면 빠르게 개선될 가능성이 높아요.',
      '큰 충동 구매는 잘 참는 편이에요.',
    ],
    cautions: [
      '구독·배달·카페처럼 반복 지출을 놓치기 쉬워요.',
      '정기결제를 잘 확인하지 않는 경향이 있어요.',
    ],
    tips: [
      { title: '반복 결제 일괄 점검', description: '이번 달 정기결제와 자주 쓰는 소비처를 한눈에 정리해보세요.' },
      { title: '소비 알림 설정', description: '카드 사용 알림을 켜두면 무심한 지출을 바로 인지할 수 있어요.' },
    ],
    gradeColor: '#8B5CF6',
    gradeLabel: '점검 필요',
  },
  balanced: {
    typeTitle: '균형형 소비자',
    summary: '전체적으로 큰 문제 없이 균형 잡힌 소비를 하고 있어요.',
    strengths: [
      '계획성과 유연성을 적절히 갖추고 있어요.',
      '소비 전후 인식이 비교적 건강해요.',
    ],
    cautions: [
      '방심하면 습관적인 소비가 생길 수 있어요.',
      '장기적 소비 흐름도 주기적으로 점검해보세요.',
    ],
    tips: [
      { title: '월간 루틴 유지', description: '지금의 소비 패턴을 유지할 수 있도록 월 단위 점검을 해보세요.' },
      { title: '목표 저축액 설정', description: '다음 달 목표 저축액을 정해두면 소비 기준이 생겨요.' },
    ],
    gradeColor: '#3182F6',
    gradeLabel: '건강함',
  },
}

export const GRADE_CONFIG = {
  S: { label: '최우수', color: '#2ECC71' },
  A: { label: '안정적', color: '#3182F6' },
  B: { label: '보통', color: '#F4A300' },
  C: { label: '주의', color: '#E74C3C' },
  D: { label: '위험', color: '#8B5CF6' },
}

export const CATEGORY_META: Record<string, { label: string; color: string }> = {
  planning: { label: '계획성', color: '#3182F6' },
  impulse: { label: '충동억제', color: '#2ECC71' },
  small_spending: { label: '소액관리', color: '#F4A300' },
  subscription: { label: '구독관리', color: '#8B5CF6' },
  emotional: { label: '감정안정', color: '#E74C3C' },
  review: { label: '소비리뷰', color: '#00BCD4' },
}
