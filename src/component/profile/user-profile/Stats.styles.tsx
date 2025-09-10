import { Config } from "@/styles/FontVariants";
import { styled } from "styled-components";

export const StatsWrap = styled.div`
    margin-top : 20px;
    display: flex;
`

export const List = styled.ul`
    display: flex;
    width: 80%;
    justify-content: space-evenly;
    
`
export const ListItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: center;  
    padding: 8px 0;
`
export const Caption = styled.span`
    font: ${Config.variants.c01_m}
`

export const Total = styled.p`
    font: ${Config.variants.l01_bold_m}
    font-size: 18px;
`
