import approvaApi from '@/config/api/approva.api'

export const loginAction = async (email: string, password: string) => {
  const { data } = await approvaApi.post('/auth/login', { email, password })
  console.log(data)
}
