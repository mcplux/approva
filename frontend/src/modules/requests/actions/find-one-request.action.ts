import { isAxiosError } from 'axios'
import approvaApi from '@/config/api/approva.api'
import type { Request } from '../types/request.type'

type FindOneRequestActionResponse =
  | {
      success: true
      data: Request
    }
  | {
      success: false
      error: string
    }

export const findOneRequestAction = async (
  id: Request['id'],
): Promise<FindOneRequestActionResponse> => {
  try {
    const { data } = await approvaApi.get(`requests/${id}`)

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
