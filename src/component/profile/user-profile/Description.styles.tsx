import { Config } from "@/styles/FontVariants";
import { styled } from "styled-components"

export const Container = styled.div`
    margin-top: 16px;
`

export const Nickname = styled.strong`
    font: ${Config.variants.t02_m}
`   

export const Quote =  styled.p`
    font: ${Config.variants.c02_m}
    
    position: relative;
    &::before {
        content: "“";
        margin-right: 4px;
    }
    &::after {
        content: "”";
        margin-left: 4px;
    }
`;