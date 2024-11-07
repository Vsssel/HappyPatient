export const timeToString = (date: Date): string => {
    return date.toLocaleTimeString("en-GB")
}

export const dateToString = (date: Date): string => {
    return date.toLocaleDateString("en-GB").replace(/\//g, ".")
}