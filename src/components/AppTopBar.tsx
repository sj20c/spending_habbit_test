'use client'

type AppTopBarProps = {
  title?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

export function AppTopBar({ title = '나의 소비 습관', leftSlot, rightSlot }: AppTopBarProps) {
  return (
    <div className="topbar">
      <div className="topbar-side">{leftSlot}</div>

      <div className="brand-lockup" aria-label="나의 소비 습관 브랜드 로고">
        <img
          src="/logo_600x600.png"
          alt="나의 소비 습관 로고"
          className="brand-logo"
        />
        <div className="brand-copy">
          <span className="page-label">소비 습관 테스트</span>
          <strong className="brand-title">{title}</strong>
        </div>
      </div>

      <div className="topbar-side topbar-side-right">{rightSlot}</div>
    </div>
  )
}
