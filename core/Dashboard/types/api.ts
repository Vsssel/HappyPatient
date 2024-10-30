export type DoctorSearchRequest = {
    fullname?: string,
    categories?: number[],
    min_exp_years?: number,
    offices?: number[],
    sort_by?: string,
    asc_order?: boolean
}

export type DoctorSearchResponse = {
    id: number;
    name: string;
    surname: string;
    expInMonthes: number;
    avatarUrl: string;
    category: {
        id: number;
        title: string;
    },
    office: {
        id: number,
        building_id: number,
        address: string,
        title: string
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
    offices: {
        id: number;
        address: string;
    }[]
}

export type ResponseMessage<T> = {
    status: number,
    message: string,
    data: T
}

export type SearchSubResponseCategory = {
    id: number,
    title: string
}