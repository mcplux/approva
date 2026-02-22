<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import DropdownSelect from '../components/DropdownSelect.vue'
import RequestsModal from '../components/RequestsModal.vue'
import UserRequestCard from '../components/UserRequestCard.vue'
import type { Request } from '../types/request.type'

// Requests Modal
const isModalOpen = ref(false)
const openModal = () => {
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

const visiblePages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1)
  }

  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  let start = currentPage.value - half
  let end = currentPage.value + half

  if (start < 1) {
    start = 1
    end = maxVisible
  }

  if (end > totalPages.value) {
    end = totalPages.value
    start = totalPages.value - maxVisible + 1
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<template>
  <div class="bg-gray-300 p-5 border-b border-gray-400">
    <div class="max-w-4xl mx-auto flex items-center gap-5">
      <button
        @click="openModal"
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
    class="flex-1 flex flex-col justify-center items-center overflow-auto max-w-4xl w-full mx-auto p-5 border-b border-gray-400"
  >
    <span
      v-if="isLoading"
      class="size-8 border-2 border-slate-700 border-t-transparent rounded-full animate-spin"
    />
    <div v-else class="flex-1 w-full flex flex-col gap-3">
      <UserRequestCard
        v-for="request in requests"
        :key="request.id"
        :id="`item-${request.id}`"
        :request="request"
        :is-active="activeId === request.id"
        @toggle="toggleActiveRequest"
      />
    </div>
  </div>

  <div class="flex justify-end items-center gap-5 w-full max-w-4xl mx-auto p-5">
    <p class="text-sm text-slate-600">Page {{ currentPage }} of {{ totalPages }}</p>
    <div class="flex items-center">
      <button
        class="flex justify-center items-center h-10 w-14 border border-gray-400 rounded-l cursor-pointer"
        :class="['hover:border-b-4 hover:border-b-cyan-500 transition-all']"
        @click="() => setPage(currentPage - 1)"
      >
        <ChevronLeft class="size-4" stroke-width="3" />
      </button>
      <button
        v-for="page in visiblePages"
        :key="page"
        class="flex justify-center items-center size-10 border border-gray-400 text-sm font-bold cursor-pointer"
        :class="[
          { 'border-b-4 border-b-blue-500': page === currentPage },
          'hover:border-b-4 hover:border-b-cyan-500 transition-all',
        ]"
        @click="() => setPage(page)"
      >
        {{ page }}
      </button>
      <button
        class="flex justify-center items-center h-10 w-14 border border-gray-400 rounded-r cursor-pointer"
        :class="['hover:border-b-4 hover:border-b-cyan-500 transition-all']"
        @click="() => setPage(currentPage + 1)"
      >
        <ChevronRight class="size-4" stroke-width="3" />
      </button>
    </div>
  </div>

  <RequestsModal v-model="isModalOpen" @saved="handleGetRequests" />
</template>
