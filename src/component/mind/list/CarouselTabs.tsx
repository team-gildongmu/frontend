'use client'

import { useState } from 'react'
import * as S from './CarouselTabs.styles'

type TabItem = {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: TabItem[] = [
  { id: '힐링', label: '#힐링', icon: <S.Icon/> },
  { id: '도심속', label: '#도심속', icon: <S.Icon/> },
  { id: '혼자만의시간', label: '#혼자만의시간', icon: <S.Icon/> },
  { id: '캠핑', label: '#캠핑', icon: <S.Icon/> },
  { id: '드라이브', label: '#드라이브', icon: <S.Icon/> },
  // 필요 시 더 추가
]

export default function CarouselTabs() {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id)

  return (
    <S.Wrapper>
      <S.TabList>
        {tabs.map((tab) => (
          <S.TabButton
            key={tab.id}
            $isActive={tab.id == activeTab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </S.TabButton>
        ))}
      </S.TabList>
    </S.Wrapper>
  )
}