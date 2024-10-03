export type SearchRequest = {
    fullname?: string,
    category_ids?: string[],
    min_exp_years?: number,
    max_exp_years?: number,
    offices?: string[],
    workdays?: string[],
    sort_by?: string,
    asc_order?: boolean
}

export type DoctorsearchResponse = {
    id: number;
    name: string;
    surname: string;
    experience: number;
    category: {
        id: number;
        title: string;
    }
}

export type DoctorsSearchResourcesRequest = {
    doctors: boolean;
    categories: boolean;
    offices: boolean;
}

export type DoctorsSearchResourcesResponse = {
    doctors: {
        id: null;
        name: string;
        surname: string;
    }[],
    categories: {
        id: number;
        title: string;
    }[],
    offices: string[]
}

export type ResponseMessage = {
    status: boolean,
    message: string,
    data: any
}

export type SearchSubResponseCategory = {
    id: number,
    title: string
}