import approvaApi from '@/config/api/approva.api'
import type { RequestsApiResponse } from '../types/requests-api-response.type'
import type { Request } from '../types/request.type'
import type { AxiosRequestConfig } from 'axios'

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
  order?: 'asc' | 'desc'
}

const LIMIT = +import.meta.env.VITE_LIMIT

export const findManyRequestsAction = async ({
  page = 1,
  mine = true,
  order = 'desc',
}: Params = {}): Promise<GetRequestsAction> => {
  try {
    const config: AxiosRequestConfig = {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        order,
      },
    }

    if (mine) {
      config.params.mine = true
    }

    const { data } = await approvaApi.get<RequestsApiResponse>('/requests', config)

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
