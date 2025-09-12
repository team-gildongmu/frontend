import { Config } from "@/styles/FontVariants";
import { styled } from "styled-components";

export const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    align-items: center;
`
export const BackButton = styled.button`
    background : none;
    color: inherit;
    border: none;
`

export const NickName = styled.p`
    font: ${Config.variants.t01_m}
`