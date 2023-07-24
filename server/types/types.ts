export interface User {
  id: string
  oauthId: string
  name: string
  remainedHeart: number
  createdAt: Date
  updatedAt: Date
  aimigos: Aimigo[]
}

export interface Aimigo {
  id: number
  name: string
  mbti: string
  createdAt: Date
  updatedAt: Date
}
