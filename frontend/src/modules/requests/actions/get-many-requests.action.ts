import approvaApi from '@/config/api/approva.api'
import type { RequestsApiResponse } from '../types/requests-api-response.type'
import type { Request } from '../types/request.type'

type GetRequestsAction =
  | {
      success: true
      data: RequestsApiResponse
    }
  | {
      success: false
      error: string
    }

type Params = {
  offset?: number
  limit?: number
  mine?: boolean
}

export const getManyRequestsAction = async ({
  offset = 0,
  limit = 20,
  mine = true,
}: Params = {}): Promise<GetRequestsAction> => {
  try {
    const { data } = await approvaApi.get<RequestsApiResponse>('/requests', {
      params: {
        offset,
        limit,
        mine,
      },
    })

    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      error: 'Something went wrong',
    }
  }
}
