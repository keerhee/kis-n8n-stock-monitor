# 한투 API × n8n 주식 모니터링 자동화 커리큘럼

[![Site](https://img.shields.io/badge/%F0%9F%9A%80%20%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B0%94%EB%A1%9C%EA%B0%80%EA%B8%B0-0067ac?style=for-the-badge)](https://keerhee.github.io/kis-n8n-stock-monitor/)
[![Modules](https://img.shields.io/badge/%EB%AA%A8%EB%93%88-7%EA%B0%9C-ea4b71?style=for-the-badge)](https://keerhee.github.io/kis-n8n-stock-monitor/curriculum/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey?style=for-the-badge)](LICENSE)

> **🚀 온라인으로 바로 열람하기 → https://keerhee.github.io/kis-n8n-stock-monitor/**

한국투자증권 Open API와 n8n 워크플로우 자동화를 결합해
**토큰 자동 발급 → 시세 조회 → 거래량 분석 → 디스코드·구글 시트 알림**까지
실전 자동화를 7개 모듈로 학습합니다.

---

## 📚 무엇을 만드나요?

- 새벽에 자동으로 한투 API 토큰을 발급받는 **n8n 스케줄 워크플로**
- 관심 종목의 **현재가·거래량을 주기적으로 수집**하는 자동화
- **거래량이 평균 대비 N배 이상**일 때 디스코드 채널로 즉시 푸시 알림
- 모든 시세 스냅샷을 **구글 시트에 자동 누적**해 백테스트 자료화

## 🗺️ 커리큘럼 한눈에

| 모듈 | 주제 | 시간 | 핵심 산출물 |
|:---:|------|:----:|------------|
| **0** | [사전 준비](docs/모듈0_사전준비.md) | 30분 | 한투·n8n·디스코드·구글 4종 계정 |
| **1** | [API 신청과 인증 이해](docs/모듈1_API신청과_인증이해.md) | 45분 | App Key / App Secret |
| **2** | [토큰 자동 발급](docs/모듈2_토큰자동발급.md) | 45분 | 매일 자동 갱신되는 access_token |
| **3** | [현재가 시세 조회](docs/모듈3_현재가시세조회.md) | 60분 | 종목 현재가·거래량 JSON |
| **4** | [기간별 시세와 평균 거래량](docs/모듈4_기간별시세_평균거래량.md) | 60분 | 20일 평균 거래량 |
| **5** | [거래량 비율 조건 분기](docs/모듈5_거래량비율_조건분기.md) | 30분 | IF 노드로 알림 트리거 |
| **6** | [디스코드 + 구글 시트 연동](docs/모듈6_디스코드_구글시트_연동.md) | 60분 | 완성된 알림 파이프라인 |

**총 학습 시간: 약 6시간** · 전체 커리큘럼 개요는 [여기](docs/한투API_n8n_주식모니터링_커리큘럼.md).

## 📂 레포 구조

```
kis-n8n-stock-monitor/
├── README.md                    # 본 파일
├── LICENSE                      # CC BY-NC 4.0
└── docs/                        # GitHub Pages 서빙 루트 (Jekyll)
    ├── _config.yml              # Jekyll 설정 (모듈 메뉴 정의)
    ├── _layouts/                # default / page / module
    ├── _includes/               # header / sidebar / footer
    ├── assets/
    │   ├── css/style.css        # 라이트 테마
    │   └── js/                  # progress, copy, volume-calc
    ├── infographics/            # 7개 SVG 인포그래픽
    ├── index.html               # 랜딩 페이지
    └── 모듈0~6.md, 커리큘럼.md   # 원본 마크다운 + Jekyll 프론트매터
```

## 🎯 학습 가이드

1. **순서대로 진행하세요** — 모듈 0부터 6까지 의존성이 있습니다.
2. **사이트의 진도 체커**를 활용하세요 — localStorage에 자동 저장됩니다.
3. **모의투자·실전 둘 다 OK** — 모듈 0에서 환경에 맞는 URL이 양쪽 병기됩니다.
4. **막히면 GitHub Issues로 질문**하세요.

## 🔐 보안 주의사항

- **App Key / App Secret은 절대 커밋하지 마세요.** n8n credentials 또는 환경변수에 보관.
- 본 레포의 모든 예시 코드는 더미 키(`PSxxxxxxxxxx` 등)로 표기되어 있습니다.
- 토큰 발급은 **하루 1회 권장** — 남발 시 IP 차단 가능.

## 🛠️ 로컬에서 사이트 미리보기

```bash
cd docs
bundle install
bundle exec jekyll serve
# http://localhost:4000/kis-n8n-stock-monitor/
```

## 📜 라이선스

본 자료는 **CC BY-NC 4.0** (저작자표시-비영리) 라이선스로 배포됩니다.
교육·학습 목적으로 자유롭게 활용·수정·재배포할 수 있으나, **상업적 이용은 별도 협의**가 필요합니다.

## 🙋 기여

오타·오류 발견 시 [Issues](https://github.com/keerhee/kis-n8n-stock-monitor/issues) 또는 PR 환영합니다.

---

> 본 자료는 한국투자증권의 공식 자료가 아닌 **개인 학습용 가이드**입니다. API 사용은 [한국투자증권 Open API 이용약관](https://apiportal.koreainvestment.com/)을 따릅니다.
