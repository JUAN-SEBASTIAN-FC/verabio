// src/utils/storage.js

const USERS_KEY = 'verabio_users';
const PRODUCTS_KEY = 'verabio_products';
const DATA_VERSION_KEY = 'verabio_data_version';
const CURRENT_VERSION = 'v4'; // Incrementado para forzar actualización

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
    description: 'Relleno dérmico certificado de alta pureza. 2mg/ml.',
    price: 150.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
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
  },
  {
    id: 'prod_3',
    providerId: 'prov_1',
    name: 'Analgésicos de Amplio Espectro (500mg)',
    category: 'Fármacos',
    description: 'Lote de tabletas para dolor moderado a severo. Uso clínico exclusivo.',
    price: 12.50,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_4',
    providerId: 'prov_1',
    name: 'Vacuna Inmunológica Pre-envasada',
    category: 'Inmunología',
    description: 'Jeringas precargadas esterilizadas. Cadena de frío requerida.',
    price: 85.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_5',
    providerId: 'prov_1',
    name: 'Estetoscopio Clínico Premium',
    category: 'Equipos',
    description: 'Acústica superior y campana de acero inoxidable. Grado cardiológico.',
    price: 125.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_6',
    providerId: 'prov_1',
    name: 'Solución Intravenosa Fisiológica (Caja x20)',
    category: 'Suministros',
    description: 'Suero fisiológico para rehidratación intravenosa en entorno hospitalario.',
    price: 35.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_7',
    providerId: 'prov_1',
    name: 'Mascarillas Quirúrgicas N95',
    category: 'Protección',
    description: 'Caja x50 mascarillas certificadas. Filtración >95% de partículas.',
    price: 28.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=600',
    reviews: []
  },
  {
    id: 'prod_8',
    providerId: 'prov_1',
    name: 'Microscopio de Grado Laboratorio',
    category: 'Equipos',
    description: 'Microscopio binocular con aumentos 1000x y visor LED. Investigación.',
    price: 850.00,
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=600',
    reviews: []
  }
]; 

export const initStorage = () => {
  const savedVersion = localStorage.getItem(DATA_VERSION_KEY);
  
  if (!localStorage.getItem(USERS_KEY) || savedVersion !== CURRENT_VERSION) {
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
  
  if (!localStorage.getItem(PRODUCTS_KEY) || savedVersion !== CURRENT_VERSION) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
    localStorage.setItem(DATA_VERSION_KEY, CURRENT_VERSION);
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
