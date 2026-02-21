<script setup lang="ts">
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'

interface Option {
  label: string
  value: string
}

const props = defineProps<{
  label: string
  options: Option[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

onClickOutside(root, () => {
  open.value = false
})

const selectedLabel = computed(() => {
  return props.options.find((o) => o.value === props.modelValue)?.label ?? ''
})

const select = (option: Option) => {
  emit('update:modelValue', option.value)
  open.value = false
}
</script>

<template>
  <div ref="root" class="relative w-full">
    <button
      @click="open = !open"
      class="flex justify-between items-center px-2 border border-slate-700 p-1 rounded w-full"
    >
      <p class="text-slate-700 font-bold">
        {{ label }}:
        <span class="text-black font-normal">
          {{ selectedLabel }}
        </span>
      </p>
      <ChevronDown :class="{ 'rotate-180': open }" class="transition-transform" />
    </button>

    <div
      v-if="open"
      class="absolute mt-1 w-full bg-white border border-slate-300 rounded shadow-lg z-50"
    >
      <button
        v-for="option in options"
        :key="option.value"
        @click="select(option)"
        class="block w-full text-left px-3 py-2 hover:bg-gray-100"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
