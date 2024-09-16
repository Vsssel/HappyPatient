import axios from 'axios';
import type { AppointmentPostRequest} from '../types';

const API_URL = 'http://localhost:3000/appointment';

export async function postAppointment(appointment: AppointmentPostRequest) {
  const response = await axios.post(API_URL, appointment);
  return response.data;
}