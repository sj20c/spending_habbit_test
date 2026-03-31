import type { Metadata, Viewport } from 'next'
import './globals.css'
import Providers from './providers'

export const metadata: Metadata = {
  title: '소비 습관 테스트',
  description: '10개 질문으로 평소 소비 습관을 점검해보고 점수와 유형을 확인해보세요.',
  openGraph: {
    title: '소비 습관 테스트',
    description: '10개 질문으로 평소 소비 습관을 점검해보세요.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>
          <div className="mobile-container">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
