import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchContainer = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1.5rem;
  align-items: flex-end;
  flex-wrap: wrap;
`;

const SearchGroup = styled.div`
  flex: 1;
  min-width: 250px;
  position: relative;
`;

const SearchLabel = styled.label`
  display: block;
  color: white;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const CategorySelect = styled.select`
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  option {
    background: #2c3e50;
    color: white;
    padding: 0.5rem;
  }
  
  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchButton = styled.button`
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
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
  box-shadow: 0 6px 20px rgba(78, 205, 196, 0.4);
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
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(78, 205, 196, 0.6);
    
    &::before {
      left: 100%;
    }
  }
`;

const ClearButton = styled.button`
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
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
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
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.6);
    
    &::before {
      left: 100%;
    }
  }
`;

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Categorías disponibles
  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'Chocolate', label: 'Chocolate' },
    { value: 'Caramelos', label: 'Caramelos' },
    { value: 'Gomitas', label: 'Gomitas' },
    { value: 'Paletas', label: 'Paletas' }
  ];

  // Debounce para el término de búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Efecto para ejecutar la búsqueda cuando cambien los filtros
  useEffect(() => {
    onSearch(debouncedTerm, selectedCategory);
  }, [debouncedTerm, selectedCategory, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    setSelectedCategory('');
    onClear();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, selectedCategory);
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchGroup>
          <SearchLabel>Buscar productos:</SearchLabel>
          <SearchInput
            type="text"
            placeholder="Buscar por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchGroup>

        <SearchGroup>
          <SearchLabel>Filtrar por categoría:</SearchLabel>
          <CategorySelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </CategorySelect>
        </SearchGroup>

        <ButtonGroup>
          <SearchButton type="submit">
            <FaSearch />
            Buscar
          </SearchButton>
          <ClearButton type="button" onClick={handleClear}>
            <FaTimes />
            Limpiar
          </ClearButton>
        </ButtonGroup>
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar; 