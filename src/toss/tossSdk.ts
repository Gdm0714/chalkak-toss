/**
 * 앱인토스 SDK 어댑터
 *
 * 앱인토스 SDK 2.x 연동 시 이 파일을 실제 SDK 호출로 교체합니다.
 * 현재는 개발/테스트용 스텁 구현입니다.
 *
 * 실제 연동 시:
 * 1. 앱인토스 콘솔에서 앱 등록
 * 2. SDK 패키지 설치: npm install @tosspayments/app-in-toss-sdk (예시)
 * 3. 이 파일의 스텁을 실제 SDK 호출로 교체
 */

export interface TossUserInfo {
  userId: string;
  name?: string;
  profileImageUrl?: string;
}

export interface TossNavigationOptions {
  title?: string;
  backButton?: boolean;
}

/**
 * 토스 사용자 정보 조회
 * 앱인토스 SDK 연동 시 실제 토스 사용자 정보를 반환합니다.
 */
export const getTossUserInfo = async (): Promise<TossUserInfo | null> => {
  if (__DEV__) {
    // 개발 환경에서는 더미 사용자 반환
    return {
      userId: 'dev-user-001',
      name: '테스트 사용자',
    };
  }

  // TODO: 앱인토스 SDK 연동
  // const userInfo = await AppInTossSDK.getUserInfo();
  // return userInfo;
  return null;
};

/**
 * 토스 앱 네비게이션 바 설정
 */
export const setNavigationBar = (options: TossNavigationOptions): void => {
  if (__DEV__) {
    console.log('[TossSDK] setNavigationBar:', options);
    return;
  }

  // TODO: 앱인토스 SDK 연동
  // AppInTossSDK.setNavigationBar(options);
};

/**
 * 토스 앱 내 공유 기능
 */
export const share = async (params: {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
}): Promise<void> => {
  if (__DEV__) {
    console.log('[TossSDK] share:', params);
    return;
  }

  // TODO: 앱인토스 SDK 연동
  // await AppInTossSDK.share(params);
};

/**
 * 토스 앱 내 닫기 (미니앱 종료)
 */
export const close = (): void => {
  if (__DEV__) {
    console.log('[TossSDK] close mini app');
    return;
  }

  // TODO: 앱인토스 SDK 연동
  // AppInTossSDK.close();
};

/**
 * 미니앱 준비 완료 알림
 * 앱 초기 로딩이 완료되면 호출하여 토스에 준비 완료를 알립니다.
 */
export const ready = (): void => {
  if (__DEV__) {
    console.log('[TossSDK] mini app ready');
    return;
  }

  // TODO: 앱인토스 SDK 연동
  // AppInTossSDK.ready();
};
