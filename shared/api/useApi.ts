import type { ApiOption, ApiResponse } from "./type"
import { useRuntimeConfig } from "#app"
import me from "../stores/User"

export const useApi = async <T>(endpoint: string, options: ApiOption = {}): Promise<ApiResponse<T>> => {
    const config = useRuntimeConfig()
    const baseUrl = config.public.API_BASE_URL

    try {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers
        }

        if (options.auth) {
            const token = me.getToken()
            if (token) {
                headers['Auth'] = `Bearer ${token}`
            } else {
                throw new Error('No token available')
            }
        }

        const response = await $fetch.raw<T>('http://localhost:2222/' + endpoint, {
            method: options.methos,
            headers,
            body: options.body,
            params: options.params,
        })

        const refreshedToken = response.headers.get('Auth')
        if (!!refreshedToken) {
            me.refreshToken(refreshedToken.replace('Bearer ', ''));
        }

        const data = response._data


        return { status: response.status, message: response.statusText, data: data }
    } catch (error: any) {
        return { status: error.response.status, message: error.response._data, data: error.response.detail }
    }
}