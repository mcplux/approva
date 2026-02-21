<script setup lang="ts">
import { Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Eye, Plus, X } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-gray-300 p-5 border-b border-gray-400">
    <div class="max-w-4xl mx-auto flex items-center gap-5">
      <button class="flex items-center gap-1 bg-blue-600 text-white text-lg rounded py-2 px-6">
        <Plus />
        New Request
      </button>
      <div class="flex gap-2 flex-1">
        <button
          class="flex justify-between items-center px-2 border border-slate-700 p-1 rounded w-1/2"
        >
          <p class="text-slate-700 font-bold">
            Filter: <span class="text-black font-normal">All categories</span>
          </p>
          <ChevronDown />
        </button>

        <button
          class="flex justify-between items-center px-2 border border-slate-700 p-1 rounded w-1/2"
        >
          <p class="text-slate-700 font-bold">
            Order: <span class="text-black font-normal">Most recent</span>
          </p>
          <ChevronDown />
        </button>
      </div>
    </div>
  </div>

  <div class="max-w-4xl w-full mx-auto border-b border-gray-400 pt-5 px-5">
    <button class="p-2 pr-4 text-lg font-semibold border-b border-blue-600">My requests</button>
  </div>

  <div
    class="flex flex-col flex-1 gap-3 max-w-4xl w-full mx-auto p-5 border-b border-gray-400 overflow-auto"
  >
    <div class="flex gap-3 items-center rounded bg-gray-100 shadow p-5">
      <div class="w-36">
        <h3 class="text-lg font-bold text-slate-900 truncate">Vacations</h3>
        <p class="text-slate-700 text-sm truncate">7 days free</p>
      </div>

      <div class="flex flex-1 gap-2 items-center px-5">
        <div class="bg-amber-500 p-1 rounded-full">
          <Clock class="text-white" />
        </div>
        <p class="text-amber-500 font-bold text-lg">Pending</p>
      </div>

      <ChevronDown />
    </div>

    <div class="flex gap-3 items-center rounded bg-gray-100 shadow p-5">
      <div class="w-36">
        <h3 class="text-lg font-bold text-slate-900 truncate">Free day</h3>
        <p class="text-slate-700 text-sm truncate">Sickness</p>
      </div>

      <div class="flex flex-1 gap-2 items-center px-5">
        <div class="bg-blue-500 p-1 rounded-full">
          <Eye class="text-white" />
        </div>
        <p class="text-blue-500 font-bold text-lg">In review</p>
      </div>

      <ChevronDown />
    </div>

    <div class="flex gap-3 items-center rounded bg-gray-100 shadow p-5">
      <div class="w-36">
        <h3 class="text-lg font-bold text-slate-900 truncate">Purchase</h3>
        <p class="text-slate-700 text-sm truncate">A new laptop for HR</p>
      </div>

      <div class="flex flex-1 gap-2 items-center px-5">
        <div class="bg-green-500 p-1 rounded-full">
          <Check class="text-white" />
        </div>
        <p class="text-green-500 font-bold text-lg">Approved</p>
      </div>

      <ChevronDown />
    </div>

    <div class="flex gap-3 items-center rounded bg-gray-100 shadow p-5">
      <div class="w-36">
        <h3 class="text-lg font-bold text-slate-900 truncate">Generic</h3>
        <p class="text-slate-700 text-sm truncate">Hire Martin Garrix</p>
      </div>

      <div class="flex flex-1 gap-2 items-center px-5">
        <div class="bg-red-500 p-1 rounded-full">
          <X class="text-white" />
        </div>
        <p class="text-red-500 font-bold text-lg">Rejected</p>
      </div>

      <ChevronDown />
    </div>
  </div>

  <div class="flex justify-end items-center gap-5 w-full max-w-4xl mx-auto p-5">
    <p>Page 1 of 5</p>
    <div class="flex items-center">
      <button class="flex justify-center items-center h-9 w-14 border border-gray-400 rounded-l">
        <ChevronLeft class="size-4" stroke-width="3" />
      </button>
      <button
        class="flex justify-center items-center h-9 w-9 border border-gray-400 border-b-4 border-b-blue-600 text-sm font-bold"
      >
        1
      </button>
      <button
        class="flex justify-center items-center h-9 w-9 border border-gray-400 text-sm font-bold"
      >
        2
      </button>
      <button
        class="flex justify-center items-center h-9 w-9 border border-gray-400 text-sm font-bold"
      >
        3
      </button>
      <button class="flex justify-center items-center h-9 w-14 border border-gray-400 rounded-r">
        <ChevronRight class="size-4" stroke-width="3" />
      </button>
    </div>
  </div>
</template>
