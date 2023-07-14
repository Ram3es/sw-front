import axios from 'axios'

export const BASE_URL: string = import.meta.env.VITE_BASE_URL
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL

export const GET = async <T>(endpoint: string): Promise<T> =>
  await getAxiosInstance().get(endpoint)

export const POST = async <T, U = undefined >(endpoint: string, data?: U): Promise<T> =>
  await getAxiosInstance().post(endpoint, data)

const getAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true

  })
  instance.interceptors.request.use((config) => {
    return config
  }, async (error) => {
    return await Promise.reject(error)
  })

  instance.interceptors.response.use(
    (response) => {
      return response.data
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