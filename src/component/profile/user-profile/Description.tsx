import * as D from "./Description.styles"

export default function Description (){
    return (
        <D.Container>
            {/* <strong>{userInfo.nickname}</strong>
            <p>{userInfo.desc}</p> */}
            <D.Nickname>길동무 친구들</D.Nickname>
            <D.Quote>천천히 걸어가야 비로소 보이는 것들이 있다.</D.Quote>
        </D.Container>
    )
}