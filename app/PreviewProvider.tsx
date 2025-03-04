'use client'

import dynamic from 'next/dynamic'
import {suspend} from 'suspend-react'

const LiveQueryProvider = dynamic(() => import('src/preview'))
// suspend-react cache is global, so we use a unique key to avoid collisions
const UniqueKey = Symbol('./sanity.client')

export default function PreviewProvider({
  children,
  token,
}: {
  children: React.ReactNode
  token: string
}) {
  const {client} = suspend(() => import('./sanity.client'), [UniqueKey])
  if (!token) throw new TypeError('Missing token')
  return (
    <LiveQueryProvider client={client} token={token} logger={console}>
      {children}
    </LiveQueryProvider>
  )
}
