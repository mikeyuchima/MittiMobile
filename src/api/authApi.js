import { BASE_URI } from '../../config';

export const login = (username, password) => {
    const data = { username, password };
    return fetch(`${BASE_URI}/api/auth/login`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

export const register = (profile, username, password) => {
    const data = { profile, username, password };
    return fetch(`${BASE_URI}/api/register`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

export const resetPassword = username => {
    const data = { username };
    return fetch(`${BASE_URI}/api/forgotPassword`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    });
};

export const resendVerification = (token, username) => {
    const data = { username };
    return fetch(`${BASE_URI}/api/me/resendVerification`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};
