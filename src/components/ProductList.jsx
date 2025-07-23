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
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
`;

const AddButton = styled.button`
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #218838;
  }
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  margin: 2rem 0;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
`;

const ProductDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 1rem;
`;

const ProductCategory = styled.span`
  background: #e9ecef;
  color: #495057;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  display: inline-block;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  transition: background-color 0.2s;
  
  &.primary {
    background: #007bff;
    color: white;
    
    &:hover {
      background: #0056b3;
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
  
  &.danger {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
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
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (searchCategory) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase().includes(searchCategory.toLowerCase())
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
                    {product.description.length > 100
                      ? `${product.description.substring(0, 100)}...`
                      : product.description}
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