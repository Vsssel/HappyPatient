import type { StoreType } from "../types"

export default function isAuthorized(this: StoreType): boolean {
    return !!this.token
}