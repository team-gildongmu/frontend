"use client"

import MindCardWrap from "@/component/mind/list/MindCardWrap";
import Category from "@/component/myroad/list/Category";
import { useState } from "react";
import styled from "styled-components";

const MindWrap = styled.div`
    margin-bottom: 41px;
    position: relative;
    width: 100%;
    height: 86%;
    max-width: 780px;
`

export default function MindScreen () {
    const [selectedCategory, setSelectedCategory] = useState({ name: "자연" });
    
    return(
        <MindWrap>
            <Category
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <MindCardWrap/>
        </MindWrap>
    )   
}