import {BASE_URI} from '../config';

export const findStats = (userId, token, skip, limit) => {
  return fetch(`${BASE_URI}/api/users/${userId}/stats`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${token}`,
    },
  });
};