# HADO VERSE — Official Website

HADO VERSE v4.0 사전 테스트 안내 웹사이트입니다. HTML/CSS/Vanilla JavaScript로 동작하며 빌드와 패키지 설치가 필요 없습니다.

## GitHub 업로드 및 Pages 공개

1. 이 ZIP을 압축 해제합니다. ZIP 자체를 업로드하지 마세요.
2. 새 GitHub 저장소를 만들거나 사용할 저장소를 엽니다.
3. `Add file → Upload files`에서 압축을 푼 **내부 파일과 폴더**를 업로드합니다. 저장소 첫 화면에 `index.html`, `download.html`, `guide.html`, `updates.html`, `css`, `js`, `assets`가 보여야 합니다. 바깥 폴더째 올리지 마세요.
4. `main` 브랜치에 저장합니다.
5. `Settings → Pages → Build and deployment → Source`를 `Deploy from a branch`로 선택합니다.
6. Branch를 `main`, Folder를 `/(root)`로 선택한 뒤 `Save`를 누릅니다.
7. 배포 완료 후 Pages 화면에 표시되는 주소로 접속합니다. 이후 같은 브랜치의 파일을 수정하면 사이트도 갱신됩니다.

공식 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

`.nojekyll`은 빌드 없는 정적 사이트임을 나타냅니다. 브라우저 업로드 시 숨김 파일을 고를 수 없다면 `Add file → Create new file`에서 이름을 `.nojekyll`로 지정하고 빈 파일을 추가할 수 있습니다.

## 파일 역할

| 파일 | 역할 |
| --- | --- |
| index.html | 메인 소개, 1대1 안내, 사전 신청 이동 |
| download.html | 공개 예정일, 테스트 안내, 브라우저 신청 저장 |
| guide.html | 게임 규칙, WASD/마우스 조작법 |
| updates.html | 4단계 개발 히스토리와 패치노트 영역 |
| css/style.css | 공통 디자인 |
| css/responsive.css | 모바일 대응과 화면 비율 조정 |
| js/config.js | 개발 버전·공개 예정일·규칙·개발 이력·제작진 데이터 |
| js/main.js | 공통 UI, 데이터 표시, 첫 화면 높이 조정 |
| js/registration.js | 브라우저 신청 저장과 같은 브라우저 중복 방지 |
| js/download.js | 향후 배포 파일 확인 기능. 현재 다운로드 비활성 |
| js/gallery.js | 이전 갤러리 코드. 현재는 불러오지 않음 |
| assets | 배경과 팀 포스터. 보조 인게임 갤러리는 현재 미표시 |
| downloads | 향후 배포 경로. 현재 게임 ZIP은 포함하지 않음 |

## 현재 사이트 내용

- 개발 버전: **v4.0**
- 게임 파일 공개 예정: **2026년 11월 16일(월)**, 한국 날짜 기준
- 공개 테스트 일정과 세부 제공 기능: 별도 안내
- 대전 구조: 1 vs 1
- 조작: WASD 이동 / 마우스 우클릭 X볼 발사 / 마우스 좌클릭 길게 누르기 쉴드 설치
- 개발 히스토리: Beta → v1.0 → v3.0 → v4.0
- Beta 제작진: BAXTER, DANNY
- v1.0: 제작진 9명, BAXTER 다음 DANNY 순서
- v4.0: DANNY. 온라인 개발과 공개 배포 준비를 한 항목으로 통합
- 메인의 사람 소개와 인게임 이미지 갤러리는 제거됨
- 상세 제작진은 개발 히스토리 v1.0에서 확인 가능

## 수정 위치

`js/config.js`의 `release.version`, `release.plannedDate`, `release.url`, `release.size`, `release.sha256`을 수정하세요. 실제 공개 일자는 `release.date`로 별도 관리합니다. 현재 배포 파일이 없으므로 `release.enabled`는 false입니다. 파일을 준비하고 경로를 확인한 다음 활성화하세요.

현재 테스트 안내 페이지는 다운로드 대신 공개 예정일을 표시합니다. 실제 배포 시 `download.html`에 `id="download-button"`, `id="download-status"`, `id="source-url"`, `id="file-hash"` 요소를 가진 다운로드 영역을 추가하고 `js/download.js`를 연결해 사용할 수 있습니다. 날짜가 되었다고 자동으로 파일이 공개되지는 않습니다.

대용량 게임 파일은 GitHub Releases 또는 외부 호스팅에 올린 후 `release.url`에 HTTPS 주소를 지정하세요. 이 저장소에는 게임 ZIP을 넣지 않습니다. 같은 출처 URL은 HEAD 요청으로 확인하고, 외부 출처는 파일 제공 여부를 확정하지 않고 외부 배포 페이지로 안내하도록 준비되어 있습니다.

개발 히스토리는 `developmentHistory`, 검증된 코드 변경은 `patchNotes`에서 관리합니다. 현재 패치노트는 비어 있습니다. 온라인 기능 개발 기록은 공개 테스트에서 해당 기능을 이용할 수 있다는 확정 안내가 아닙니다.

## 브라우저 사전 신청의 범위

닉네임과 저장 시각은 localStorage에만 저장되며 운영진에게 전송되지 않습니다. 표시되는 0/1건은 현재 브라우저의 기록이며 전체 신청자 수가 아닙니다. 같은 브라우저·사이트 주소에서 기록이 유지되는 동안 추가 신청을 막습니다. 다른 기기·브라우저·시크릿 모드 또는 저장소 삭제 이후에는 중복 방지를 보장할 수 없습니다. GitHub Pages는 이 파일들만으로 전체 신청을 수집하거나 집계하지 않습니다. 전체 접수·집계에는 서버 또는 별도 신청 서비스가 필요합니다.

## 로컬 실행

`index.html`을 브라우저에서 열거나, 폴더에서 `python3 -m http.server 8000` 실행 후 `http://localhost:8000`으로 접속하세요. 브라우저 저장 기능은 파일 직접 실행보다 같은 HTTP/HTTPS 주소에서 확인하는 것이 적합합니다.

모든 페이지와 자산은 상대 경로를 사용해 GitHub Pages의 저장소 하위 주소에서도 동작합니다. Google Fonts를 사용할 수 없으면 시스템 글꼴로 표시됩니다.
