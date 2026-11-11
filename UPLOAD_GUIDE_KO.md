# HADO VERSE 전체 재업로드 안내

이 폴더에는 업로드된 기존 웹사이트 파일과 비공개 신청 API 연동 파일이 통합되어 있습니다.

## 반드시 먼저 확인
1. 기존 GitHub 저장소를 삭제하기 전에 백업을 보관하세요.
2. `js/registration-config.js`에서 `YOUR_PROJECT_REF`만 실제 Supabase 프로젝트 Ref로 교체하세요. **API 키를 넣지 마세요.**
3. Supabase SQL Editor에서 `supabase/schema.sql`을 실행하세요. 기존 데이터가 있다면 먼저 백업하세요.
4. GitHub 저장소 Settings → Secrets and variables → Actions에 `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`를 등록하세요.
5. 이 폴더 **안의 내용 전체**를 GitHub 저장소 루트에 올리세요. `.github` 숨김 폴더도 포함해야 합니다.
6. Actions → Deploy private registration API 실행 결과를 확인하세요.
7. 웹사이트 신청 페이지에서 건수 조회와 실제 테스트 신청을 확인하세요.

## 보안
- 브라우저에는 Supabase 비밀 키를 넣지 않습니다.
- 서버 함수는 Supabase 환경변수 `SUPABASE_SERVICE_ROLE_KEY`(legacy service_role JWT)를 사용합니다. 이 값이 프로젝트 환경에서 제공되는지 확인하세요.
- `sb_secret_...` 형태의 새 Secret key를 legacy JWT 대신 그대로 넣는 것은 이 패키지에서 검증하지 않았습니다.
- 공개 API에는 자동화 신청을 막기 위한 CAPTCHA 및 요청 제한이 아직 없습니다. 실제 공개 운영 전에 추가해야 합니다.
- API URL과 Project Ref는 공개됩니다. 신청자 데이터와 Secret key는 공개되지 않아야 합니다.

## 복원 범위
원본 ZIP에 `js/` 폴더가 없어서 기존 GitHub 커밋에서 확인된 구성과 페이지 요소를 바탕으로 `js/config.js`, `js/main.js`, `js/download.js`를 재구성했습니다. 따라서 원래 JS와 완전한 바이트 단위 복원은 아닙니다. 디자인 CSS와 원본 이미지 파일은 보존했습니다.
