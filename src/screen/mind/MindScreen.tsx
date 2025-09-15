"use client"

import CarouselTabs from "@/component/mind/list/CarouselTabs";
import MindCardWrap from "@/component/mind/list/MindCardWrap";
import PlusButton from "@/component/mind/list/PlusButton";
import styled from "styled-components";

const MindWrap = styled.div`
    margin-bottom: 41px;
    position: relative;
    width: 100%;
    max-width: 780px;
`

const PlusButtonWrap = styled.div`
    position: absolute;
`

export default function MindScreen () {
    return(
        <MindWrap>
            <CarouselTabs />
            <MindCardWrap/>
            <PlusButtonWrap>
                <PlusButton />
            </PlusButtonWrap>
        </MindWrap>
    )   
}