export type MBTI = 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP' | 'INFJ' | 'INFP' | 'INTJ' | 'INTP' | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP' | 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'

export type MbtiTemplate = Record<MBTI, {
  descriptions: string[]
  avatar: any
}>
