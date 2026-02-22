<script setup lang="ts">
import { computed, nextTick } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { requestStatusConfig } from '../config/request-status.config'
import { requestTypeConfig } from '../config/request-type.config'
import type { Request } from '../types/request.type'

const props = defineProps<{
  request: Request
  id: string
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
  (e: 'edit'): void
}>()

// Animations
const onEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'

  requestAnimationFrame(() => {
    element.style.transition = 'height 250ms ease, opacity 200ms ease'
    element.style.height = element.scrollHeight + 'px'
    element.style.opacity = '1'
  })
}

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

const onLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'

  requestAnimationFrame(() => {
    element.style.transition = 'height 250ms ease, opacity 200ms ease'
    element.style.height = '0'
    element.style.opacity = '0'
  })
}

const handleToggle = async () => {
  emit('toggle')
  await nextTick()

  const el = document.getElementById(props.id)
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}

const statusUI = computed(() => requestStatusConfig[props.request.status])
const typeUI = computed(() => requestTypeConfig[props.request.type])
</script>

<template>
  <div :id="id" class="bg-gray-100 overflow-hidden transition-all">
    <div @click="handleToggle" class="flex gap-3 items-center rounded p-5 cursor-pointer">
      <div class="w-36">
        <h3 class="text-lg font-bold text-slate-900 truncate">
          {{ typeUI.label }}
        </h3>
        <p class="text-slate-700 text-sm truncate">{{ request.title }}</p>
      </div>

      <div class="flex flex-1 gap-2 items-center px-5">
        <div class="p-1 rounded-full" :class="[statusUI.bgColor]">
          <component :is="statusUI.component" class="text-white" />
        </div>
        <p class="font-bold text-lg" :class="[statusUI.textColor]">
          {{ statusUI.label }}
        </p>
      </div>

      <ChevronDown :class="[{ 'rotate-180': isActive }, 'transition-transform']" />
    </div>

    <Transition @enter="onEnter" @after-enter="onAfterEnter" @leave="onLeave">
      <div v-if="isActive" class="border-t border-gray-400 overflow-hidden">
        <div class="p-5">
          <!-- Description -->
          <div>
            <h3 class="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Description
            </h3>
            <p class="mt-2 text-slate-700 leading-relaxed">
              {{ request.description }}
            </p>
          </div>

          <!-- Metadata -->
          <div
            class="flex flex-col justify-between items-start gap-3 pt-4 border-t border-slate-200"
          >
            <div class="w-full flex justify-between">
              <p class="text-sm text-slate-500">
                Created on
                <span class="font-medium text-slate-700">
                  {{ new Date(request.createdAt).toLocaleDateString() }}
                </span>
              </p>

              <p class="text-sm text-slate-500">
                Last update
                <span class="font-medium text-slate-700">
                  {{ new Date(request.updatedAt).toLocaleDateString() }}
                </span>
              </p>
            </div>

            <!-- Actions -->
            <div class="w-full flex justify-between gap-3">
              <button
                @click="$emit('edit')"
                class="w-full text-sm text-white px-3 rounded py-1 font-medium bg-blue-600 hover:bg-blue-800 transition-colors"
              >
                Edit
              </button>

              <button
                class="w-full text-sm text-white px-3 rounded py-1 font-medium bg-red-600 hover:bg-red-800 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
