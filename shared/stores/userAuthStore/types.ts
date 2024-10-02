export type Name = 'authToken'

export type State = {
    token: string
}

export type Actions = {
    setToken(token: string): void
}

export type Getters = {
    getToken(): string
    isAuthorized(): boolean
}