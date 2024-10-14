import type { DoctorsSearchResourcesResponse } from "../types"

export const officesToOption = (data: DoctorsSearchResourcesResponse['offices']): {label: string, value: number}[] => {
    const res: {label: string, value: number}[] = []
    data.forEach((item) => {
        res.push({
            label: item.address,
            value: item.id
        })
    })
    return res
}