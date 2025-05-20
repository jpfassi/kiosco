import { useState, useEffect } from 'react';
import Producto from './Producto';
import '../styles/ProductosContainer.css';

const ProductosContainer = ({ funcionCarrito, usuarioLogeado }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch('https://682bd133d29df7a95be48528.mockapi.io/Productos')
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener productos');
                return res.json();
            })
            .then(data => {
                setProductos(data);
                setLoading(false);
            })
            .catch(err => {
                setError('No se pudieron cargar los productos. Intenta nuevamente.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="productos-container"><p>Cargando productos...</p></div>;
    }

    if (error) {
        return <div className="productos-container"><p style={{color: 'red'}}>{error}</p></div>;
    }

    return (
        <div className="productos-container">
            <div className="productos-grid">
                {productos.map(producto => (
                    <div key={producto.id} className="producto-item">
                        <Producto 
                            producto={{
                                id: producto.id,
                                nombre: producto.name,
                                imagen: producto.imagen,
                                precio: producto.price,
                                descripcion: producto.description || producto.desciption || '',
                                stock: producto.stock || 10 // Valor por defecto si no hay stock
                            }}
                            onAgregarAlCarrito={(cantidad) => funcionCarrito({
                                id: producto.id,
                                nombre: producto.name,
                                imagen: producto.imagen,
                                precio: producto.price,
                                descripcion: producto.description || producto.desciption || '',
                                stock: producto.stock || 10,
                                cantidad
                            })}
                            usuarioLogeado={usuarioLogeado}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosContainer;

