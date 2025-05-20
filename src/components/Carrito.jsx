import "../styles/Carrito.css"
import { useEffect, useState } from "react";
import CarritoCard from "./CarritoCard.jsx";
import { Navigate, Link } from "react-router-dom";

export default function Carrito({productosCarrito, funcionBorrar, usuarioLogeado, funcionActualizarCantidad, onVaciarCarrito}) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = productosCarrito.reduce((acc, producto) => {
            return acc + (producto.precio * producto.cantidad);
        }, 0);
        setTotal(nuevoTotal);
    }, [productosCarrito]);

    const actualizarCantidad = (id, nuevaCantidad) => {
        if (nuevaCantidad > 0) {
            funcionActualizarCantidad(id, nuevaCantidad);
        }
    };

    console.log("Productos: " + productosCarrito)

    function funcionDisparadora(id){
        funcionBorrar(id)
    }

    console.log("Total: " + total)

    if(!usuarioLogeado){
        return(
            <Navigate to="/login" replace/>
        )
    }

    if (productosCarrito.length === 0) {
        return (
            <div className="carrito-container">
                <h2>Carrito de Compras</h2>
                <p>No hay productos en el carrito</p>
                <Link to="/productos" className="carrito-boton-seguir">
                    Seguir Comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="carrito-container">
            <h2>Carrito de Compras</h2>
            <div className="carrito-tabla">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosCarrito.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/productos/${item.id}`} className="carrito-producto-link">
                                        <div className="carrito-producto">
                                            <img src={item.imagen} alt={item.nombre} />
                                            <span>{item.nombre}</span>
                                        </div>
                                    </Link>
                                </td>
                                <td>${item.precio}</td>
                                <td>
                                    <div className="carrito-cantidad">
                                        <button 
                                            onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                                            className="carrito-cantidad-boton"
                                            disabled={item.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="carrito-cantidad-numero">
                                            {item.cantidad}
                                        </span>
                                        <button 
                                            onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                                            className="carrito-cantidad-boton"
                                            disabled={item.cantidad >= item.stock}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>${item.precio * item.cantidad}</td>
                                <td>
                                    <button
                                        className="carrito-boton-eliminar"
                                        onClick={() => funcionDisparadora(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="carrito-total">Total:</td>
                            <td className="carrito-total-valor">${total}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="carrito-botones">
                <button 
                    onClick={onVaciarCarrito}
                    className="carrito-boton-vaciar"
                >
                    Vaciar Carrito
                </button>
                <Link to="/productos" className="carrito-boton-seguir">
                    Seguir Comprando
                </Link>
                <button className="carrito-boton-finalizar">Finalizar Compra</button>
            </div>
        </div>
    )
}