import { defineStore } from 'pinia'
import {
  createRequestAction,
  deleteRequestAction,
  findManyRequestsAction,
  findOneRequestAction,
  updateRequestAction,
} from '../actions'
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

  const getById = async (id: number) => {
    const response = await findOneRequestAction(id)
    return response
  }

  const update = async (id: number, draftRequest: DraftRequest) => {
    const response = await updateRequestAction(id, draftRequest)
    return response
  }

  const deleteRequest = async (id: number) => {
    const response = await deleteRequestAction(id)
    return response
  }

  return {
    create,
    getUserRequests,
    getById,
    update,
    deleteRequest,
  }
})
