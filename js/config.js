window.HADO_CONFIG = {
  "release": {
    "version": "v4.0",
    "sample": false,
    "date": null,
    "size": "확인 중",
    "url": "downloads/HadoVerse.zip",
    "enabled": false,
    "sha256": "",
    "plannedDate": "2026-11-16"
  },
  "rules": {
    "teams": "1 vs 1",
    "duration": 80,
    "lives": 4,
    "respawn": "라이프 소진 후 부활 조건은 실제 게임 설정 확인 후 안내합니다."
  },
  "video": "",
  "screenshots": [],
  "controls": [
    {
      "label": "캐릭터 이동",
      "key": "W / A / S / D"
    },
    {
      "label": "X볼 발사",
      "key": "마우스 우클릭"
    },
    {
      "label": "쉴드 설치",
      "key": "마우스 좌클릭 길게 누르기"
    }
  ],
  "modes": [
    {
      "name": "SPEED",
      "desc": "빠른 반응과 정확한 공격에 집중하는 도전",
      "color": "#145DFF"
    },
    {
      "name": "CHARGING",
      "desc": "에너지 차징을 활용하는 전략형 도전",
      "color": "#D8FF45"
    },
    {
      "name": "DEFEND",
      "desc": "공격을 방어하며 생존하는 도전",
      "color": "#64D9FF"
    },
    {
      "name": "SCALE",
      "desc": "단계별로 난도가 변화하는 도전",
      "color": "#BC9EFF"
    }
  ],
  "team": [
    {
      "name": "BAXTER",
      "role": "프로젝트 리더 · 개발 총괄",
      "bio": "플레이어의 외형과 이동·대시 기능을 구현하고, X볼 생성과 라이프·CPU 움직임, UI 구현을 맡았습니다."
    },
    {
      "name": "DANNY",
      "role": "CPU 시스템 · 점수 구현",
      "bio": "CPU의 외형과 기능 전반을 구현했습니다. 플레이어 프리셋과 점수 기능 제작에도 참여했습니다."
    },
    {
      "name": "URI",
      "role": "플레이어 · 공격 · 쉴드",
      "bio": "플레이어 이동과 대시, X볼 디자인·데미지·공격 및 쉴드 시스템을 제작했습니다."
    },
    {
      "name": "DANA",
      "role": "UI 디자인 · 경기장 제작",
      "bio": "전체 UI 디자인과 경기장 제작에 참여했습니다."
    },
    {
      "name": "MIN",
      "role": "라이프 시스템",
      "bio": "라이프의 외형과 기능 구현을 맡았습니다."
    },
    {
      "name": "TAEOH",
      "role": "맵 디자인",
      "bio": "맵 디자인과 게임 환경 제작에 참여했습니다."
    },
    {
      "name": "ROHA",
      "role": "UI 디자인 지원 · 경기장 제작",
      "bio": "UI 디자인을 지원하고 경기장 제작에 참여했습니다."
    },
    {
      "name": "ZEKA",
      "role": "개발 지원 · 라이프 로직",
      "bio": "라이프 로직 제공과 X볼 디자인을 지원했습니다."
    },
    {
      "name": "JINNY",
      "role": "라이프 시스템",
      "bio": "라이프의 외형과 기능 구현에 참여했습니다."
    }
  ],
  "patchNotes": [],
  "site": {
    "phase": "pre-test",
    "title": "사전 테스트 안내",
    "schedule": "추후 공개",
    "participation": "온라인 사전 신청 접수"
  },
  "developmentHistory": [
    {
      "id": "beta",
      "version": "Beta",
      "title": "첫 번째 구현",
      "stage": "초기 프로토타입",
      "step": "구현",
      "status": "프로토타입 제작",
      "lead": "HADO를 컴퓨터 게임으로 구현하다.",
      "paragraphs": [
        "실제 HADO의 공격과 방어 시스템을 디지털 환경에서 재현하는 것으로 프로젝트를 시작했습니다.",
        "Unreal Engine을 활용해 캐릭터 이동, 에너지볼 발사, 방어막 등 기본적인 경기 요소를 구현했습니다."
      ],
      "listTitle": "주요 개발 내용",
      "items": [
        "Unreal Engine 기반 3D 경기 환경 구축",
        "캐릭터 이동 및 조작 시스템 구현",
        "에너지볼 공격과 방어막 시스템 개발",
        "기본적인 경기 규칙 및 게임 흐름 설계"
      ],
      "contributors": [
        "BAXTER",
        "DANNY"
      ]
    },
    {
      "id": "v1",
      "version": "v1.0",
      "title": "플레이 가능한 게임으로",
      "stage": "첫 번째 체험 버전",
      "step": "체험",
      "status": "플레이 경험 확인",
      "lead": "기술적인 구현에서 실제 플레이 경험으로.",
      "paragraphs": [
        "Beta 버전에서 구현한 기본 시스템을 바탕으로 직접 게임을 즐길 수 있도록 발전시켰습니다.",
        "AI 상대와의 1:1 대전을 중심으로 게임을 구성했습니다."
      ],
      "listTitle": "주요 개발 내용",
      "items": [
        "AI 상대와의 1:1 대전 기능",
        "플레이어 조작 및 경기 진행 방식 개선",
        "공격·방어 시스템의 플레이 경험 점검",
        "실제 사용자 체험을 통한 개선점 확인"
      ],
      "contributors": [
        "BAXTER",
        "DANNY",
        "URI",
        "DANA",
        "MIN",
        "TAEOH",
        "ROHA",
        "ZEKA",
        "JINNY"
      ]
    },
    {
      "id": "v3",
      "version": "v3.0",
      "title": "경기 경험의 고도화",
      "stage": "2026년 11월 확인 버전",
      "step": "개선",
      "status": "체험 운영 준비",
      "lead": "단순한 체험을 넘어, 안정적인 경기 운영을 목표로.",
      "paragraphs": [
        "경기도교육감배 미래형 e스포츠 스쿨리그 부스에서 AI 1:1 대전 체험을 준비했습니다.",
        "조작법과 주의사항 안내 자료를 준비하고 현장 운영을 고려했습니다."
      ],
      "listTitle": "주요 개발 내용",
      "items": [
        "기존 AI와의 1:1 체험 경기 구성",
        "조작법 및 주의사항 안내 자료 준비",
        "행사 부스의 게임 체험 운영 방식 설계"
      ],
      "contributors": [],
      "note": "코드 수준의 변경 사항은 확인 후 별도 안내합니다."
    },
    {
      "id": "online",
      "version": "v4.0",
      "title": "연결의 시작, 더 많은 플레이어에게",
      "stage": "온라인 개발 및 공개 배포 준비",
      "step": "연결·공개",
      "status": "온라인 개발 · 공개 준비",
      "lead": "함께 경쟁하는 HADO를, 더 많은 플레이어에게.",
      "paragraphs": [
        "Dedicated Server 구조로 서로 다른 컴퓨터의 플레이어들이 실시간 경기를 진행할 수 있도록 개발 범위를 확장했습니다.",
        "방 생성·검색과 빠른 참가 방식을 구성했습니다.",
        "공식 홈페이지를 통해 게임 소개와 Windows 다운로드를 제공할 계획입니다."
      ],
      "listTitle": "주요 개발 내용",
      "items": [
        "Dedicated Server 기반 멀티플레이 구조",
        "Create Session / Find Session 기능",
        "방 생성·검색 및 빠른 참가 방식",
        "온라인 서버 운영 및 배포 환경 검토",
        "공식 홈페이지 기획 및 공개 준비"
      ],
      "contributors": [
        "DANNY"
      ]
    }
  ]
};
