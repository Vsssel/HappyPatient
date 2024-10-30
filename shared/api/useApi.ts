import type { ApiOption, ApiResponse } from "./type"
import { useRuntimeConfig } from "#app"
import me from "../stores/User"
import axios from "axios"

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
            }
        }

        const response = await axios({
            url: 'http://localhost:2222/' + endpoint,
            method: options.method || 'GET',
            headers,
            data: options.body,
            params: options.params,
        })

        const refreshedToken = response.headers['auth']
        if (!!refreshedToken) {
            if (me.isAuthorized()){
                me.refreshToken(refreshedToken.replace('Bearer ', ''));
            }else {
                me.authorize(response.data.id, response.data.name, response.data.surname , response.data.gender, response.data.birthDate, response.data.age, response.data.email, response.data.iin,  response.data.role, refreshedToken.replace('Bearer ', ''))
            }
        }
        

        const data = response.data


        return { status: response.status, message: response.statusText, data: data }
    } catch (error: any) {

        if(error.response.status === 401){
            me.signOut()
        }
        return { status: error.response.status, message: error.response.data.detail, data: error.response.detail }
    }
}