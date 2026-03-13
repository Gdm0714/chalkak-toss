/**
 * mTLS 설정 모듈
 *
 * 앱인토스 환경에서는 토스 컨테이너가 TLS 핸드셰이크를 관리하며,
 * 독립 실행 시에는 클라이언트 인증서 기반 mTLS를 직접 처리합니다.
 */

import {getEnvironment} from '../toss/tossSdk';

/** mTLS 관련 상수 */
export const MTLS_CONFIG = {
  /** 운영 API 도메인 */
  API_DOMAIN: 'api.chalkak.co.kr',
  /** 인증서 피닝 적용 여부 (운영에서만) */
  ENABLE_PINNING: !__DEV__,
  /** mTLS 적용 여부 */
  ENABLE_MTLS: !__DEV__,
} as const;

/** 환경별 보안 헤더 반환 */
export function getSecurityHeaders(): Record<string, string> {
  const env = getEnvironment();

  if (env === 'dev') {
    return {};
  }

  return {
    'X-Toss-MiniApp': 'chalkak',
    'X-Request-Source': env === 'sandbox' ? 'sandbox' : 'toss',
  };
}

/** mTLS 활성화 상태 확인 */
export function isMtlsEnabled(): boolean {
  return MTLS_CONFIG.ENABLE_MTLS && getEnvironment() !== 'dev';
}
