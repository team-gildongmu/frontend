"use client"
import SettingHeader from "@/component/profile/settings/list/SettingHeader";

export default function FileTextScreen(){
    return (
        <main>
            <SettingHeader />
        <h3>개인정보 처리방침</h3>

      <section>
        <h4>1. 개인정보 수집</h4>
        <p>서비스 제공을 위해 이름, 이메일 등의 기본 정보를 수집합니다.</p>
      </section>

      <section>
        <h4>2. 이용 목적</h4>
        <p>회원 관리, 고객 문의 응답, 서비스 품질 향상에 활용됩니다.</p>
      </section>

      <section>
        <h4>3. 보관 기간</h4>
        <p>개인정보는 목적 달성 후 즉시 파기되며, 법령에 따라 일정 기간 보관될 수 있습니다.</p>
      </section>

      <section>
        <h4>4. 제3자 제공</h4>
        <p>원칙적으로 제3자에게 제공하지 않으며, 법령에 따라 필요한 경우에만 제공됩니다.</p>
      </section>

      <section>
        <h4>5. 문의</h4>
        <p>개인정보 처리 관련 문의는 contact@example.com 으로 연락해 주세요.</p>
      </section>
    </main>
    )
}