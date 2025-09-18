"use client"

import Icon from "@/component/common/IconifyIcon"
import ListItem from "@/component/profile/settings/list/ListItem"
import SettingHeader from "@/component/profile/settings/list/SettingHeader"
import colors from "@/styles/Colors"
import { styled } from "styled-components"
import useAuth from "@/hooks/useAuth"

export default function SettingListScreen(){
    const {logout} = useAuth();

    const handleLogout = () => {
       if (logout) {
            logout();
        } else {
            console.error("logout 함수가 정의되어 있지 않습니다.");
        }
    }
    
    return (
        <Container>
            <SettingHeader />
            <ul>
                <ListItem label="내 정보수정" index="/settings/update" />
                <ListItem label="알림 설정" index="/settings/bell" />
                <ListItem label="개인정보 처리방침" index="/settings/filetext"/>
            </ul>
            <LogoutButton onClick={() => handleLogout()}>
                <Icon  
                    icon="tdesign:logout"
                    width={30}
                    height={30}
                    color={colors.red_500}
                />
                로그아웃
            </LogoutButton>
        </Container>
    )
}

const Container = styled.div``


const LogoutButton = styled.div`
    color: ${colors.red_500};
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-top: 80px;
`