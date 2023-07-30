import type { CommonResponse, ListResponse, SingleResponse } from '~/server/types/types'
import { StatusCode } from '~/server/types/types'

export function getSuccessResponse(): CommonResponse {
  return {
    status: StatusCode.OK,
    message: 'success',
  }
}
export function getCreatedResponse<T>(body: T): SingleResponse<T> {
  return {
    status: StatusCode.CREATED,
    body,
    message: 'success',
  }
}

export function getSingleSuccessResponse<T>(body: T): SingleResponse<T> {
  return {
    status: StatusCode.OK,
    body,
    message: 'success',
  }
}

export function getListSuccessResponse<T>(body: T[]): ListResponse<T> {
  return {
    status: StatusCode.OK,
    body,
    message: 'success',
  }
}

export function getErrorResponse(status: StatusCode, message: string | null): CommonResponse {
  let resultMessage = message
  if (!resultMessage) {
    switch (status) {
      case StatusCode.BAD_REQUEST:
        resultMessage = 'bad request'
        break
      case StatusCode.UNAUTHORIZED:
        resultMessage = 'unauthorized'
        break
      case StatusCode.FORBIDDEN:
        resultMessage = 'forbidden'
        break
      case StatusCode.NOT_FOUND:
        resultMessage = 'not found'
        break
      case StatusCode.INTERNAL_SERVER_ERROR:
        resultMessage = 'internal server error'
        break
      default:
        resultMessage = 'unknown error'
    }
  }

  return {
    status,
    message: resultMessage,
  }
}
