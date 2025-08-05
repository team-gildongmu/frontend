'use client'

import { useState } from 'react'
// import { Home, Star, Settings, MessageCircle } from 'lucide-react'
import * as S from './CarouselTabs.styles'

type TabItem = {
  id: string
  label: string
  icon: React.ReactNode
}

const tabs: TabItem[] = [
  { id: 'home', label: '홈', icon: <S.Icon/> },
  { id: 'favorites', label: '즐겨찾기', icon: <S.Icon/> },
  { id: 'settings', label: '설정', icon: <S.Icon/> },
  { id: 'messages', label: '메시지', icon: <S.Icon/> },
  { id: 'mome', label: '홈', icon: <S.Icon/> },
  { id: 'favorite', label: '즐겨찾기', icon: <S.Icon/> },
  { id: 'setting', label: '설정', icon: <S.Icon/> },
  { id: 'message', label: '메시지', icon: <S.Icon/> },
  { id: 'nome', label: '홈', icon: <S.Icon/> },
  { id: 'avorites', label: '즐겨찾기', icon: <S.Icon/> },
  { id: 'ettings', label: '설정', icon: <S.Icon/> },
  { id: 'essages', label: '메시지', icon: <S.Icon/> },
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
            isActive={tab.id === activeTab}
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