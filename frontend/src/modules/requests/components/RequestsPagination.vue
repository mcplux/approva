<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'set-page', page: number): void
}>()

const visiblePages = computed(() => {
  if (props.totalPages <= 5) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1)
  }

  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  let start = props.currentPage - half
  let end = props.currentPage + half

  if (start < 1) {
    start = 1
    end = maxVisible
  }

  if (end > props.totalPages) {
    end = props.totalPages
    start = props.totalPages - maxVisible + 1
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})
</script>

<template>
  <div class="flex justify-end items-center gap-5 w-full max-w-4xl mx-auto p-5">
    <p class="text-sm text-slate-600">Page {{ currentPage }} of {{ totalPages }}</p>
    <div class="flex items-center">
      <button
        class="flex justify-center items-center h-10 w-14 border border-gray-400 rounded-l cursor-pointer"
        :class="['hover:border-b-4 hover:border-b-cyan-500 transition-all']"
        @click="$emit('set-page', currentPage - 1)"
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
        @click="$emit('set-page', page)"
      >
        {{ page }}
      </button>
      <button
        class="flex justify-center items-center h-10 w-14 border border-gray-400 rounded-r cursor-pointer"
        :class="['hover:border-b-4 hover:border-b-cyan-500 transition-all']"
        @click="$emit('set-page', currentPage + 1)"
      >
        <ChevronRight class="size-4" stroke-width="3" />
      </button>
    </div>
  </div>
</template>
