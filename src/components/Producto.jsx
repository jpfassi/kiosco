import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Producto.css';

const Producto = ({ producto, onAgregarAlCarrito }) => {
    const [cantidad, setCantidad] = useState(1);

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
        onAgregarAlCarrito(cantidad);
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