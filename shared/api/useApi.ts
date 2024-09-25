import { storeToRefs } from 'pinia'
import { userAuthStore } from "../stores/userAuthStore"
import type { ApiOption, ApiResponse } from "./type"
import { useRuntimeConfig } from "#app"

export const useApi = async <T>(endpoint: string, options: ApiOption = {}): Promise<ApiResponse<T>> => {
    const store = userAuthStore()
    const config = useRuntimeConfig()
    const baseUrl = config.public.API_BASE_URL

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers
        }

        if (options.auth) {
            const { token } = storeToRefs(store)
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            } else {
                throw new Error('No token available')
            }
        }

        const data = await $fetch<T>("https://jsonplaceholder.typicode.com" + endpoint, {
            method: options.methos,
            headers,
            body: options.body,
            params: options.params
        })

        return { data, error: null }
    } catch (error: any) {
        return { data: null, error: error.message }
    }
}