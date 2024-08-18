'use server';
import { getToken } from './getToken';
import { getUser } from './getUser';

export async function getSession() {
  try {
    const accessToken = getToken();

    if (!accessToken) {
      throw new Error('Nenhum usuário autenticado...');
    }

    const { error, user } = await getUser();

    if (error || !user) {
      throw new Error(error || 'Token inválido ou expirado...');
    }

    const session = {
      accessToken,
      user,
    };
    return {
      session,
    };
  } catch (error) {
    const err = error as Error;
    console.log('getSession', error);
    return {
      error: err.message,
    };
  }
}
