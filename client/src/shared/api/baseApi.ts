import axios from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env.BASE_URL,
});
