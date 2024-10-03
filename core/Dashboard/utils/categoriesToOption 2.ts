import type { DoctorsSearchResourcesResponse } from "../types"

export const categoriesToOption = (data: DoctorsSearchResourcesResponse['categories']): { label: string, value: any }[] => {
    const res: { label: string, value: any }[] = []
    data.forEach((item) => {
        res.push({
            label: item.title.replace(/\b\w/g, (char) => char.toUpperCase()),
            value: item.id
        })
    })
    return res
}
