import ProfileImage from "./ProfileImage";
import * as S from "./Stats.styles"
type Props = {
    userInfo: number;
}

export default function Stats ({userInfo}: Props){
    const image=""
    // const image = "/mind-test-image/mind-test-image.png"

    return(
         <S.StatsWrap>
            <ProfileImage userInfo={userInfo} image={image} />
            <S.List>
                <S.ListItem>
                    <S.Caption>게시물</S.Caption>
                    <S.Total>1,000</S.Total>
                </S.ListItem>
                <S.ListItem>
                    <S.Caption>내 여행</S.Caption>
                    <S.Total>50</S.Total>
                </S.ListItem>
                <S.ListItem>
                    <S.Caption> 여행 한 지역 수</S.Caption>
                    <S.Total>5</S.Total>
                </S.ListItem>
            </S.List>
        </S.StatsWrap>
    )
}