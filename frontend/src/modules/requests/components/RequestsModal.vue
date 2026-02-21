<script setup lang="ts">
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { X } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import type { DraftRequest } from '../types/draft-request.type'
import { createRequestSchema } from '../schemas/create-request.schema'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'saved'): void
}>()

const requestsStore = useRequestsStore()

const isOpen = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const isLoading = ref(false)

const { handleSubmit, defineField, resetForm, errors } = useForm<DraftRequest>({
  validationSchema: toTypedSchema(createRequestSchema),
  initialValues: {
    title: '',
    description: '',
    type: 'generic',
  },
})

const [title, titleAttrs] = defineField('title')
const [description, descriptionAttrs] = defineField('description')
const [type, typeAttrs] = defineField('type')

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true

  const response = await requestsStore.create(values)

  if (response.success) {
    emit('saved')
    isOpen.value = false
    resetForm()
  }

  isLoading.value = false
})

const close = () => {
  isOpen.value = false
  resetForm()
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 relative">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">New Request</h2>

          <button @click="close" class="text-gray-400 hover:text-gray-600 transition">
            <X />
          </button>
        </div>

        <!-- Form -->
        <form @submit="onSubmit" class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Title </label>
            <input
              name="title"
              type="text"
              v-model="title"
              v-bind="titleAttrs"
              class="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 px-3 py-2"
            />
            <p class="text-sm text-red-500 mt-1">{{ errors.title }}</p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Description </label>
            <textarea
              name="description"
              rows="3"
              v-model="description"
              v-bind="descriptionAttrs"
              class="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 px-3 py-2"
            />
            <p class="text-sm text-red-500 mt-1">{{ errors.description }}</p>
          </div>

          <!-- Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"> Type </label>
            <select
              name="type"
              v-model="type"
              v-bind="typeAttrs"
              class="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 px-3 py-2"
            >
              <option value="vacation">Vacations</option>
              <option value="purchase">Purchase</option>
              <option value="generic">Other</option>
            </select>
            <p class="text-sm text-red-500 mt-1">{{ errors.type }}</p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end gap-3 pt-4">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isLoading"
              class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-60"
            >
              <span
                v-if="isLoading"
                class="size-4 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
