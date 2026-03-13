/**
 * 앱인토스 SDK 어댑터
 *
 * 토스 앱 컨테이너가 제공하는 네이티브 모듈(CommonModule, MiniAppModule)을
 * React Native NativeModules를 통해 직접 호출합니다.
 *
 * - 토스 앱 내부: 실제 네이티브 모듈 호출
 * - 개발 환경(__DEV__) 또는 단독 실행: 폴백 동작 제공
 */

import {NativeModules, Platform, PermissionsAndroid} from 'react-native';

const {CommonModule, MiniAppModule} = NativeModules;

/** 토스 런타임에서 실행 중인지 확인 */
function isTossRuntime(): boolean {
  return !__DEV__ && CommonModule != null;
}

/** 토스/샌드박스/개발 환경 확인 */
export function getEnvironment(): 'toss' | 'sandbox' | 'dev' {
  if (!isTossRuntime()) {
    return 'dev';
  }
  try {
    const constants = MiniAppModule?.getConstants?.();
    return constants?.operationalEnvironment ?? 'toss';
  } catch {
    return 'dev';
  }
}

/** 디바이스 ID 조회 */
export function getDeviceId(): string {
  if (!isTossRuntime()) {
    return 'dev-device-001';
  }
  try {
    return MiniAppModule?.getConstants?.()?.deviceId ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

/** 미니앱 닫기 */
export async function closeMiniApp(): Promise<void> {
  if (!isTossRuntime()) {
    console.log('[TossSDK] closeMiniApp');
    return;
  }
  return CommonModule.closeView();
}

/** 네이티브 공유 */
export async function shareMessage(message: string): Promise<void> {
  if (!isTossRuntime()) {
    console.log('[TossSDK] share:', message);
    return;
  }
  return CommonModule.share({message});
}

/** 현재 위치 조회 */
export async function fetchCurrentLocation(): Promise<{
  latitude: number;
  longitude: number;
}> {
  const DEFAULT_LOCATION = {latitude: 37.5665, longitude: 126.978};

  // 토스 런타임: SDK의 위치 API 사용
  if (isTossRuntime()) {
    try {
      const location = await MiniAppModule.getCurrentLocation({
        accuracy: 'balanced',
      });
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch {
      return DEFAULT_LOCATION;
    }
  }

  // 개발 환경: 표준 Geolocation API + Android 권한 처리
  if (__DEV__) {
    return new Promise(resolve => {
      const fallback = () => resolve(DEFAULT_LOCATION);

      if (Platform.OS === 'android') {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        )
          .then(granted => {
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              fallback();
              return;
            }
            getPositionFromGeolocation(resolve, fallback);
          })
          .catch(fallback);
      } else {
        getPositionFromGeolocation(resolve, fallback);
      }
    });
  }

  return DEFAULT_LOCATION;
}

function getPositionFromGeolocation(
  resolve: (loc: {latitude: number; longitude: number}) => void,
  fallback: () => void,
) {
  const geo = (navigator as any).geolocation;
  if (!geo?.getCurrentPosition) {
    fallback();
    return;
  }
  geo.getCurrentPosition(
    (position: any) =>
      resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
    fallback,
    {enableHighAccuracy: true, timeout: 5000},
  );
}

/** 토스 인증 로그인 */
export async function login(): Promise<{
  authorizationCode: string;
  referrer: 'DEFAULT' | 'SANDBOX';
} | null> {
  if (!isTossRuntime()) {
    console.log('[TossSDK] appLogin (dev)');
    return {authorizationCode: 'dev-auth-code', referrer: 'DEFAULT'};
  }
  try {
    return await MiniAppModule.appLogin();
  } catch {
    return null;
  }
}
