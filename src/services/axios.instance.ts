import axios, { type AxiosResponse } from 'axios'

export const BASE_URL: string = import.meta.env.VITE_BASE_URL

export const GET = async <T>(endpoint: string): Promise<AxiosResponse<T>> =>
  await getAxiosInstance().get(endpoint)

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true

  })
  instance.interceptors.request.use((config) => {
    return config
  }, async (error) => {
    return await Promise.reject(error)
  })

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      if (error?.response?.status === 403) {
        // TODO
      }
      return await Promise.reject(error)
    }
  )
  return instance
}
