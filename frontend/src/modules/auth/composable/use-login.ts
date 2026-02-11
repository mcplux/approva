import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

import { useAuthStore } from '../stores/auth.store'
import { loginSchema, type loginForm } from '../schemas/login-schema'

export const useLogin = () => {
  const router = useRouter()
  const { defineField, errors, handleSubmit, isSubmitting } = useForm<loginForm>({
    validationSchema: toTypedSchema(loginSchema),
  })

  const authStore = useAuthStore()

  const generalError = ref<string>('')

  const [email, emailAttrs] = defineField('email')
  const [password, passwordAttrs] = defineField('password')

  const onSubmit = handleSubmit(async (values) => {
    const response = await authStore.login(values.email, values.password)
    if (response.success) {
      router.replace('/')
    } else {
      generalError.value = response.error
    }
  })

  return {
    email,
    emailAttrs,
    errors,
    generalError,
    hasGeneralError: computed(() => generalError.value !== ''),
    isSubmitting,
    onSubmit,
    password,
    passwordAttrs,
  }
}
