import {BASE_URI} from '../config';

export const create = (token, data) => {
  return fetch(`${BASE_URI}/api/posts`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export const update = (token, postId, data) => {
  return fetch(`${BASE_URI}/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export const find = (token, lat, lng, radius, radiusUnit) => {
  return fetch(`${BASE_URI}/api/posts?lat=${lat}&lng=${lng}&radius=${radius}&radiusUnit=${radiusUnit}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const createChat = (token, postId, data) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export const getPost = (token, postId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const deletePost = (token, postId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const getChat = (token, postId, chatId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const createMessage = (token, postId, chatId, message) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({message}),
  });
}

export const readMessages = (token, postId, chatId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}/messages/read`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
}

export const schedule = (token, postId, chatId, scheduledAt) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}/schedule`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      scheduledAt,
    }),
  });
}

export const confirmSchedule = (token, postId, chatId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}/schedule/accept`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
}

export const rejectSchedule = (token, postId, chatId) => {
  return fetch(`${BASE_URI}/api/posts/${postId}/chat/${chatId}/schedule/reject`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({}),
  });
}