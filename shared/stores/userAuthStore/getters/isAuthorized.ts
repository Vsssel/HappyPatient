export default function isAuthorized(): boolean {
    return !!localStorage.getItem("authToken")
}