import { isAxiosError } from 'axios'
import approvaApi from '@/config/api/approva.api'
import type { DraftRequest } from '../types/draft-request.type'
import type { Request } from '../types/request.type'

type CreateRequestAction =
  | {
      success: true
      data: Request
    }
  | {
      success: false
      error: string
    }

export const createRequestAction = async (
  draftRequest: DraftRequest,
): Promise<CreateRequestAction> => {
  try {
    const { data } = await approvaApi.post<Request>('/requests', draftRequest)

    return {
      success: true,
      data,
    }
  } catch (error) {
    if (isAxiosError(error) && error.status === 400) {
      return {
        success: false,
        error: 'Bad request',
      }
    }

    console.error(error)
    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
