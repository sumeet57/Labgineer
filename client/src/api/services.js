import api from './axios'

// ─── Auth ──────────────────────────────────────────────
export const authAPI = {
  me: () => api.get('/auth/me'),
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  googleAuth: (accessToken) => api.post('/auth/google', { accessToken }),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
}

// ─── Products ─────────────────────────────────────────
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (slug) => api.get(`/products/${slug}`),
  getCategories: () => api.get('/products/categories'),
  getFeatured: () => api.get('/products/featured'),
  search: (q) => api.get('/products/search', { params: { q } }),
  purchase: (productId, paymentData) => api.post(`/products/${productId}/purchase`, paymentData),
  getMyPurchases: () => api.get('/products/my-purchases'),
  downloadFile: (productId) => api.get(`/products/${productId}/download`, { responseType: 'blob' }),
}

// ─── Blog ─────────────────────────────────────────────
export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getOne: (slug) => api.get(`/blog/${slug}`),
  getCategories: () => api.get('/blog/categories'),
  getTags: () => api.get('/blog/tags'),
}

// ─── Research ─────────────────────────────────────────
export const researchAPI = {
  getAll: (params) => api.get('/research', { params }),
  getOne: (slug) => api.get(`/research/${slug}`),
}

// ─── Payment ──────────────────────────────────────────
export const paymentAPI = {
  createOrder: (data) => api.post('/payment/create-order', data),
  verifyPayment: (data) => api.post('/payment/verify', data),
}

// ─── User ─────────────────────────────────────────────
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  changePassword: (data) => api.put('/user/change-password', data),
  getOrders: () => api.get('/user/orders'),
}