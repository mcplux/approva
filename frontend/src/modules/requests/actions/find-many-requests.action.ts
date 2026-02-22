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
  page?: number
  mine?: boolean
}

const LIMIT = 2

export const findManyRequestsAction = async ({
  page = 1,
  mine = true,
}: Params = {}): Promise<GetRequestsAction> => {
  try {
    const { data } = await approvaApi.get<RequestsApiResponse>('/requests', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        mine,
      },
    })

    console.log(data)

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
