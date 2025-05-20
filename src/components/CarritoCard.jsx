import "../styles/Carrito.css"

function CarritoCard({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return(
        <div className="carrito-card" >
            <h3 className="carrito-producto" style={{color:"black"}}>{producto.name}</h3>
            {<p className="descripcion-carrito" style={{color:"black"}}>{producto.description}</p>}
            
            <span style={{color:"black"}}>{producto.cantidad}</span>
            <div className="carrito-unitario">
                <span style={{color:"black"}}>{producto.price} $</span>
            </div>
            <div className="carrito-sub">
                <span style={{color:"black"}}>{producto.cantidad * producto.price} $</span>
            </div>
            <button className="boton-carrito" onClick={borrarDelCarrito} style={{backgroundColor: "red" ,color:"black"}}>X</button>
        </div>
    )
}

export default CarritoCard