import type { DoctorsSearchResourcesResponse } from "../types"

export const officesToOption = (data: DoctorsSearchResourcesResponse['offices']): {label: string, value: string}[] => {
    const res: {label: string, value: string}[] = []
    data.forEach((item) => {
        res.push({
            label: item,
            value: item
        })
    })
    return res
}