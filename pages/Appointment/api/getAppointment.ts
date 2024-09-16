import axios from 'axios';
import type { AppointmentGetResponse } from '../types';

const API_URL = 'http://localhost:3000/appointment';

export async function getBooks(): Promise<AppointmentGetResponse> {
  const response = await axios.get(API_URL);
  return response.data;
}