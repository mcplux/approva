<script setup lang="ts">
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'

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
      class="fixed lg:static bg-blue-600 w-64 lg:w-96 h-screen z-10 transform transition-transform rounded-r-lg flex flex-col overflow-auto"
      :class="[sidebar ? 'translate-x-0' : '-translate-x-full']"
    >
      Sidebar
    </aside>

    <div
      v-if="sidebar"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/40 backdrop-blur-xs lg:hidden"
    />

    <div
      class="flex flex-col h-screen w-full p-5 overflow-auto transition-all"
      :class="[sidebar ? 'lg:ml-0' : 'lg:-ml-96']"
    >
      <header>
        <button @click="toggleSidebar">
          <Menu class="size-8" />
        </button>
      </header>

      <main class="flex-1 max-w-4xl w-full mt-5 mx-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
