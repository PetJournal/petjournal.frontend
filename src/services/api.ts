'use server';
import { getToken } from './getToken';

export async function api(
  endPoint: RequestInfo | URL,
  options?: RequestInit | undefined,
) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const accessToken = getToken();
  const fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  if (accessToken) {
    fetchOptions.headers = {
      Authorization: 'Bearer ' + accessToken,
      ...fetchOptions.headers,
    };
  }

  return await fetch(`${BASE_URL}${endPoint}`, fetchOptions);
}
