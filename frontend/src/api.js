const BASE = 'http://localhost:8080/api';

function toQuery(params = {}) {
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') q.append(k, v);
  });
  return q.toString();
}

export async function getProducts(params) {
  const res = await fetch(`${BASE}/products?${toQuery(params)}`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`);
  if (!res.ok) return [];
  return res.json();
}

export async function createBooking(payload) {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Failed to create booking');
  return res.json();
}

/* ---------- NEW: Basic Auth helpers + create product ---------- */
export function getAdminAuthHeader() {
  const token = localStorage.getItem('adminAuth'); // base64 of user:pass
  if (!token) return {};
  return { Authorization: `Basic ${token}` };
}

export async function createProduct(payload) {
  const res = await fetch(`${BASE}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAdminAuthHeader(),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to create product');
  }
  return res.json();
}
