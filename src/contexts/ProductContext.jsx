import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

// Datos mock locales para que funcione inmediatamente
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Chocolate KitKat',
    price: 2.50,
    category: 'Chocolate',
    description: 'Delicioso chocolate con galletas crujientes',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop',
    stock: 50
  },
  {
    id: 2,
    name: 'Caramelos M&M',
    price: 1.80,
    category: 'Caramelos',
    description: 'Caramelos de chocolate con cáscara colorida',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    stock: 75
  },
  {
    id: 3,
    name: 'Gomitas Ositos',
    price: 3.20,
    category: 'Gomitas',
    description: 'Gomitas suaves con forma de ositos',
    image: 'https://images.unsplash.com/photo-1553451191-6d7232c0c2a0?w=300&h=300&fit=crop',
    stock: 30
  },
  {
    id: 4,
    name: 'Chocolate Snickers',
    price: 2.80,
    category: 'Chocolate',
    description: 'Chocolate con caramelo y maní',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop',
    stock: 45
  },
  {
    id: 5,
    name: 'Paletas Chupa Chups',
    price: 1.50,
    category: 'Paletas',
    description: 'Paletas de caramelo con diferentes sabores',
    image: 'https://images.unsplash.com/photo-1553451191-6d7232c0c2a0?w=300&h=300&fit=crop',
    stock: 60
  },
  {
    id: 6,
    name: 'Chocolate Twix',
    price: 2.90,
    category: 'Chocolate',
    description: 'Chocolate con galletas y caramelo',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop',
    stock: 40
  }
];

// Función para cargar productos desde localStorage
const loadProductsFromStorage = () => {
  try {
    const savedProducts = localStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : MOCK_PRODUCTS;
  } catch (error) {
    console.error('Error loading products from storage:', error);
    return MOCK_PRODUCTS;
  }
};

// Función para guardar productos en localStorage
const saveProductsToStorage = (products) => {
  try {
    localStorage.setItem('products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to storage:', error);
  }
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener productos (usando datos mock)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Cargar productos desde localStorage o usar datos mock
      const savedProducts = loadProductsFromStorage();
      setProducts(savedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Crear producto (simulado)
  const createProduct = async (productData) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newProduct = {
        ...productData,
        id: Date.now(), // ID único temporal
        image: productData.image || 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=300&h=300&fit=crop'
      };
      
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Actualizar producto (simulado)
  const updateProduct = async (id, productData) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProduct = { ...productData, id };
      const updatedProducts = products.map(product => 
        product.id === id ? updatedProduct : product
      );
      
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Eliminar producto (simulado)
  const deleteProduct = async (id) => {
    try {
      setError(null);
      
      // Simular delay de red
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      saveProductsToStorage(updatedProducts);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}; 