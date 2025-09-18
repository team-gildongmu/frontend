import * as D from "./Description.styles"

type Props = {
    nickname: string;
    intro: string | null;
}

export default function Description ({nickname, intro}: Props){
    return (
        <D.Container>
            
            <D.Nickname>{nickname}</D.Nickname>
            <D.Quote>
                {intro == null ? "한 줄 소개를 작성해주세요!" : intro}
            </D.Quote>
        </D.Container>
    )
}