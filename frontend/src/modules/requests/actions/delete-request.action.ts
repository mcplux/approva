import { isAxiosError } from 'axios'
import approvaApi from '@/config/api/approva.api'

type DeleteRequestAction =
  | {
      success: true
    }
  | {
      success: false
      error: string
    }

export const deleteRequestAction = async (id: number): Promise<DeleteRequestAction> => {
  try {
    await approvaApi.delete(`/requests/${id}`)

    return {
      success: true,
    }
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.status === 404) {
        return {
          success: false,
          error: 'Request not found',
        }
      }

      if (error.status === 403) {
        return {
          success: false,
          error: 'User cannot delete this request',
        }
      }
    }
  }

  return {
    success: false,
    error: 'Something went wrong',
  }
}
