import type { Meta } from '@/modules/common/types/meta.type'
import type { Request } from './request.type'

export interface RequestsApiResponse {
  data: Request[]
  meta: Meta
}
