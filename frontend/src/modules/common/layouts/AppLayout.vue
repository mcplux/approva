<script setup lang="ts">
import { ref } from 'vue'

const sidebar = ref(false)

const closeSidebar = () => {
  sidebar.value = false
}

const toggleSidebar = () => {
  sidebar.value = !sidebar.value
}
</script>

<template>
  <div class="flex min-h-screen">
    <aside
      class="fixed lg:static bg-gray-600 w-64 lg:w-96 h-screen z-10 transform transition-transform rounded-r-lg flex flex-col"
      :class="[sidebar ? 'translate-x-0' : '-translate-x-full']"
    >
      Sidebar
    </aside>

    <div
      v-if="sidebar"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/40 backdrop-blur-xs lg:hidden"
    />

    <main
      class="w-full transition-all max-h-screen overflow-auto"
      :class="[sidebar ? 'lg:ml-0' : 'lg:-ml-96']"
    >
      <button @click="toggleSidebar">Open Sidebar</button>
      <RouterView />
    </main>
  </div>
</template>
