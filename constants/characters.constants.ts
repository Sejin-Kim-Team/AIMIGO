import ENFJ_JSON from '~/assets/json/enfj-avatar-01.json'
import ENFP_JSON from '~/assets/json/enfp-avatar-01.json'
import ENTJ_JSON from '~/assets/json/entj-avatar-01.json'
import ENTP_JSON from '~/assets/json/entp-avatar-01.json'

import ESFJ_JSON from '~/assets/json/esfj-avatar-01.json'
import ESFP_JSON from '~/assets/json/esfp-avatar-01.json'
import ESTJ_JSON from '~/assets/json/estj-avatar-01.json'
import ESTP_JSON from '~/assets/json/estp-avatar-01.json'

import INFJ_JSON from '~/assets/json/infj-avatar-01.json'
import INFP_JSON from '~/assets/json/infp-avatar-01.json'
import INTJ_JSON from '~/assets/json/intj-avatar-01.json'
import INTP_JSON from '~/assets/json/intp-avatar-01.json'

import ISFJ_JSON from '~/assets/json/isfj-avatar-01.json'
import ISFP_JSON from '~/assets/json/isfp-avatar-01.json'
import ISTJ_JSON from '~/assets/json/istj-avatar-01.json'
import ISTP_JSON from '~/assets/json/istp-avatar-01.json'

export enum MBTI {
  ENFJ,
  ENFP,
  ENTJ,
  ENTP,
  ESFJ,
  ESFP,
  ESTJ,
  ESTP,
  INFJ,
  INFP,
  INTJ,
  INTP,
  ISFJ,
  ISFP,
  ISTJ,
  ISTP,
}

export const MBTI_LIST = [
  'ENFJ',
  'ENFP',
  'ENTJ',
  'ENTP',
  'ESFJ',
  'ESFP',
  'ESTJ',
  'ESTP',
  'INFJ',
  'INFP',
  'INTJ',
  'INTP',
  'ISFJ',
  'ISFP',
  'ISTJ',
  'ISTP',
]

type MBTIType = 'ENFJ' | 'ENFP' | 'ENTJ' | 'ENTP' | 'ESFJ' | 'ESFP' | 'ESTJ' | 'ESTP' | 'INFJ' | 'INFP' | 'INTJ' | 'INTP' | 'ISFJ' | 'ISFP' | 'ISTJ' | 'ISTP'
export interface Aimigo {
  type: MBTIType
  name: string
  avatar: any
}

export const MBTIItems: Aimigo[] = [
  { type: 'ENFJ', name: 'AIMIGO', avatar: ENFJ_JSON },
  { type: 'ENFP', name: 'AIMIGO', avatar: ENFP_JSON },
  { type: 'ENTJ', name: 'AIMIGO', avatar: ENTJ_JSON },
  { type: 'ENTP', name: 'AIMIGO', avatar: ENTP_JSON },
  { type: 'ESFJ', name: 'AIMIGO', avatar: ESFJ_JSON },
  { type: 'ESFP', name: 'AIMIGO', avatar: ESFP_JSON },
  { type: 'ESTJ', name: 'AIMIGO', avatar: ESTJ_JSON },
  { type: 'ESTP', name: 'AIMIGO', avatar: ESTP_JSON },
  { type: 'INFJ', name: 'AIMIGO', avatar: INFJ_JSON },
  { type: 'INFP', name: 'AIMIGO', avatar: INFP_JSON },
  { type: 'INTJ', name: 'AIMIGO', avatar: INTJ_JSON },
  { type: 'INTP', name: 'AIMIGO', avatar: INTP_JSON },
  { type: 'ISFJ', name: 'AIMIGO', avatar: ISFJ_JSON },
  { type: 'ISFP', name: 'AIMIGO', avatar: ISFP_JSON },
  { type: 'ISTJ', name: 'AIMIGO', avatar: ISTJ_JSON },
  { type: 'ISTP', name: 'AIMIGO', avatar: ISTP_JSON },
]
