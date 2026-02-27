export type DealStatus = 'New' | 'Screening' | 'Intro Requested' | 'Diligence' | 'Passed' | 'Investing'
export type InterestSignal = 'interested' | 'watching' | 'pass' | null
export type Role = 'admin' | 'investor' | 'founder'

export interface Deal {
  id: string
  name: string
  sector: string
  stage: 'Pre-seed' | 'Seed' | 'Series A'
  ask: string
  oneLiner: string
  description: string
  status: DealStatus
  heroImage: string
  deckUrl?: string
  founderName: string
  founderEmail: string
  traction?: string
  createdAt: string
  tags: string[]
  interests: { investorId: string; signal: InterestSignal }[]
  softCircles: { investorId: string; amount: number }[]
  questions: Question[]
}

export interface Question {
  id: string
  dealId: string
  text: string
  authorId: string | 'anon'
  upvotes: number
  pinned: boolean
  createdAt: string
}

export interface Member {
  id: string
  name: string
  role: Role
  background: string
  thesisTags: string[]
  chequeMin: number
  chequeMax: number
  geo: string
  availableThisMonth: boolean
  avatar: string
  engagementScore: number
}

export interface Event {
  id: string
  title: string
  date: string
  location: string
  sector: string
  capacity: number
  rsvpCount: number
  founders: string[]
  heroImage: string
  rsvpd: string[]
}

export interface PortfolioEntry {
  memberId: string
  dealId: string
  amount: number
  date: string
  status: 'active' | 'exited' | 'written-off'
}
