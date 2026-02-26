<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import type { Request } from '../types/request.type'

const props = defineProps<{
  requestId?: Request['id']
}>()

const emit = defineEmits<{
  (e: 'closeModal'): void
  (e: 'deleted', msg: string): void
}>()

const isLoading = ref(false)
const requestsStore = useRequestsStore()

const handleDelete = async () => {
  if (props.requestId) {
    isLoading.value = true
    const { success } = await requestsStore.deleteRequest(props.requestId)
    if (success) {
      emit('deleted', 'Request deleted successfully')
      emit('closeModal')
    }
    isLoading.value = false
  } else {
    emit('closeModal')
  }
}
</script>

<template>
  <div class="w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Delete Request</h2>

      <button @click="$emit('closeModal')" class="text-gray-400 hover:text-gray-600 transition">
        <X />
      </button>
    </div>

    <p class="text-gray-800">Are you sure you want to delete this request?</p>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4">
      <button
        type="button"
        @click="$emit('closeModal')"
        class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
      >
        Cancel
      </button>

      <button
        @click="handleDelete"
        :disabled="isLoading"
        class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 disabled:opacity-60"
      >
        <span
          v-if="isLoading"
          class="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"
        />
        Yes, Delete
      </button>
    </div>
  </div>
</template>
