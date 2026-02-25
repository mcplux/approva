<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { X } from 'lucide-vue-next'

import { useRequestsStore } from '../stores/requests.store'
import type { DraftRequest } from '../types/draft-request.type'
import { createRequestSchema } from '../schemas/create-request.schema'

const props = defineProps<{
  requestId?: number
}>()

const emit = defineEmits<{
  (e: 'saved'): void
  (e: 'closeModal'): void
}>()

const requestsStore = useRequestsStore()

const isEditing = computed(() => !!props.requestId)
const isLoading = ref(false)

// VeeValidate form
const { handleSubmit, defineField, resetForm, errors, setValues } = useForm<DraftRequest>({
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

watch(
  () => props.requestId,
  async (id) => {
    if (!id) {
      resetForm()
      return
    }
    isLoading.value = true
    const request = await requestsStore.getById(id)
    if (request.success) {
      setValues({
        title: request.data.title,
        description: request.data.description,
        type: request.data.type,
      })
    }
    isLoading.value = false
  },
  { immediate: true },
)

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true
  let response

  if (isEditing.value) {
    response = await requestsStore.update(props.requestId!, values)
  } else {
    response = await requestsStore.create(values)
  }

  if (response.success) {
    emit('saved')
    emit('closeModal')
    resetForm()
  }

  isLoading.value = false
})
</script>

<template>
  <div class="w-full max-w-lg rounded-xl bg-white shadow-2xl p-6 relative">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">
        {{ isEditing ? 'Edit Request' : 'New Request' }}
      </h2>

      <button @click="$emit('closeModal')" class="text-gray-400 hover:text-gray-600 transition">
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
          @click="$emit('closeModal')"
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
          {{ isEditing ? 'Edit' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>
