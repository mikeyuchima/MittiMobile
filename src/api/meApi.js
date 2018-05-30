import { BASE_URI } from '../../config';

export const get = token => {
    return fetch(`${BASE_URI}/api/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const findStats = token => {
    return fetch(`${BASE_URI}/api/me/stats`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const findChats = (token, skip, limit) => {
    return fetch(`${BASE_URI}/api/me/chats`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const findUnreadMessages = token => {
    return fetch(`${BASE_URI}/api/me/unread-messages`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const findQuestions = (token, skip, limit) => {
    return fetch(`${BASE_URI}/api/me/questions?skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const findPosts = (token, skip, limit) => {
    return fetch(`${BASE_URI}/api/me/posts?skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateMyProfile = (token, me) => {
    return fetch(`${BASE_URI}/api/me`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(me),
    });
};

export const deleteMyProfile = (token, me) => {
    return fetch(`${BASE_URI}/api/me`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const updateMySettings = (token, settings) => {
    return fetch(`${BASE_URI}/api/me`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ settings }),
    });
};
