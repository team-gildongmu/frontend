import styled, { css } from 'styled-components'
import colors from '@/styles/Colors'

export const Wrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: .5rem;
    border-bottom: 1px solid #999;
    border-top: 1px solid #999;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const TabList = styled.div`
  display: flex;
  gap: 8px;
  width: max-content;
`

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  background-color: yellow;
`
// icon 에 맞는 이미지 사이즈로

export const TabButton = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid ${colors.gray_200};
  background-color: white;
  color: #999;
  transition: all 0.2s;

  ${(props) =>
    props.$isActive &&
    css`
      background-color: ${colors.blue_500};
      color: white;
      border-color: ${colors.blue_500};
    `}

  &:hover {
    background-color: #f3f4f6;
  }
`