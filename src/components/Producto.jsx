import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Producto.css';
import { dispararSweetBasico } from "../assets/SweetAlert"; // Asegúrate de que esta importación sea correcta

const Producto = ({ producto, onAgregarAlCarrito, usuarioLogeado }) => {
    const [cantidad, setCantidad] = useState(1);
    const navigate = useNavigate();

    const sumarCantidad = () => {
        if (cantidad < producto.stock) {
            setCantidad(cantidad + 1);
        }
    };

    const restarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleAgregarAlCarrito = () => {
        if (!usuarioLogeado) {
            dispararSweetBasico("Necesitas iniciar sesión", "Por favor, inicia sesión para agregar productos al carrito", "warning", "Entendido");
            navigate('/login');
            return;
        }
        onAgregarAlCarrito(cantidad);
        dispararSweetBasico("Producto Agregado", "El producto fue agregado al carrito con éxito", "success", "Cerrar");
        setCantidad(1); // Resetear la cantidad después de agregar
    };

    return (
        <div className="producto-card">
            <img 
                src={producto.imagen} 
                className="producto-imagen" 
                alt={`Imagen de ${producto.nombre}`} 
                title={producto.nombre}
            />
            <div className="producto-info">
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-detalles">
                    <span className="producto-precio">${producto.precio}</span>
                    <span className="producto-categoria">{producto.categoria}</span>
                    <span className="producto-stock">Stock: {producto.stock}</span>
                </p>
                <div className="producto-cantidad">
                    <button onClick={restarCantidad} className="cantidad-boton">-</button>
                    <span className="cantidad-numero">{cantidad}</span>
                    <button onClick={sumarCantidad} className="cantidad-boton">+</button>
                </div>
                <div className="producto-botones">
                    <Link to={`/productos/${producto.id}`} className="producto-boton">
                        Ver Detalles
                    </Link>
                    <button onClick={handleAgregarAlCarrito} className="producto-boton-agregar">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Producto; 