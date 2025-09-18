import colors from "@/styles/Colors"
import { Config } from "@/styles/FontVariants"
import { styled } from "styled-components"

export const ModalWrap = styled.div`
    position: fixed;
    top: 45%;
    left: 30%;
    margin: 0 auto;

    width: 400px;
    height: 300px;
    background-color: ${colors.blue_300};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.white};
    border-radius: 20px;
`

export const ModalContent = styled.div`
    font: ${Config.variants.l01_bold_m};
    color: ${colors.black};
`

export const ModalConfirm = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 30px;
`
export const ConfirmBtn = styled.button`
    display: block;
    border: none;
    background-color: ${colors.red_500};
    padding: .5rem .5rem;
    color: ${colors.white};
    border: 1px solid ${colors.white};
    border-radius: 10px;
    cursor: pointer;
`
export const RejectBtn = styled.button`
    display: block;
    border: none;
    background-color: ${colors.white};
    padding: .5rem .5rem;
    border: 1px solid ${colors.white};
    border-radius: 10px;
    cursor: pointer;
`