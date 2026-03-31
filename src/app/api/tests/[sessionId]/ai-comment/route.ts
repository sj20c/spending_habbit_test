import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { totalScore, typeTitle, categoryScores } = body

  const catSummary = categoryScores
    .map((c: { label: string; normalizedScore: number }) => `${c.label}: ${c.normalizedScore}점`)
    .join(', ')

  const prompt = `당신은 소비 습관 코치입니다. 사용자의 테스트 결과를 보고 짧고 따뜻한 개인 코멘트를 작성해주세요.

결과:
- 총점: ${totalScore}점
- 소비 유형: ${typeTitle}
- 카테고리별: ${catSummary}

규칙:
- 2~3문장, 친근한 존댓말 (예: ~네요, ~해보세요)
- 금융상품 추천 절대 금지
- 구체적이고 실천 가능한 팁 1가지 포함
- 판단하지 않고 응원하는 톤
- 결과 그대로 반복하지 말고 새로운 인사이트 제공`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }],
    })

    const comment = message.content
      .filter((b) => b.type === 'text')
      .map((b) => (b as { type: 'text'; text: string }).text)
      .join('')

    return NextResponse.json({ comment })
  } catch (error) {
    console.error('AI comment error:', error)
    return NextResponse.json(
      { comment: `${totalScore}점이라는 결과, 오늘 확인한 약점 한 가지만 집중해서 바꿔보세요. 작은 변화가 쌓이면 소비 습관이 달라져요.` },
      { status: 200 }
    )
  }
}
