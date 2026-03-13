/**
 * 앱인토스 SDK 어댑터
 *
 * @apps-in-toss/framework 2.x 실제 연동.
 * 토스 앱 내부에서는 실제 SDK를 사용하고,
 * 개발 환경(__DEV__)에서는 폴백 동작을 제공합니다.
 */

import {
  closeView,
  share as nativeShare,
  getCurrentLocation as nativeGetCurrentLocation,
  appLogin as nativeAppLogin,
  getTossShareLink as nativeGetTossShareLink,
  getOperationalEnvironment,
  getDeviceId,
} from '@apps-in-toss/framework';
import {Accuracy} from '@apps-in-toss/types';
import type {Location} from '@apps-in-toss/types';

export {Accuracy};
export type {Location};

/** 토스/샌드박스 환경 확인 */
export function getEnvironment(): 'toss' | 'sandbox' | 'dev' {
  if (__DEV__) {
    return 'dev';
  }
  try {
    return getOperationalEnvironment();
  } catch {
    return 'dev';
  }
}

/** 디바이스 ID 조회 */
export function getDevice(): string {
  if (__DEV__) {
    return 'dev-device-001';
  }
  try {
    return getDeviceId();
  } catch {
    return 'unknown';
  }
}

/** 미니앱 닫기 */
export async function closeMiniApp(): Promise<void> {
  if (__DEV__) {
    console.log('[TossSDK] closeMiniApp');
    return;
  }
  return closeView();
}

/** 네이티브 공유 */
export async function shareMessage(message: string): Promise<void> {
  if (__DEV__) {
    console.log('[TossSDK] share:', message);
    return;
  }
  return nativeShare({message});
}

/** 토스 공유 링크 생성 후 공유 */
export async function shareTossLink(
  path: string,
  ogImageUrl?: string,
): Promise<void> {
  if (__DEV__) {
    console.log('[TossSDK] shareTossLink:', path);
    return;
  }
  const link = await nativeGetTossShareLink(path, ogImageUrl);
  return nativeShare({message: link});
}

/** 현재 위치 조회 */
export async function fetchCurrentLocation(
  accuracy: Accuracy = Accuracy.Balanced,
): Promise<{latitude: number; longitude: number}> {
  if (__DEV__) {
    // 개발 환경: 서울시청 좌표
    return {latitude: 37.5665, longitude: 126.978};
  }
  try {
    const location: Location = await nativeGetCurrentLocation({accuracy});
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch {
    // 위치 권한 거부 시 기본 좌표
    return {latitude: 37.5665, longitude: 126.978};
  }
}

/** 토스 인증 로그인 */
export async function login(): Promise<{
  authorizationCode: string;
  referrer: 'DEFAULT' | 'SANDBOX';
} | null> {
  if (__DEV__) {
    console.log('[TossSDK] appLogin (dev)');
    return {authorizationCode: 'dev-auth-code', referrer: 'DEFAULT'};
  }
  try {
    return await nativeAppLogin();
  } catch {
    return null;
  }
}
