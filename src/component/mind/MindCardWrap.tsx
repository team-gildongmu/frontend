import { MindCard } from "./MindCard";
import styled from "styled-components";

const MindScreenWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export default function MindCardWrap () {
    return (
        <MindScreenWrap>
            <MindCard></MindCard>
            <MindCard></MindCard>
            <MindCard></MindCard>
            <MindCard></MindCard>
            <MindCard></MindCard>
            <MindCard></MindCard>
            <MindCard></MindCard>
        </MindScreenWrap>
    )
}
