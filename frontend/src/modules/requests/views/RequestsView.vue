<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { Plus } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import DropdownSelect from '../components/DropdownSelect.vue'
import UserRequestCard from '../components/UserRequestCard.vue'
import RequestPagination from '../components/RequestPagination.vue'
import AppModal from '@/modules/common/components/AppModal.vue'
import RequestForm from '../components/RequestForm.vue'
import RequestConfirmDelete from '../components/RequestConfirmDelete.vue'
import type { Request } from '../types/request.type'

const toast = useToast()

const selectedRequestId = ref<Request['id'] | undefined>(undefined)

// Request Form Modal
const isFormModalOpen = ref(false)
const openFormModal = (id?: Request['id']) => {
  selectedRequestId.value = id
  isFormModalOpen.value = true
}

// Request Confirm Delete Modal
const isConfirmDeleteModalOpen = ref(false)
const openConfirmDeleteModal = (id: Request['id']) => {
  selectedRequestId.value = id
  isConfirmDeleteModalOpen.value = true
}

// Filters
const selectedFilter = ref<Request['type'] | 'all'>('all')
const selectedOrder = ref<'asc' | 'desc'>('desc')

const filterOptions: {
  label: string
  value: Request['type'] | 'all'
}[] = [
  { label: 'All categories', value: 'all' },
  { label: 'Vacations', value: 'vacation' },
  { label: 'Purchases', value: 'purchase' },
  { label: 'Others', value: 'generic' },
]
const orderOptions = [
  { label: 'Most recent', value: 'desc' },
  { label: 'Oldest first', value: 'asc' },
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
  const response = await requestsStore.getUserRequests(currentPage.value, selectedOrder.value)
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

const handleSuccess = async (msg: string) => {
  toast.success(msg)
  await handleGetRequests()
}

onMounted(() => handleGetRequests())

watch(selectedOrder, handleGetRequests)
</script>

<template>
  <div class="bg-gray-300 p-5 border-b border-gray-400">
    <div class="max-w-4xl mx-auto flex items-center gap-5">
      <button
        @click="openFormModal()"
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
        @edit="openFormModal(request.id)"
        @delete="openConfirmDeleteModal(request.id)"
      />
    </div>
  </div>

  <RequestPagination :current-page="currentPage" :total-pages="totalPages" @set-page="setPage" />

  <AppModal v-model="isFormModalOpen" v-slot="{ close }">
    <RequestForm :request-id="selectedRequestId" @close-modal="close" @saved="handleSuccess" />
  </AppModal>

  <AppModal v-model="isConfirmDeleteModalOpen" v-slot="{ close }">
    <RequestConfirmDelete
      :request-id="selectedRequestId"
      @close-modal="close"
      @deleted="handleSuccess"
    />
  </AppModal>
</template>
