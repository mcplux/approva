<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ChevronDown } from 'lucide-vue-next'

const isDropdownOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

onClickOutside(menuRef, () => {
  isDropdownOpen.value = false
})
</script>

<template>
  <header class="bg-blue-600">
    <div class="max-w-7xl mx-auto p-5 flex items-center justify-between">
      <!-- Header left -->
      <h1 class="text-4xl font-bold text-gray-100">Approva</h1>

      <!-- Header right -->
      <div ref="menuRef" class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-black/20 transition"
          aria-haspopup="true"
          :aria-expanded="isDropdownOpen"
        >
          <ChevronDown
            class="transition-transform duration-200 text-gray-100"
            :class="{ 'rotate-180': isDropdownOpen }"
          />
        </button>

        <!-- Dropdown -->
        <transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-1"
        >
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 overflow-hidden z-10"
          >
            <button class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Profile</button>

            <div class="border-t border-gray-200" />

            <button class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
              Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
</template>
