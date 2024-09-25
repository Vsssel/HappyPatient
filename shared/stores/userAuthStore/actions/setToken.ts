export default function setToken(token: string | null): void {
    token && localStorage.setItem("authToken", token)
}