/**
 * Security page copy. Claims are limited to what app.cvp.run ships for
 * regular users as of 2026-10: no project-facing audit log or SSO is
 * described as available, video encryption is not end-to-end, and the
 * hidden-project PIN is a privacy screen, not an access control.
 */
export const security = {
  ko: {
    securityPage: {
      label: '보안',
      title: '데이터와 연산을 팀의 통제 아래에 둡니다.',
      description:
        'CVP는 무거운 연산을 팀이 운영하는 에이전트에서 실행하고, 계정·프로젝트·토큰·콘텐츠를 단계별로 보호합니다. 현재 제공하는 보호 장치를 영역별로 정리합니다.',
      mockNote: '* 계정 보안과 세션 화면을 재현한 데모입니다.',
      sections: [
        {
          title: '연산과 데이터는 팀의 장비에서',
          description: '무거운 작업을 외부 GPU에 맡기지 않습니다.',
          items: [
            {
              title: '에이전트 실행',
              body: '추론·학습·동영상 변환·데이터 수집은 팀이 설치한 에이전트에서 실행됩니다. 에이전트가 서버에 연결해 작업을 받으며, 앱마다 CPU·메모리·GPU 한도를 지정합니다.',
            },
            {
              title: '로컬 우선 수집',
              body: '수집기는 데이터를 에이전트의 로컬 디스크에 먼저 기록하고, 클라우드 업로드 조건을 스트림별로 지정합니다.',
            },
            {
              title: '자체 저장소 연결',
              body: '프로젝트 설정의 스토리지에서 MinIO 같은 자체 호스팅 서버를 포함한 S3 호환 버킷을 연결해 프로젝트 파일을 팀의 저장소에 보관합니다.',
            },
            {
              title: '브라우저 안의 유틸리티',
              body: '애플리케이션 메뉴의 계산·변환 도구는 브라우저 안에서 실행되므로 데이터가 외부로 전송되지 않습니다.',
            },
          ],
        },
        {
          title: '계정 보호',
          description: '로그인 단계와 세션을 사용자가 직접 관리합니다.',
          items: [
            {
              title: '2단계 인증',
              body: '인증기 앱(TOTP)을 등록하면 로그인할 때마다 6자리 코드를 확인합니다.',
            },
            {
              title: '세션 관리',
              body: '로그인한 기기·위치·로그인 방식을 확인하고, 다른 모든 기기의 세션을 한 번에 종료합니다.',
            },
            {
              title: '로그인 방식',
              body: '이메일과 비밀번호 외에 Google·GitHub·Discord 계정으로 로그인합니다. CLI는 비밀번호를 입력하지 않고 브라우저에서 기기를 승인해 로그인합니다.',
            },
          ],
        },
        {
          title: '접근 제어',
          description: '멤버와 토큰마다 필요한 권한만 부여합니다.',
          items: [
            {
              title: '역할 기반 권한',
              body: 'owner부터 guest까지 9단계 역할로 멤버의 권한을 구분합니다. 구독 변경은 owner와 maintainer만, 액세스 토큰 관리는 operator 이상만 수행할 수 있습니다.',
            },
            {
              title: '범위가 지정된 토큰',
              body: '프로젝트 토큰마다 실험·모델·레지스트리·저장소 범위와 만료일을 지정합니다. 토큰 원문은 생성 직후 한 번만 표시되며, 서버에는 해시만 저장됩니다.',
            },
            {
              title: '숨김 프로젝트',
              body: '여러 사람이 화면을 함께 보는 자리를 위해 프로젝트를 목록에서 숨기고 4자리 PIN으로 내용을 가립니다. 멤버의 권한을 변경하는 기능은 아닙니다.',
            },
          ],
        },
        {
          title: '콘텐츠 보호',
          description: '공유하는 콘텐츠와 배포하는 소프트웨어를 보호합니다.',
          items: [
            {
              title: '동영상 암호화',
              body: 'HLS 동영상을 AES-128로 암호화해 보관하며, 암호화한 동영상은 공개 링크로 공유할 수 없습니다. Pro 플랜부터 제공됩니다.',
            },
            {
              title: '전자서명 원장',
              body: '서명 레코드는 문서 해시와 이전 레코드의 해시를 연결한 체인으로 기록되어 위변조 여부를 검증합니다.',
            },
            {
              title: '제품키 오프라인 검증',
              body: '설치형 소프트웨어용 라이선스 파일은 Ed25519로 서명되어 네트워크 연결 없이 검증됩니다.',
            },
          ],
        },
      ],
      enterpriseTitle: '조직의 보안 요구 사항이 있습니까?',
      enterpriseBody:
        'SSO, 전용 인프라, 계약 SLA 등 Enterprise 플랜의 조건은 영업팀과 협의합니다.',
      enterpriseCta: '영업팀에 문의',
    },
  },

  en: {
    securityPage: {
      label: 'Security',
      title: 'Your data and compute stay under your team’s control.',
      description:
        'CVP runs heavy compute on agents your team operates and protects accounts, projects, tokens, and content step by step. Here is what is in place today, area by area.',
      mockNote: '* A demo recreated from the account security and sessions screens.',
      sections: [
        {
          title: 'Compute and data on your hardware',
          description: 'Heavy work is never handed to someone else’s GPUs.',
          items: [
            {
              title: 'Agents do the work',
              body: 'Inference, training, video conversion, and data collection run on agents your team installs. Agents connect to the server to pick up work, and each app has CPU, memory, and GPU limits.',
            },
            {
              title: 'Local-first collection',
              body: 'Collectors write to the agent’s local disk first, and the cloud upload condition is set per stream.',
            },
            {
              title: 'Your own storage',
              body: 'Connect an S3-compatible bucket — self-hosted servers such as MinIO included — under project settings › storage to keep project files in your team’s storage.',
            },
            {
              title: 'Utilities in the browser',
              body: 'The calculators and converters in the Applications menu run in the browser, so their data never leaves it.',
            },
          ],
        },
        {
          title: 'Account protection',
          description: 'Users manage their own sign-in steps and sessions.',
          items: [
            {
              title: 'Two-factor authentication',
              body: 'Enroll an authenticator app (TOTP) and every sign-in asks for a 6-digit code.',
            },
            {
              title: 'Session management',
              body: 'See signed-in devices, locations, and sign-in methods, and sign out every other device at once.',
            },
            {
              title: 'Sign-in options',
              body: 'Sign in with email and password or with Google, GitHub, or Discord. The CLI signs in by approving the device in the browser — no password in the terminal.',
            },
          ],
        },
        {
          title: 'Access control',
          description: 'Give each member and token only what it needs.',
          items: [
            {
              title: 'Role-based permissions',
              body: 'Nine roles from owner to guest separate what members can do. Only owners and maintainers change the subscription, and access tokens are managed by operators and up.',
            },
            {
              title: 'Scoped tokens',
              body: 'Each project token gets experiment, model, registry, and storage scopes and an expiry. Its value is shown once right after creation, and only a hash is stored.',
            },
            {
              title: 'Hidden projects',
              body: 'For rooms where a screen is shared, hide a project from lists and cover it with a 4-digit PIN. It does not change anyone’s permissions.',
            },
          ],
        },
        {
          title: 'Content protection',
          description: 'Protect what you share and the software you ship.',
          items: [
            {
              title: 'Video encryption',
              body: 'HLS video is stored encrypted with AES-128, and encrypted videos cannot be shared publicly. Available from the Pro plan.',
            },
            {
              title: 'Signature ledger',
              body: 'Signature records chain the document hash to the previous record’s hash, so tampering can be verified.',
            },
            {
              title: 'Offline product keys',
              body: 'License files for installed software are Ed25519-signed and verify with no network.',
            },
          ],
        },
      ],
      enterpriseTitle: 'Have organization-wide security requirements?',
      enterpriseBody:
        'Enterprise terms such as SSO, dedicated infrastructure, and contractual SLAs are arranged with our sales team.',
      enterpriseCta: 'Contact sales',
    },
  },
} as const;
