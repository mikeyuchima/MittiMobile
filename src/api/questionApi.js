import { BASE_URI } from '../../config';

export const create = (token, data) => {
    return fetch(`${BASE_URI}/api/questions`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const update = (token, questionId, data) => {
    return fetch(`${BASE_URI}/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const find = (token, lat, lng, radius, radiusUnit) => {
    return fetch(
        `${BASE_URI}/api/questions?lat=${lat}&lng=${lng}&radius=${radius}&radiusUnit=${radiusUnit}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: `Bearer ${token}`,
            },
        }
    );
};

export const createAnswer = (token, questionId, data) => {
    return fetch(`${BASE_URI}/api/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
};

export const findAnswers = (token, questionId) => {
    return fetch(`${BASE_URI}/api/questions/${questionId}/answers`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getById = (token, questionId) => {
    return fetch(`${BASE_URI}/api/questions/${questionId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: `Bearer ${token}`,
        },
    });
};
