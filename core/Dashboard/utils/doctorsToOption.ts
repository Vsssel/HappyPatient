import type { DoctorsSearchResourcesResponse } from "../types"

export const getDoctorsSuggestions = (data: DoctorsSearchResourcesResponse['doctors']): string[] => {
    const res: string[] = []
    data.forEach((item) => {
        res.push(`${item.name} ${item.surname}`)
    })

    return res
}