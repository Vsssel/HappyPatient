export type SearchRequest = {
    fullname?: string,
    'category-ids'?: number[],
    'min-exp-years'?: number,
    'max-exp-years'?: number,
    offices?: string[],
    workdays?: string[],
    'sort-by'?: string,
    'asc-order'?: boolean
};

export type SearchResponseElement = {
    id: number,
    name: string,
    surname: string,
    avatarUrl: string,
    age: number,
    office: string,
    expInMonthes: number,
    category: SearchSubResponseCategory
};

export type SearchSubResponseCategory = {
    id: number,
    title: string
};