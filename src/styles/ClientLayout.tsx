'use client'

import { noto_300 } from "./Typography"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={noto_300.className}>
      {children}
    </div>
  )
}