import { Link } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = ({ productosCarrito }) => {
    const cantidadProductos = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    return (
        <nav className="nav-container">
            <div className="nav-content">
                <Link to="/" className="nav-brand">Kiosco Express</Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    <Link to="/productos" className="nav-link">Productos</Link>
                    <Link to="/nosotros" className="nav-link">Nosotros</Link>
                    <Link to="/contacto" className="nav-link">Contacto</Link>
                </div>
                <div className="nav-buttons">
                    <Link to="/carrito" className="nav-button">
                        Carrito
                        {cantidadProductos > 0 && (
                            <span className="cart-badge">{cantidadProductos}</span>
                        )}
                    </Link>
                    <Link to="/login" className="nav-button">Iniciar Sesión</Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav; 