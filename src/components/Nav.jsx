import { NavLink, Link } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = ({ productosCarrito }) => {
    const cantidadProductos = productosCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    return (
        <nav className="nav-container">
            <div className="nav-content">
                <Link to="/" className="nav-brand">Kiosco Express</Link>
                <div className="nav-links">
                    <NavLink to="/" className="nav-link">Inicio</NavLink>
                    <NavLink to="/productos" className="nav-link">Productos</NavLink>
                    <NavLink to="/nosotros" className="nav-link">Nosotros</NavLink>
                    <NavLink to="/contacto" className="nav-link">Contacto</NavLink>
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