import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

export function formatDateString(date: string | Date | Dayjs, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format)
}
