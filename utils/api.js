import axios from 'axios';

const PORT = 3001;
axios.defaults.baseURL = `http://localhost:${PORT}`;

export const api = {
  m13: {
    products: {
      getAll: () => axios.get('/api/products'),
      getOne: (id) => axios.get(`/api/products/${id}`),
      post: (product) => axios.post('/api/products', product),
      put: (id, update) => axios.put(`/api/products/${id}`, update),
      delete: (id) => axios.delete(`/api/products/${id}`),
    },
    categories: {
      getAll: () => axios.get('/api/categories'),
      getOne: (id) => axios.get(`/api/categories/${id}`),
      post: (category) => axios.post('/api/categories', category),
      put: (id, update) => axios.put(`/api/categories/${id}`, update),
      delete: (id) => axios.delete(`/api/categories/${id}`),
    },
    tags: {
      getAll: () => {},
      getOne: (id) => {},
      post: (payload) => {},
      put: (id) => {},
      delete: (id) => {},
    },
  },
  m18: {
    users: {
      getAll: () => {},
      getOne: (id) => {},
      post: (payload) => {},
      put: (id) => {},
      delete: (id) => {},
      addFriend: (userId, friendId) => {},
      removeFriend: (userId, friendId) => {},
    },
    thoughts: {
      getAll: () => {},
      getOne: (id) => {},
      post: (payload) => {},
      put: (id) => {},
      delete: (id) => {},
      addreaction: () => {},
      removeReaction: (reactionId) => {},
    },
  },
};
