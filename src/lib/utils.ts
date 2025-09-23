import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function handleApiError(error: any) {
  console.error('API Error:', error);
  return {
    message: error.response?.data?.message || error.message || 'An error occurred',
    status: error.response?.status || 500
  };
}
