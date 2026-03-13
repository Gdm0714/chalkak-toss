# mTLS 인증서 디렉토리

앱인토스 mTLS 통신에 필요한 인증서 파일을 이 디렉토리에 배치합니다.

## 필요 파일

| 파일 | 용도 | 발급처 |
|------|------|--------|
| `client.p12` | 클라이언트 인증서 (PKCS#12) | 토스 개발자 콘솔 |
| `client.pem` | 클라이언트 인증서 (PEM) | client.p12에서 변환 |
| `client-key.pem` | 클라이언트 개인키 | client.p12에서 변환 |
| `ca.pem` | 토스 CA 인증서 | 토스 개발자 콘솔 |

## 인증서 변환 (p12 → pem)

```bash
# 인증서 추출
openssl pkcs12 -in client.p12 -clcerts -nokeys -out client.pem

# 개인키 추출
openssl pkcs12 -in client.p12 -nocerts -nodes -out client-key.pem

# CA 인증서 추출
openssl pkcs12 -in client.p12 -cacerts -nokeys -out ca.pem
```

## 주의사항

- 인증서 파일은 `.gitignore`에 의해 저장소에 포함되지 않습니다.
- 인증서 비밀번호는 환경변수 `MTLS_CERT_PASSWORD`로 관리합니다.
- 샌드박스/운영 환경별로 별도 인증서가 발급됩니다.
