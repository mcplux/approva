<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Plus } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import DropdownSelect from '../components/DropdownSelect.vue'
import UserRequestCard from '../components/UserRequestCard.vue'
import type { Request } from '../types/request.type'
import RequestsPagination from '../components/RequestsPagination.vue'
import AppModal from '@/modules/common/components/AppModal.vue'
import RequestForm from '../components/RequestForm.vue'

// Requests Modal
const selectedRequestId = ref<Request['id'] | undefined>(undefined)
const isModalOpen = ref(false)
const openModal = (id?: Request['id']) => {
  selectedRequestId.value = id
  isModalOpen.value = true
}

// Filters
const selectedFilter = ref('all')
const selectedOrder = ref('recent')

const filterOptions = [
  { label: 'All categories', value: 'all' },
  { label: 'Vacations', value: 'vacations' },
  { label: 'Purchases', value: 'purchases' },
]
const orderOptions = [
  { label: 'Most recent', value: 'recent' },
  { label: 'Oldest first', value: 'oldest' },
]

// Requests & pagination
const requestsStore = useRequestsStore()
const requests = ref<Request[]>([])
const isLoading = ref(false)
const activeId = ref<Request['id'] | null>(null)
const totalPages = ref(1)
const currentPage = ref(1)

const toggleActiveRequest = async (id: Request['id']) => {
  activeId.value = activeId.value === id ? null : id
}

const handleGetRequests = async () => {
  isLoading.value = true
  const response = await requestsStore.getUserRequests(currentPage.value)
  if (response.success) {
    requests.value = response.data.data
    totalPages.value = Math.ceil(response.data.meta.total / response.data.meta.limit)
  }
  isLoading.value = false
}

const setPage = (page: number) => {
  if (page > totalPages.value || page < 1) return
  if (page === currentPage.value) return
  currentPage.value = page

  handleGetRequests()
}

onMounted(() => handleGetRequests())
</script>

<template>
  <div class="bg-gray-300 p-5 border-b border-gray-400">
    <div class="max-w-4xl mx-auto flex items-center gap-5">
      <button
        @click="openModal()"
        class="flex items-center gap-1 bg-blue-600 text-white text-lg rounded py-2 px-6 hover:bg-blue-700 transition-colors cursor-pointer"
      >
        <Plus />
        New Request
      </button>
      <div class="flex gap-2 flex-1">
        <DropdownSelect v-model="selectedFilter" label="Filter" :options="filterOptions" />
        <DropdownSelect v-model="selectedOrder" label="Order" :options="orderOptions" />
      </div>
    </div>
  </div>

  <div class="max-w-4xl w-full mx-auto border-b border-gray-400 pt-5 px-5">
    <button class="p-2 pr-4 text-lg font-semibold border-b border-blue-600">My requests</button>
  </div>

  <div
    class="flex-1 flex flex-col overflow-auto max-w-4xl w-full mx-auto p-5 border-b border-gray-400"
  >
    <div v-if="isLoading" class="w-full h-full flex items-center justify-center">
      <span
        class="size-10 border-4 border-slate-700 border-t-transparent rounded-full animate-spin"
      />
    </div>
    <div v-else class="flex-1 w-full flex flex-col gap-3">
      <UserRequestCard
        v-for="request in requests"
        :key="request.id"
        :id="`item-${request.id}`"
        :request="request"
        :is-active="activeId === request.id"
        @toggle="toggleActiveRequest(request.id)"
        @edit="openModal(request.id)"
      />
    </div>
  </div>

  <RequestsPagination :current-page="currentPage" :total-pages="totalPages" @set-page="setPage" />

  <AppModal v-model="isModalOpen" v-slot="{ close }">
    <RequestForm :request-id="selectedRequestId" @close-modal="close" @saved="handleGetRequests" />
  </AppModal>
</template>
