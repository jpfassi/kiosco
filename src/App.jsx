import { useState } from 'react'
import './App.css'
import Home from './layouts/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import ProductosContainer from './components/ProductosContainer';
import Carrito from './components/Carrito';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login from './components/Login';
import ProductosContainer1 from './components/Ale';

function App() {
  const [productosCarrito, setProductosCarrito] = useState([])
  const [usuarioLogeado, setUsuarioLogeado] = useState(false)
  const [adminLogeado, setAdminLogeado] = useState(false)

  function funcionCarrito(producto){
    const existe = productosCarrito.find(p => p.id === producto.id);
    console.log(existe)
    if (existe) {
        const carritoActualizado = productosCarrito.map((p) => {
            if (p.id === producto.id){
                const productoActualizado = {...p, cantidad: p.cantidad + producto.cantidad}
                return productoActualizado
            }else{
                return p
            }
        })
        setProductosCarrito(carritoActualizado)
    }else{
        // Si no existe, lo agregamos con su cantidad
        const nuevoCarrito = [...productosCarrito, producto];
        setProductosCarrito(nuevoCarrito)
    }

  }

  function actualizarCantidad(id, nuevaCantidad) {
    const carritoActualizado = productosCarrito.map((p) => {
        if (p.id === id) {
            return { ...p, cantidad: nuevaCantidad };
        }
        return p;
    });
    setProductosCarrito(carritoActualizado);
  }

  function borrarProductoCarrito(id){
    console.log(id)
    const nuevoCarrito = productosCarrito.filter((p) => p.id !== id);
    setProductosCarrito(nuevoCarrito);
  }

  function manejarAdmin() {
    setAdminLogeado(!adminLogeado)
  }

  function manejarUser(){
    setUsuarioLogeado(!usuarioLogeado)
  }

  const handleVaciarCarrito = () => {
    setProductosCarrito([]);
  };

  return (
    <Router>
      <div>
        <Nav productosCarrito={productosCarrito}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login user={usuarioLogeado} admin={adminLogeado} setLogeadoAdmin={manejarAdmin} setLogeadoUser={manejarUser}/>}/>
          <Route path="/productos" element={<ProductosContainer funcionCarrito={funcionCarrito} usuarioLogeado={usuarioLogeado} />} />
          <Route path="/carrito" element={
            <Carrito 
              productosCarrito={productosCarrito} 
              funcionBorrar={borrarProductoCarrito} 
              usuarioLogeado={usuarioLogeado}
              funcionActualizarCantidad={actualizarCantidad}
              onVaciarCarrito={handleVaciarCarrito}
            />
          }/>      
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contacto/>} />
          <Route path="/productos/:id" element={<ProductoDetalle funcionCarrito={funcionCarrito} />} />
          <Route path='/admin' element={adminLogeado ? <Admin/> : <Navigate to={"/login"} replace/>} />
        
        </Routes>
      </div>
    </Router>
  )
}

export default App;