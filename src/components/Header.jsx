import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/Header.css';

function Header() {  
    const { items } = useCart();
    const cantidadProductos = items.reduce((acc, producto) => acc + producto.quantity, 0);
    
    return ( 
        <header className="header-container">
            {/* Parte 1: Nombre del Kiosco */}
            <div className="header-brand">
                <Link to="/" className="brand-link">
                    <h1>Kiosco Express</h1>
                </Link>
            </div>
            
            {/* Parte 2: Menú de Navegación */}
            <nav className="header-nav">
                <NavLink to="/" className="nav-link">Inicio</NavLink>
                <NavLink to="/productos" className="nav-link">Productos</NavLink>
                <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
                <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
            </nav>
            
            {/* Parte 3: Botones */}
            <div className="header-buttons">
                <Link to="/carrito" className="header-button cart-button">
                    Carrito
                    {cantidadProductos > 0 && (
                        <span className="cart-badge">{cantidadProductos}</span>
                    )}
                </Link>
                <Link to="/login" className="header-button">Iniciar Sesión</Link>
            </div>
        </header>  
    );  
}  

export default Header;