import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const SearchButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ClearButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #5a6268;
  }
`;

const SearchBar = ({ onSearch, onClear }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    // Búsqueda automática mientras el usuario escribe
    const timeoutId = setTimeout(() => {
      if (searchTerm || searchCategory) {
        onSearch(searchTerm, searchCategory);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchCategory, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, searchCategory);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchCategory('');
    onClear();
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <SearchInput
          type="text"
          placeholder="Filtrar por categoría..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        />
        
        <SearchButton type="submit">
          <FaSearch />
          Buscar
        </SearchButton>
        
        {(searchTerm || searchCategory) && (
          <ClearButton type="button" onClick={handleClear}>
            Limpiar
          </ClearButton>
        )}
      </SearchForm>
    </SearchContainer>
  );
};

export default SearchBar; 