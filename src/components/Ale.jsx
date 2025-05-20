import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/Productos.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import Card from "./Card"
import Carrito from "./Carrito"

function ProductosContainer1({functionCarrito} ){
    const { id } = useParams();
    const [productos, setProductos] = useState([])
    const [cantidad, setCantidad] = useState(1);
    //const [productosCarrito, setProductosCarrito] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    //const [total, setTotal] = useState(0)

    {useEffect(() =>{
        fetch('https://682bd133d29df7a95be48528.mockapi.io/Productos')
        .then((res) => res.json())
            .then((datos) => {
                console.log(datos)
                setProductos(datos)
                setCargando(false);
            })
            .catch((error) => {
                console.log("Error", error)
                setError('Hubo un error al cargar los productos.');
                setCargando(false);
            });
    }, []);}

    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{

        return(

            <div className="productos-container">
                 {productos.map((producto) => (
                     <Card
                        producto={producto}
                    />
                 ))}
            </div>

    // <div>
//     <Carrito
//         productosCarrito={productosCarrito}
//         total={total}
//     />
// </div>


        )
    }
}

export default ProductosContainer1