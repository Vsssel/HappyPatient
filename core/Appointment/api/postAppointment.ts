import axios from 'axios';
import type { AppointmentPostRequest } from '../types';
import { API_URL } from '~/shared/values';

const endpointUrl = `${API_URL}/appointment`;

export async function postAppointment(appointment: AppointmentPostRequest) {
  const response = await axios.post(endpointUrl, appointment);
  return response.data;
}