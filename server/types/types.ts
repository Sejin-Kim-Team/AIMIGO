export interface User {
  id: string
  email: string
  name: string
  emailVerified: Date | null
  image: string | null
  remainedHeart: number
  aimigoName: string
  aimigoMbti: string
  aimigoEnergy: number
  pushEnabled: boolean
  pushToken: string | null
  pushPermitStartTime: number | null
  pushPermitEndTime: number | null
  lastPushTime: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface UserPushUpdateRequest {
  name: string
  pushEnabled: boolean
  pushToken: string | null
  pushPermitStartTime: number | null
  pushPermitEndTime: number | null
}
export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface CommonResponse {
  status: StatusCode
  message?: string
}

export interface SingleResponse<T> extends CommonResponse {
  body: T
}
export interface ListResponse<T> extends CommonResponse {
  body: T[]
}
