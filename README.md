# 소비 습관 점수 테스트 — 앱인토스 미니앱

## 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (클라이언트 상태)
- TanStack Query
- Anthropic SDK (서버 사이드)

---

## 로컬 개발 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env.local.example`을 복사해서 `.env.local` 파일 생성 후 API 키 입력:
```bash
cp .env.local.example .env.local
```
`.env.local` 파일 열어서 아래 값 입력:
```
ANTHROPIC_API_KEY=sk-ant-xxxx...
```

### 3. 개발 서버 실행
```bash
npm run dev
```
http://localhost:3000 접속

---

## Vercel 배포 (앱인토스 등록용)

### 1. GitHub에 코드 업로드
```bash
git init
git add .
git commit -m "init: 소비 습관 테스트 미니앱"
git remote add origin https://github.com/YOUR_ID/spending-habit-test.git
git push -u origin main
```

### 2. Vercel 배포
1. [vercel.com](https://vercel.com) 접속 → New Project
2. GitHub 레포 연결
3. **Environment Variables** 탭에서 `ANTHROPIC_API_KEY` 추가 (API 키 값 입력)
4. Deploy 클릭

배포 완료 후 URL 예시: `https://spending-habit-test.vercel.app`

---

## 앱인토스 등록 방법

### 1단계: 콘솔 가입
- [console.toss.im](https://console.toss.im) 접속
- 토스 비즈니스 계정으로 가입
- 워크스페이스 생성

### 2단계: 앱 등록
- 앱 로고: 600×600px PNG (투명 배경 불가)
- 앱 이름: `소비 습관 테스트`
- 카테고리: 생활 > 금융/소비
- 미니앱 URL: Vercel 배포 URL 입력
- 고객센터 이메일 입력

### 3단계: 검수 요청
- 콘솔에서 검수 요청
- 승인 후 토스 앱에 노출

---

## 프로젝트 구조

```
src/
  app/
    page.tsx                  # 홈 화면
    test/page.tsx             # 테스트 진행
    result/[sessionId]/       # 결과 화면
    api/tests/
      start/route.ts          # 테스트 시작 API
      [sessionId]/
        complete/route.ts     # 결과 계산 API
        ai-comment/route.ts   # AI 코멘트 API (서버 사이드)
  features/test/
    types/index.ts            # 타입 정의
    constants/
      questions.ts            # 질문 데이터
      resultTemplates.ts      # 결과 템플릿
    lib/scoring.ts            # 점수 계산 로직
    store/testSession.store.ts # Zustand 스토어
  lib/fetcher.ts              # fetch wrapper
```

---

## 보안 주의사항

- `ANTHROPIC_API_KEY`는 절대 클라이언트 코드에 넣지 마세요.
- `.env.local`은 `.gitignore`에 포함되어 있어 GitHub에 올라가지 않아요.
- AI 코멘트는 `/api/tests/[sessionId]/ai-comment` 서버 라우트에서만 호출해요.
