import { defineStore } from 'pinia'
import { getManyRequestsAction } from '../actions/get-many-requests.action'
import type { DraftRequest } from '../types/draft-request.type'
import { createRequestAction } from '../actions/create-request.action'

export const useRequestsStore = defineStore('requests', () => {
  const create = async (draftRequest: DraftRequest) => {
    const response = await createRequestAction(draftRequest)

    return response
  }

  const getUserRequests = async () => {
    const response = await getManyRequestsAction()

    return response
  }

  return {
    create,
    getUserRequests,
  }
})
