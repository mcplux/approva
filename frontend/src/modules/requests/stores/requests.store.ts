import { defineStore } from 'pinia'
import { getManyRequestsAction } from '../actions/get-many-requests.action'

export const useRequestsStore = defineStore('requests', () => {
  const getUserRequests = async () => {
    const response = await getManyRequestsAction()

    return response
  }

  return {
    getUserRequests,
  }
})
