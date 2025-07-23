import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
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

const BackButton = styled.button`
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
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 4rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const CartItems = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    background: rgba(255, 255, 255, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ItemInfo = styled.div`
  flex: 1;
  color: white;
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #4ecdc4;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background: linear-gradient(45deg, #4ecdc4, #44a08d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
`;

const QuantityButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const Quantity = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
  }
`;

const CartSummary = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
  font-size: 1.1rem;
  
  &:last-child {
    margin-bottom: 0;
    font-size: 1.5rem;
    font-weight: 700;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 1rem;
    color: #4ecdc4;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 1rem 2rem;
  border: none;
  border-radius: 15px;
  font-size: 1rem;
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
    box-shadow: 0 8px 25px rgba(78, 205, 196, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(78, 205, 196, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  &.secondary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
  
  &.danger {
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6);
      
      &::before {
        left: 100%;
      }
    }
  }
`;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <Container>
        <Header>
          <Title>🛒 Carrito de Compras</Title>
          <BackButton onClick={() => navigate('/products')}>
            <FaArrowLeft />
            Volver a Productos
          </BackButton>
        </Header>
        
        <EmptyCart>
          <h2>Tu carrito está vacío</h2>
          <p>¡Agrega algunos productos deliciosos para comenzar!</p>
          <ActionButton className="primary" onClick={() => navigate('/products')}>
            <FaShoppingCart />
            Ver Productos
          </ActionButton>
        </EmptyCart>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>🛒 Carrito de Compras</Title>
        <BackButton onClick={() => navigate('/products')}>
          <FaArrowLeft />
          Volver a Productos
        </BackButton>
      </Header>

      <CartItems>
        {cartItems.map((item) => (
          <CartItem key={item.id}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemInfo>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>${item.price}</ItemPrice>
            </ItemInfo>
            
            <QuantityControls>
              <QuantityButton
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <FaMinus />
              </QuantityButton>
              <Quantity>{item.quantity}</Quantity>
              <QuantityButton
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <FaPlus />
              </QuantityButton>
            </QuantityControls>
            
            <RemoveButton onClick={() => removeFromCart(item.id)}>
              <FaTrash />
              Eliminar
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>

      <CartSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>${getTotal().toFixed(2)}</span>
        </SummaryRow>
        <SummaryRow>
          <span>Total:</span>
          <span>${getTotal().toFixed(2)}</span>
        </SummaryRow>
      </CartSummary>

      <ActionButtons>
        <ActionButton className="secondary" onClick={() => navigate('/products')}>
          <FaShoppingCart />
          Seguir Comprando
        </ActionButton>
        <ActionButton className="danger" onClick={clearCart}>
          <FaTrash />
          Vaciar Carrito
        </ActionButton>
        <ActionButton className="primary">
          <FaShoppingCart />
          Finalizar Compra
        </ActionButton>
      </ActionButtons>
    </Container>
  );
};

export default Cart; 