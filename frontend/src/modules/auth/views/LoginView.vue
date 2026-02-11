<script setup lang="ts">
import { useLogin } from '../composable/use-login'

const {
  email,
  emailAttrs,
  errors,
  generalError,
  hasGeneralError,
  isSubmitting,
  onSubmit,
  password,
  passwordAttrs,
} = useLogin()
</script>

<template>
  <div class="flex flex-col items-center gap-5 max-w-2xl w-full mx-auto p-5 bg-white rounded-lg">
    <h1 class="text-4xl font-bold">Login</h1>
    <p v-if="hasGeneralError" class="w-full p-2 bg-red-200 border-l-3 border-red-800 text-red-800">
      {{ generalError }}
    </p>
    <form @submit="onSubmit" class="w-full space-y-3">
      <fieldset class="flex flex-col gap-1">
        <label for="email" class="text-lg">Email:</label>
        <input
          type="email"
          id="email"
          class="border p-2 rounded"
          v-model="email"
          v-bind="emailAttrs"
        />
        <span v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</span>
      </fieldset>

      <fieldset class="flex flex-col gap-1">
        <label for="password" class="text-lg">Password:</label>
        <input
          type="password"
          id="password"
          class="border p-2 rounded"
          v-model="password"
          v-bind="passwordAttrs"
        />
        <span v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</span>
      </fieldset>

      <button
        type="submit"
        :class="[
          'w-full',
          'p-2 rounded cursor-pointer',
          'text-white bg-blue-500 transition-colors',
          'hover:bg-blue-600 disabled:opacity-80 disabled:hover:bg-blue-500 disabled:cursor-not-allowed',
        ]"
        :disabled="isSubmitting"
      >
        Login
      </button>
    </form>
  </div>
</template>
