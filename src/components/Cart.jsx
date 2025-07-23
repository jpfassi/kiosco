import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

const CartContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: white;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const ItemName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
`;

const ItemPrice = styled.p`
  margin: 0;
  color: #007bff;
  font-weight: bold;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const QuantityButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background: #c82333;
  }
  
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const CartSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 2rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.3rem;
  font-weight: bold;
  border-top: 2px solid #ddd;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #218838;
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ClearCartButton = styled.button`
  width: 100%;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background: #5a6268;
  }
`;

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (items.length === 0) {
    return (
      <CartContainer>
        <Title>Carrito de Compras</Title>
        <EmptyCart>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega algunos productos para comenzar a comprar</p>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Title>Carrito de Compras</Title>
      
      {items.map((item) => (
        <CartItem key={item.id}>
          <ItemImage src={item.image} alt={item.name} />
          
          <ItemDetails>
            <ItemName>{item.name}</ItemName>
            <ItemPrice>${item.price}</ItemPrice>
          </ItemDetails>
          
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
          </RemoveButton>
        </CartItem>
      ))}
      
      <CartSummary>
        <SummaryRow>
          <span>Subtotal:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </SummaryRow>
        
        <SummaryRow>
          <span>Envío:</span>
          <span>Gratis</span>
        </SummaryRow>
        
        <TotalRow>
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </TotalRow>
        
        <CheckoutButton>
          Proceder al Pago
        </CheckoutButton>
        
        <ClearCartButton onClick={clearCart}>
          Vaciar Carrito
        </ClearCartButton>
      </CartSummary>
    </CartContainer>
  );
};

export default Cart; 