import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    width: 100%;
    background-color: #999;
    overflow-x: auto;
    padding: 0.5rem;
    border-bottom: #999;
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

export const TabButton = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 9999px;
  font-size: 14px;
  white-space: nowrap;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #4b5563;
  transition: all 0.2s;

  ${(props) =>
    props.isActive &&
    css`
      background-color: #3b82f6;
      color: white;
      border-color: #3b82f6;
    `}

  &:hover {
    background-color: #f3f4f6;
  }
`