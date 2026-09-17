type PolicySection = {
  title: string;
  body: string[];
};

const EFFECTIVE_DATE = "2026년 9월 17일";

const SECTIONS: PolicySection[] = [
  {
    title: "1. 수집하는 개인정보 항목 및 수집방법",
    body: [
      "게임웍스(이하 '동아리')는 아래와 같이 개인정보를 수집합니다.",
      "· 가입 신청 시: 이름, 학번, 전화번호 (홈페이지 가입 신청 폼을 통해 수집)",
      "· 활동 신청 시: 학번 및 각 활동별로 요구하는 추가 항목(전화번호, 답변 내용 등) — 활동마다 수집 항목이 다를 수 있으며, 신청 화면에서 항목별로 별도 안내합니다.",
    ],
  },
  {
    title: "2. 개인정보의 수집 및 이용목적",
    body: [
      "· 가입 신청: 회비 납부자 확인, 회원 관리, 단체 카카오톡방 초대 및 회원 대상 개별 연락",
      "· 활동 신청: 활동 참가 신청 접수, 참가 자격(회원 여부) 확인 및 결과 안내",
    ],
  },
  {
    title: "3. 개인정보의 보유 및 이용기간",
    body: [
      "수집·이용에 동의하신 날로부터 위 이용목적을 달성할 때까지 보유하며, 목적이 달성된 개인정보는 지체 없이 파기합니다.",
      "다만 관계 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관합니다.",
    ],
  },
  {
    title: "4. 개인정보의 제3자 제공",
    body: [
      "동아리는 정보주체의 개인정보를 원칙적으로 위 수집·이용목적 범위 내에서만 처리하며, 정보주체의 동의 없이 제3자에게 제공하지 않습니다.",
    ],
  },
  {
    title: "5. 개인정보의 국외 이전",
    body: [
      "동아리는 현재 수집한 개인정보를 국내에서만 저장·처리하고 있으며, 국외로 이전하고 있지 않습니다.",
      "다만 향후 서비스 운영을 위해 국외에 서버를 둔 서비스(예: 해외 SaaS)를 이용하는 등 개인정보의 국외 이전이 필요해지는 경우, 아래 사항을 이전 전에 정보주체에게 고지하고 동의를 받습니다 (개인정보 보호법 제28조의8).",
      "· 이전되는 개인정보 항목",
      "· 개인정보를 이전받는 자의 성명(또는 명칭) 및 연락처",
      "· 개인정보가 이전되는 국가, 이전 일시 및 방법",
      "· 개인정보를 이전받는 자의 개인정보 이용목적 및 보유·이용 기간",
      "· 동의를 거부할 권리가 있다는 사실 및 거부 시 불이익이 있는 경우 그 내용",
    ],
  },
  {
    title: "6. 개인정보처리의 위탁",
    body: [
      "현재 동아리는 개인정보 처리 업무를 외부에 위탁하고 있지 않습니다. 위탁이 발생하는 경우 위탁받는 자와 위탁업무 내용을 본 방침을 통해 사전에 공개하겠습니다.",
    ],
  },
  {
    title: "7. 정보주체의 권리·의무 및 행사방법",
    body: [
      "정보주체는 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요구할 수 있습니다.",
      "권리 행사는 아래 개인정보 보호책임자에게 문의하기 페이지를 통해 요청할 수 있으며, 동아리는 지체 없이 조치합니다.",
    ],
  },
  {
    title: "8. 개인정보의 파기절차 및 방법",
    body: [
      "보유기간이 경과하거나 처리목적이 달성된 개인정보는 전자적 파일 형태인 경우 복구할 수 없는 방법으로 영구 삭제합니다.",
    ],
  },
  {
    title: "9. 개인정보 보호책임자",
    body: [
      "동아리는 개인정보 처리에 관한 업무를 총괄하고 관련 문의·불만 처리를 위해 아래와 같이 개인정보 보호책임자를 두고 있습니다.",
      "· 성명/직책: 게임웍스 회장",
      "· 문의: 홈페이지 '문의하기' 페이지를 통해 접수",
    ],
  },
  {
    title: "10. 고지의 의무",
    body: [
      "본 개인정보처리방침의 내용이 추가·삭제·수정되는 경우 시행일 이전에 본 페이지를 통해 공지합니다.",
      `본 방침은 ${EFFECTIVE_DATE}부터 시행됩니다.`,
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    // RootLayout 자체 배경이 어두운 primary-950라, 이 페이지만 밝은 배경으로 감싸지 않으면
    // 아래 어두운 배경용 텍스트 색(text-text-primary 등)이 거의 안 보인다.
    <div className="min-h-screen bg-surface-white">
      <div className="mx-auto flex w-full max-w-220 flex-col gap-10 px-5 py-16 lg:px-0 lg:py-20">
        <div className="flex flex-col gap-2">
          <h1 className="typo-heading2 text-text-primary lg:typo-heading1">개인정보처리방침</h1>
          <p className="typo-body2 text-text-tertiary">시행일자: {EFFECTIVE_DATE}</p>
        </div>

        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-2">
              <h2 className="typo-subheading typo-bold text-text-primary">{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="typo-body2 whitespace-pre-line text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
