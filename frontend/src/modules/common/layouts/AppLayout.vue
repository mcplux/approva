<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="bg-blue-600 p-5">
      <header class="flex justify-between items-center container mx-auto">
        <h1 class="text-white text-4xl font-bold">Approva</h1>
        <div class="flex gap-2">
          <ChevronDown class="size-8 text-white" />
        </div>
      </header>
    </div>

    <main class="flex-1 flex flex-col h-full overflow-auto">
      <RouterView />
    </main>
  </div>
</template>
