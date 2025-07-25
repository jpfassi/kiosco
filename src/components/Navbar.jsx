import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import styled from 'styled-components';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 9999;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    text-align: center;
  }
`;

// Parte 1: Nombre del Kiosco
const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: 800;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  justify-self: start;
  
  &:hover {
    transform: scale(1.05);
    text-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
  
  @media (max-width: 768px) {
    justify-self: center;
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

// Parte 2: Menú de Navegación
const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-self: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const NavLink = styled(Link)`
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 15px;
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
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

// Parte 3: Botones
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-self: end;
  
  @media (max-width: 768px) {
    justify-self: center;
    gap: 0.5rem;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  color: white;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 15px;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
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
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(78, 205, 196, 0.6);
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  border: 2px solid white;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-weight: 600;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const AuthButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.75rem 1.5rem;
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
  
  &.logout {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
    
    &:hover {
      box-shadow: 0 10px 30px rgba(255, 107, 107, 0.6);
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const LoginLink = styled(Link)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 15px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  position: relative;
  overflow: hidden;
  text-decoration: none;
  
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
    color: white;
    text-decoration: none;
    
    &::before {
      left: 100%;
    }
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const Navbar = () => {
  const { items } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Nav>
      <NavContainer>
        {/* Parte 1: Nombre del Kiosco */}
        <Logo to="/">🍬 Kiosco Dulce</Logo>
        
        {/* Parte 2: Menú de Navegación */}
        <NavLinks>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/products">Productos</NavLink>
        </NavLinks>
        
        {/* Parte 3: Botones */}
        <ButtonContainer>
          <CartButton to="/cart">
            <FaShoppingCart />
            Carrito
            {cartItemCount > 0 && <CartBadge>{cartItemCount}</CartBadge>}
          </CartButton>
          
          {isAuthenticated ? (
            <UserInfo>
              <span>👤 {user?.name || 'Usuario'}</span>
              <AuthButton className="logout" onClick={logout}>
                <FaSignOutAlt />
                Cerrar Sesión
              </AuthButton>
            </UserInfo>
          ) : (
            <LoginLink to="/login">
              <FaSignInAlt />
              Iniciar Sesión
            </LoginLink>
          )}
        </ButtonContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar; 