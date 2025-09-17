import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || `${window.location.origin}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
