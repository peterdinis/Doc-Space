import { get, set, del } from 'idb-keyval';

export const saveAccessToken = async (token: string) => {
  await set('access_token', token);
};

export const getAccessToken = async () => {
  return await get<string>('access_token');
};

export const removeAccessToken = async () => {
  await del('access_token');
};