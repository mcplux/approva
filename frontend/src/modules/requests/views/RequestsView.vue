<script setup lang="ts">
import { Pencil, Plus, Trash } from 'lucide-vue-next'
</script>

<template>
  <h1 class="text-4xl text-center font-bold uppercase">My Requests</h1>

  <div class="flex justify-end mt-5">
    <button
      :class="[
        'flex items-center justify-center gap-1',
        'w-full md:w-auto px-3 py-2',
        'border rounded text-white bg-blue-600',
        'hover:bg-blue-700 cursor-pointer transition-colors',
      ]"
    >
      <Plus class="size-4" />
      Add request
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 mt-5">
    <div class="border rounded p-2 space-y-2">
      <p class="text-xs font-bold text-gray-700 text-right">#1</p>
      <h2 class="text-2xl font-bold text-center">Title</h2>
      <p class="text-center bg-gray-400 text-gray-900 font-bold rounded">Not reviewed</p>
      <div class="flex gap-1">
        <button
          :class="[
            'flex items-center justify-center gap-1',
            'w-1/2 p-1',
            'border rounded text-white bg-blue-600',
            'hover:bg-blue-700 cursor-pointer transition-colors',
          ]"
        >
          <Pencil class="size-4" />
          Edit
        </button>
        <button
          :class="[
            'flex items-center justify-center gap-1',
            'w-1/2 p-1',
            'border rounded text-white bg-red-600',
            'hover:bg-red-700 cursor-pointer transition-colors',
          ]"
        >
          <Trash class="size-4" />
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
