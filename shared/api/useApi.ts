import type { ApiOption, ApiResponse } from "./type"
import { useRuntimeConfig } from "#app"
import { clearToken, getToken, setToken } from "../stores/userAuthStore"

export const useApi = async <T>(endpoint: string, options: ApiOption = {}): Promise<ApiResponse<T>> => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.API_BASE_URL

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers
        }

        if (options.auth) {
            const token = getToken
            if (token) {
                headers['Authorization'] = `Bearer ${token}`
            } else {
                throw new Error('No token available')
            }
        }

        const response = await $fetch.raw<T>(baseUrl + endpoint, {
            method: options.methos,
            headers,
            body: options.body,
            params: options.params,
        })

        if (response.headers.get('auth')) {
            clearToken()
            setToken(response.headers.get('auth'))
        }

        const data = response._data


        return { data, error: null }
    } catch (error: any) {
        return { data: undefined, error: error.message }
    }
}