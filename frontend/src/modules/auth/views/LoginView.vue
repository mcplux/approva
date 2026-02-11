<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { loginSchema, type loginForm } from '../schemas/login-schema'
import { loginAction } from '../actions/login.action'

const { handleSubmit, defineField, errors } = useForm<loginForm>({
  validationSchema: toTypedSchema(loginSchema),
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values) => {
  loginAction(values.email, values.password)
})
</script>

<template>
  <div class="flex flex-col items-center gap-5 max-w-2xl w-full mx-auto p-5 bg-white rounded-lg">
    <h1 class="text-4xl font-bold">Login</h1>
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
        class="w-full text-white bg-blue-500 p-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
    </form>
  </div>
</template>
