# Chalkak Toss (찰칵 앱인토스 미니앱)

## 프로젝트 개요

네컷사진관 위치 찾기 서비스 - 앱인토스(토스 미니앱) 버전

- **Framework**: React Native 0.76.9
- **Language**: TypeScript
- **State**: Zustand
- **HTTP**: Axios
- **Navigation**: React Navigation (Stack)
- **Backend**: chalkak-server (Spring Boot) 공개 API 사용

---

## 프로젝트 구조

```
src/
├── api/
│   ├── client.ts              # Axios 인스턴스 (baseURL, 인터셉터)
│   └── photoBoothApi.ts       # 사진관/리뷰/혼잡도 API
├── components/
│   ├── PhotoBoothCard.tsx     # 사진관 카드 (거리, 브랜드, 주소)
│   ├── ReviewCard.tsx         # 리뷰 카드 (별점, 내용, 날짜)
│   ├── CongestionBadge.tsx    # 혼잡도 뱃지 (색상 코딩)
│   └── SearchBar.tsx          # 검색 입력바
├── navigation/
│   └── AppNavigator.tsx       # Stack Navigator (Home → Search → Detail)
├── screens/
│   ├── HomeScreen.tsx         # 주변 사진관 목록 + 검색
│   ├── SearchScreen.tsx       # 키워드 검색 결과
│   └── DetailScreen.tsx       # 사진관 상세 (정보, 혼잡도, 리뷰)
├── store/
│   └── usePhotoBoothStore.ts  # Zustand 전역 상태
├── toss/
│   └── tossSdk.ts             # 앱인토스 SDK 어댑터 (연동 준비)
├── types/
│   └── index.ts               # TypeScript 인터페이스
└── constants/
    └── index.ts               # 색상, API URL, 브랜드 목록
```

---

## 앱인토스 미니앱 특징

- **로그인 불필요**: 토스 앱 내에서 실행되므로 별도 인증 없음
- **공개 API만 사용**: 사진관 조회, 검색, 혼잡도 조회, 리뷰 조회
- **앱인토스 SDK**: 토스 사용자 정보, 네비게이션 등 SDK 어댑터 준비됨

---

## API 연동 (chalkak-server)

### 사용 중인 공개 엔드포인트

```
GET  /api/photo-booths/nearby?latitude=&longitude=&radius=  # 주변 검색
GET  /api/photo-booths/search/paged?keyword=                 # 키워드 검색
GET  /api/photo-booths/{id}                                   # 단건 조회
GET  /api/photo-booths/brand/{brand}/paged                   # 브랜드별
GET  /api/reviews/photo-booth/{id}/paged                     # 리뷰 목록
GET  /api/reviews/photo-booth/{id}/stats                     # 리뷰 통계
GET  /api/congestion/photo-booth/{id}                        # 혼잡도
```

### API Base URL

- 개발: `http://localhost:8082/api`
- 운영: `https://api.chalkak.co.kr/api` (constants/index.ts에서 설정)

---

## 코드 작성 규칙

### 네이밍

- 파일명: PascalCase (컴포넌트), camelCase (유틸/API)
- 컴포넌트: React.FC + Props 인터페이스
- 스타일: StyleSheet.create 사용

### 컴포넌트 패턴

- Presentational 컴포넌트: Props로 데이터 수신, 순수 렌더링
- Screen 컴포넌트: Zustand store 사용, API 호출

### 상태관리

- Zustand store에서 API 호출 + 상태 관리
- 컴포넌트에서 직접 API 호출 지양 (store 통해)

---

## 빌드 & 실행

```bash
# 의존성 설치
npm install

# 타입 체크
npx tsc --noEmit

# 테스트
npx jest --ci

# Metro 서버
npx react-native start

# Android 실행
npx react-native run-android

# iOS 실행 (pods 설치 후)
cd ios && bundle exec pod install && cd ..
npx react-native run-ios
```

---

## 브랜치 전략

- `main`: 메인 브랜치
- `feat/*`: 기능 개발
- `ci/*`: CI/CD 설정
- `fix/*`: 버그 수정

---

## 앱인토스 출시 체크리스트

- [x] RN 프로젝트 초기화
- [x] CI/CD 워크플로우 구성
- [x] 핵심 화면 구현 (홈, 검색, 상세)
- [x] API 연동 레이어
- [x] 앱인토스 SDK 어댑터 준비
- [ ] 앱인토스 콘솔 앱 등록
- [ ] 앱인토스 SDK 2.x 연동
- [ ] 토스 UI 가이드 적용 (디자인 검수 대비)
- [ ] mTLS 인증서 설정
- [ ] 샌드박스 테스트
- [ ] 검수 제출 (운영/기능/디자인/보안)
- [ ] 출시
