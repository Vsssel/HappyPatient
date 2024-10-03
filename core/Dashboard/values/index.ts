import { ref } from 'vue';
import type { DoctorsearchResponse } from '../types';

export * from './typography';
export const doctors = ref<DoctorsearchResponse[]>()