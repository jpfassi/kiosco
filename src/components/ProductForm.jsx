import { useState, useEffect } from 'react';
import { useProducts } from '../contexts/ProductContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaSave, FaTimes, FaArrowLeft, FaHome } from 'react-icons/fa';

const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const NavigationBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const NavButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
  }
  
  &.home {
    background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
    box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
    
    &:hover {
      box-shadow: 0 10px 30px rgba(78, 205, 196, 0.6);
    }
  }
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  &.error {
    border-color: #dc3545;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &.primary {
    background: #007bff;
    color: white;
    
    &:hover {
      background: #0056b3;
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const ProductForm = ({ product = null, onCancel, onSuccess }) => {
  const { createProduct, updateProduct, products } = useProducts();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('id');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Determinar si estamos editando o creando
  const isEditing = productId && productId !== 'new';
  const currentProduct = isEditing ? products.find(p => p.id === parseInt(productId)) : null;

  useEffect(() => {
    if (currentProduct) {
      setFormData({
        name: currentProduct.name || '',
        price: currentProduct.price || '',
        description: currentProduct.description || '',
        image: currentProduct.image || '',
        category: currentProduct.category || '',
      });
    }
  }, [currentProduct]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'La URL de la imagen es obligatoria';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
      };

      if (currentProduct) {
        await updateProduct(currentProduct.id, productData);
        setSuccessMessage('Producto actualizado exitosamente');
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      } else {
        await createProduct(productData);
        setSuccessMessage('Producto creado exitosamente');
        setFormData({
          name: '',
          price: '',
          description: '',
          image: '',
          category: '',
        });
        setTimeout(() => {
          navigate('/products');
        }, 1500);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <NavigationBar>
        <NavButton onClick={() => navigate('/products')} className="home">
          <FaHome /> Inicio
        </NavButton>
        <NavButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </NavButton>
      </NavigationBar>
      <Form onSubmit={handleSubmit}>
        <Title>{currentProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Title>
        
        <FormGroup>
          <Label htmlFor="name">Nombre del Producto *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Precio *</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            className={errors.price ? 'error' : ''}
          />
          {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Descripción *</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            placeholder="Describe el producto (mínimo 10 caracteres)"
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">URL de la Imagen *</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={errors.image ? 'error' : ''}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Categoría *</Label>
          <Input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={errors.category ? 'error' : ''}
          />
          {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        </FormGroup>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <ButtonGroup>
          <Button
            type="submit"
            className="primary"
            disabled={isSubmitting}
          >
            <FaSave />
            {isSubmitting ? 'Guardando...' : (currentProduct ? 'Actualizar' : 'Crear')}
          </Button>
          
          <Button
            type="button"
            className="secondary"
            onClick={() => navigate('/products')}
          >
            <FaTimes />
            Cancelar
          </Button>
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default ProductForm; 