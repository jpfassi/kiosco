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
      
      // Usar datos mock en lugar de API
      setProducts(MOCK_PRODUCTS);
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
      
      setProducts(prev => [...prev, newProduct]);
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
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
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
      
      setProducts(prev => prev.filter(product => product.id !== id));
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