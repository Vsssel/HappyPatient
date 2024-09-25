import type { StoreType } from "../types"

export default function getToken(this: StoreType): string {
    return this.token
}