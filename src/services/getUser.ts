import { User } from '@/types/userType';
import { api } from './api';

export async function getUser() {
  try {
    const res = await api('/guardian/name', {
      cache: 'no-store',
    });

    const { error, firstName, lastName } = await res.json();
    if (error) {
      throw new Error(error);
    }
    const user: User = { firstName, lastName };

    return {
      user,
    };
  } catch (error) {
    const err = error as Error;
    console.log('getUser', err);
    return {
      error: err.message,
    };
  }
}
