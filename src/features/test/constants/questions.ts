import type { Question, AnswerOption } from '../types'

export const QUESTION_VERSION = 1

export const DEFAULT_OPTIONS: AnswerOption[] = [
  { label: '전혀 아니다', value: 1 },
  { label: '아니다', value: 2 },
  { label: '보통이다', value: 3 },
  { label: '그렇다', value: 4 },
  { label: '매우 그렇다', value: 5 },
]

export const QUESTIONS: Question[] = [
  {
    id: 'q1', order: 1, version: 1, category: 'planning',
    content: '월 예산을 미리 정해두는 편인가요?',
    description: '소비 전 계획을 세우는 습관을 확인해요.',
    isReverse: false, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q2', order: 2, version: 1, category: 'impulse',
    content: '할인 중이라는 이유로 계획에 없던 소비를 자주 하나요?',
    description: '충동 구매 빈도를 확인해요.',
    isReverse: true, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q3', order: 3, version: 1, category: 'small_spending',
    content: '카페, 배달, 간식 같은 소액 소비가 자주 발생하나요?',
    description: '일상 소액 지출 패턴을 봐요.',
    isReverse: true, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q4', order: 4, version: 1, category: 'subscription',
    content: '정기결제 내역을 주기적으로 확인하나요?',
    description: '구독 서비스 관리 습관이에요.',
    isReverse: false, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q5', order: 5, version: 1, category: 'emotional',
    content: '스트레스 받을 때 소비로 해소하는 편인가요?',
    description: '감정에 따른 소비 패턴을 봐요.',
    isReverse: true, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q6', order: 6, version: 1, category: 'planning',
    content: '필요한 것과 갖고 싶은 것을 구분해서 구매하나요?',
    description: '소비 판단 기준이 있는지 확인해요.',
    isReverse: false, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q7', order: 7, version: 1, category: 'impulse',
    content: '결제 전 한 번 더 고민하는 편인가요?',
    description: '충동 억제 습관을 확인해요.',
    isReverse: false, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q8', order: 8, version: 1, category: 'review',
    content: '이번 달 소비 내역을 돌아본 적이 있나요?',
    description: '소비 리뷰 습관을 봐요.',
    isReverse: false, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q9', order: 9, version: 1, category: 'small_spending',
    content: '의도치 않게 소액이 반복되어 월말에 놀란 적이 있나요?',
    description: '누수 소비 인지 여부예요.',
    isReverse: true, options: DEFAULT_OPTIONS,
  },
  {
    id: 'q10', order: 10, version: 1, category: 'emotional',
    content: '기분이 좋거나 나쁠 때 평소보다 더 많이 쓰는 편인가요?',
    description: '기분 연동 소비 패턴이에요.',
    isReverse: true, options: DEFAULT_OPTIONS,
  },
]
