"use client"
import colors from "@/styles/Colors";
import Icon from "../../common/IconifyIcon";
import * as P from "./ProfileHeader.styles";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  userInfo: number;
};

export default function ProfileHeader({userInfo}: Props){
    console.log("userInfo", userInfo)
    const nickname = "길동무 친구들"
    const router = useRouter();
    return (
        <P.Wrap>
            <P.BackButton onClick={() => router.back()}>
                <Icon  
                icon="tdesign:chevron-left"
                width={30}
                height={30}
                color={colors.gray_500}
                
                />
            </P.BackButton>
            <P.NickName>{nickname}</P.NickName>
            <Link href="/settings">
                 <Icon  
                    icon="tdesign:setting-1-filled"
                    width={30}
                    height={30}
                    color={colors.gray_500} 
                    />
            </Link>
        </P.Wrap>
    )
}