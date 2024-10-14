import { ref } from 'vue';
import type { DoctorSearchResponse, DoctorSearchRequest } from '../types';

export const doctors = ref<DoctorSearchResponse[]>()
export const values = ref<DoctorSearchRequest>({
    fullname: undefined,
    categories: undefined,
    min_exp_years: undefined,
    offices: undefined,
    sort_by: undefined,
    asc_order: undefined
})