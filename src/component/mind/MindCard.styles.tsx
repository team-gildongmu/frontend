import styled from "styled-components";
import colors from "@/styles/Colors";
import { Config } from "@/styles/FontVariants"

export const Wrap = styled.a`
    display: block;
    text-decoration: none;
    color: #000;
    padding: 10px 10px;
    border-bottom: 1px solid ${colors.blue_300}
`

export const Title = styled.h4`
   font: ${Config.variants.l01_bold_m}
`

export const Date = styled.div`
    font: ${Config.variants.l01_m}
`