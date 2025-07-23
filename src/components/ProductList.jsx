import { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import ProductForm from './ProductForm';
import styled from 'styled-components';
import { FaShoppingCart, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.02);
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 4rem;
  color: white;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 107, 0.3);
  border-radius: 20px;
  margin: 2rem 0;
  box-shadow: 0 8px 32px rgba(255, 107, 107, 0.2);
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const ProductName = styled.h3`
  margin: 0 0 1rem 0;
  color: white;
  font-size: 1.4rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ProductDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #4ecdc4;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ProductCategory = styled.span`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &.primary {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(78, 205, 196, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  &.secondary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  &.danger {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const ProductList = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    let filtered = products;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtrar por categoría (ahora es exacto en lugar de includes)
    if (searchCategory) {
      filtered = filtered.filter(product =>
        product.category === searchCategory
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  }, [products, searchTerm, searchCategory]);

  const handleSearch = (term, category) => {
    setSearchTerm(term);
    setSearchCategory(category);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchCategory('');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // Calcular productos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <h2>Cargando productos...</h2>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <h2>Error al cargar los productos</h2>
          <p>{error}</p>
        </ErrorContainer>
      </Container>
    );
  }

  if (showForm) {
    return (
      <ProductForm
        product={editingProduct}
        onCancel={handleFormCancel}
        onSuccess={handleFormSuccess}
      />
    );
  }

  return (
    <Container>
      <Header>
        <Title>Productos</Title>
        {isAuthenticated && (
          <AddButton onClick={() => setShowForm(true)}>
            <FaPlus />
            Agregar Producto
          </AddButton>
        )}
      </Header>

      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />

      {currentProducts.length === 0 ? (
        <NoProducts>
          <h3>No se encontraron productos</h3>
          <p>
            {searchTerm || searchCategory
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'No hay productos disponibles'}
          </p>
        </NoProducts>
      ) : (
        <>
          <ProductsGrid>
            {currentProducts.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} alt={product.name} />
                <ProductInfo>
                  <ProductName>{product.name}</ProductName>
                  <ProductCategory>{product.category}</ProductCategory>
                  <ProductDescription>
                    {product.description && product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description || 'Sin descripción'}
                  </ProductDescription>
                  <ProductPrice>${product.price}</ProductPrice>
                  
                  <ButtonGroup>
                    <Button
                      className="primary"
                      onClick={() => addToCart(product)}
                    >
                      <FaShoppingCart />
                      Agregar
                    </Button>
                    
                    {isAuthenticated && (
                      <>
                        <Button
                          className="secondary"
                          onClick={() => handleEdit(product)}
                        >
                          <FaEdit />
                          Editar
                        </Button>
                        
                        <Button
                          className="danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          <FaTrash />
                          Eliminar
                        </Button>
                      </>
                    )}
                  </ButtonGroup>
                </ProductInfo>
              </ProductCard>
            ))}
          </ProductsGrid>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ProductList; 