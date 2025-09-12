import { useRouter } from "next/navigation"
import * as P from "./SettingHeader.styles"
import { Icon } from "@iconify/react/dist/iconify.js";
import colors from "@/styles/Colors";

export default function SettingHeader () {
    const router = useRouter();

    return (
        <P.Wrap>
            <P.Button onClick={() => router.back()}>
                <Icon  
                icon="tdesign:chevron-left"
                width={30}
                height={30}
                color={colors.gray_500}
                
                />
            </P.Button>
            <P.NickName>설정</P.NickName>
            <P.Button onClick={() => alert("알림설정해제되었습니다.")}>
                 <Icon  
                    icon="tdesign:notification-filled"
                    width={30}
                    height={30}
                    color={colors.gray_500} 
                    />
            </P.Button>
        </P.Wrap>
    )
}