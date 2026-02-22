import { isAxiosError } from 'axios'
import approvaApi from '@/config/api/approva.api'
import type { DraftRequest } from '../types/draft-request.type'
import type { Request } from '../types/request.type'

type UpdateRequestActionResponse =
  | {
      success: true
      data: Request
    }
  | {
      success: false
      error: string
    }

export const updateRequestAction = async (
  id: Request['id'],
  draftRequest: DraftRequest,
): Promise<UpdateRequestActionResponse> => {
  try {
    const { data } = await approvaApi.patch<Request>(`/requests/${id}`, draftRequest)
    return {
      success: true,
      data,
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 404) {
        return {
          success: false,
          error: `Request with id ${id} not found`,
        }
      }

      if (error.status === 400) {
        return {
          success: false,
          error: 'Bad request',
        }
      }
    }

    console.error(error)
    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
