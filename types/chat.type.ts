type MBTI = 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP' | 'INFJ' | 'INFP' | 'INTJ' | 'INTP' | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP' | 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP'
export interface MbtiTemplate {
  [key: MBTI]: {
    description: string[]
  }
}
