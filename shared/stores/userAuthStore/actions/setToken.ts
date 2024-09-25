import type { StoreType } from "../types"

export default function setToken(this: StoreType, token: string): void {
    this.token = token
}