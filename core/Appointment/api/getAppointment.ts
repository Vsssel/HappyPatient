import axios from 'axios';
import type { AppointmentGetResponse } from '../types';
import { API_URL } from '~/shared/values';

const endpointUrl = `${API_URL}/appointment`;

export async function getAppointments(): Promise<AppointmentGetResponse> {
  const response = await axios.get(endpointUrl);
  return response.data;
}