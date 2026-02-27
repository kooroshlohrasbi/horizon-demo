'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Role, Deal, Member, Event, PortfolioEntry, InterestSignal } from './types'
import { DEALS, MEMBERS, EVENTS, PORTFOLIO_ENTRIES } from './data'

interface AppState {
  role: Role
  currentUserId: string
  sidebarCollapsed: boolean
  deals: Deal[]
  members: Member[]
  events: Event[]
  portfolio: PortfolioEntry[]
}

interface AppContextType extends AppState {
  setRole: (role: Role) => void
  toggleSidebar: () => void
  setInterest: (dealId: string, investorId: string, signal: InterestSignal) => void
  addSoftCircle: (dealId: string, investorId: string, amount: number) => void
  toggleRSVP: (eventId: string, memberId: string) => void
  addQuestion: (dealId: string, text: string, authorId: string) => void
  upvoteQuestion: (dealId: string, questionId: string) => void
  updateDealStatus: (dealId: string, newStatus: Deal['status']) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const ROLE_USER_MAP: Record<Role, string> = {
  admin: 'm1',
  investor: 'm2',
  founder: 'founder-1',
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>('investor')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [deals, setDeals] = useState<Deal[]>(DEALS)
  const [members] = useState<Member[]>(MEMBERS)
  const [events, setEvents] = useState<Event[]>(EVENTS)
  const [portfolio] = useState<PortfolioEntry[]>(PORTFOLIO_ENTRIES)

  const currentUserId = ROLE_USER_MAP[role]

  const setRole = useCallback((newRole: Role) => {
    setRoleState(newRole)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev)
  }, [])

  const setInterest = useCallback(
    (dealId: string, investorId: string, signal: InterestSignal) => {
      setDeals((prev) =>
        prev.map((deal) => {
          if (deal.id !== dealId) return deal
          const existing = deal.interests.findIndex((i) => i.investorId === investorId)
          const newInterests = [...deal.interests]
          if (existing >= 0) {
            if (signal === null) {
              newInterests.splice(existing, 1)
            } else {
              newInterests[existing] = { investorId, signal }
            }
          } else if (signal !== null) {
            newInterests.push({ investorId, signal })
          }
          return { ...deal, interests: newInterests }
        })
      )
    },
    []
  )

  const addSoftCircle = useCallback(
    (dealId: string, investorId: string, amount: number) => {
      setDeals((prev) =>
        prev.map((deal) => {
          if (deal.id !== dealId) return deal
          const existing = deal.softCircles.findIndex((s) => s.investorId === investorId)
          const newCircles = [...deal.softCircles]
          if (existing >= 0) {
            newCircles[existing] = { investorId, amount }
          } else {
            newCircles.push({ investorId, amount })
          }
          return { ...deal, softCircles: newCircles }
        })
      )
    },
    []
  )

  const toggleRSVP = useCallback(
    (eventId: string, memberId: string) => {
      setEvents((prev) =>
        prev.map((event) => {
          if (event.id !== eventId) return event
          const isRsvpd = event.rsvpd.includes(memberId)
          return {
            ...event,
            rsvpd: isRsvpd
              ? event.rsvpd.filter((id) => id !== memberId)
              : [...event.rsvpd, memberId],
            rsvpCount: isRsvpd ? event.rsvpCount - 1 : event.rsvpCount + 1,
          }
        })
      )
    },
    []
  )

  const addQuestion = useCallback(
    (dealId: string, text: string, authorId: string) => {
      setDeals((prev) =>
        prev.map((deal) => {
          if (deal.id !== dealId) return deal
          const newQuestion = {
            id: `q${Date.now()}`,
            dealId,
            text,
            authorId,
            upvotes: 0,
            pinned: false,
            createdAt: new Date().toISOString().split('T')[0],
          }
          return { ...deal, questions: [...deal.questions, newQuestion] }
        })
      )
    },
    []
  )

  const upvoteQuestion = useCallback(
    (dealId: string, questionId: string) => {
      setDeals((prev) =>
        prev.map((deal) => {
          if (deal.id !== dealId) return deal
          return {
            ...deal,
            questions: deal.questions.map((q) =>
              q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q
            ),
          }
        })
      )
    },
    []
  )

  const updateDealStatus = useCallback(
    (dealId: string, newStatus: Deal['status']) => {
      setDeals((prev) =>
        prev.map((deal) => (deal.id === dealId ? { ...deal, status: newStatus } : deal))
      )
    },
    []
  )

  return (
    <AppContext.Provider
      value={{
        role,
        currentUserId,
        sidebarCollapsed,
        deals,
        members,
        events,
        portfolio,
        setRole,
        toggleSidebar,
        setInterest,
        addSoftCircle,
        toggleRSVP,
        addQuestion,
        upvoteQuestion,
        updateDealStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
