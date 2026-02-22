import type { Request } from '../types/request.type'

type RequestType = Request['type']
type TypeUIStatus = {
  label: string
}

export const requestTypeConfig: Record<RequestType, TypeUIStatus> = {
  generic: { label: 'Other' },
  purchase: { label: 'Purchase' },
  vacation: { label: 'Vacation' },
}
