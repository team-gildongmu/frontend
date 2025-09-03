import CarouselTabs from "@/component/mind/list/CarouselTabs";
import MindCardWrap from "@/component/mind/list/MindCardWrap";
import styled from "styled-components";

const MindWrap = styled.div`
    height: 100%;
    width: 100%;
`

export default function MindScreen () {
    return(
        <MindWrap>
            <CarouselTabs />
            <MindCardWrap/>
        </MindWrap>
    )   
}