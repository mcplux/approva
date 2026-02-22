import { defineStore } from 'pinia'
import { findManyRequestsAction } from '../actions/find-many-requests.action'
import { createRequestAction } from '../actions/create-request.action'
import type { DraftRequest } from '../types/draft-request.type'

export const useRequestsStore = defineStore('requests', () => {
  const create = async (draftRequest: DraftRequest) => {
    const response = await createRequestAction(draftRequest)

    return response
  }

  const getUserRequests = async (page: number) => {
    const response = await findManyRequestsAction({ page })

    return response
  }

  return {
    create,
    getUserRequests,
  }
})
