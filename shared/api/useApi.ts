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

        const response = await $fetch.raw<T>("http://172.20.10.11:2222/" + endpoint, {
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


        return { data, error: null }
    } catch (error: any) {
        return { data: undefined, error: error.message }
    }
}