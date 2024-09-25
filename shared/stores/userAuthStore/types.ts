import type { Store } from 'pinia'

export type Name = 'userAuthStore'

export type State = {
    token: string
}

export type Actions = {
    setToken(token: string): void
}

export type Getetrs = {
    getToken(): string
    isAuthorized(): boolean
}

export type StoreType = Store<Name, State, Actions, Getetrs>