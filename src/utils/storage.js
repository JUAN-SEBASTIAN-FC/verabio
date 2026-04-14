// src/utils/storage.js

const USERS_KEY = 'verabio_users';
const PRODUCTS_KEY = 'verabio_products';

// Datos de prueba iniciales
const initialUsers = [
  {
    id: 'admin_1',
    name: 'Admin VeraBio',
    email: 'admin@verabio.com',
    password: 'password123',
    role: 'admin',
    isVerified: true
  },
  {
    id: 'spec_1',
    name: 'Dr. Jane Smith',
    email: 'jane@clinic.com',
    password: 'password123',
    role: 'specialist',
    isVerified: true,
    certificateUrl: 'mock_cert.jpg'
  },
  {
    id: 'spec_2',
    name: 'Dr. John Doe',
    email: 'john@clinic.com',
    password: 'password123',
    role: 'specialist',
    isVerified: false,
    certificateUrl: 'mock_cert2.jpg'
  },
  {
    id: 'prov_1',
    name: 'MedTech Supplies Inc.',
    email: 'sales@medtech.com',
    password: 'password123',
    role: 'provider',
    isVerified: true
  }
];

const initialProducts = [
  {
    id: 'prod_1',
    providerId: 'prov_1',
    name: 'Ácido Hialurónico Inyectable',
    category: 'Estética',
    description: 'Relleno dérmico certificado de alta pureza.',
    price: 150.00,
    status: 'active', // active, out_of_stock
    imageUrl: 'https://images.unsplash.com/photo-1618424911475-430339d37f7a?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_2',
    providerId: 'prov_1',
    name: 'Kit de Suturas Quirúrgicas',
    category: 'Cirugía',
    description: 'Set de suturas premium esterilizadas, varios calibres.',
    price: 45.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=80&w=600',
    reviews: []
  }
];

export const initStorage = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
};

export const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getProducts = () => {
  return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
};

export const saveProducts = (products) => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};
