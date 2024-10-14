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
            const token = getToken()
            if (token) {
                headers['Authorization'] = `${token}`
            }
        }

        const response = await $fetch.raw<T>('http://localhost:2222/' + endpoint, {
            method: options.methos,
            headers,
            body: options.body,
            params: options.params,
        })

        if (response.headers.get('Authorization')) {
            clearToken()
            setToken(response.headers.get('Authorization'))
            console.log(response.headers.get('Authorization'), 'token')
        }

        const data = response._data


        return { status: response.status, message: response.statusText, data: data }
    } catch (error: any) {
        return { status: error.response.status, message: error.response._data, data: error.response.detail }
    }
}