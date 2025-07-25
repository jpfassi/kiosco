# Kiosco de Golosinas - Aplicación Web con React

## Descripción

Esta es una aplicación web desarrollada con React que simula la experiencia de un kiosco de golosinas online. Los usuarios pueden explorar productos, agregarlos a un carrito de compras, ajustar cantidades y proceder a una supuesta finalización de compra. La aplicación es responsiva y se adapta a diferentes tamaños de pantalla.

## Funcionalidades Implementadas

### ✅ Requerimiento #1: Gestión del Carrito y Autenticación de Usuarios

- **Carrito de Compras con Context API**
  - Implementado `CartContext` que gestiona los productos agregados
  - Permite agregar, eliminar, actualizar cantidad y vaciar el carrito
  - Mantiene el estado global con Context API
  - Cálculo automático de totales

- **Autenticación de Usuarios**
  - Implementado `AuthContext` para manejar el estado de autenticación
  - Login simulado con localStorage
  - Rutas protegidas para el carrito y secciones administrativas
  - Sistema de logout funcional

### ✅ Requerimiento #2: CRUD de Productos con MockAPI

- **Formulario para Agregar Productos**
  - Formulario controlado con useState
  - Validación completa de campos:
    - Nombre obligatorio
    - Precio mayor a 0
    - Descripción mínima de 10 caracteres
    - URL de imagen obligatoria
    - Categoría obligatoria
  - Envío de datos a MockAPI mediante POST

- **Edición y Eliminación de Productos**
  - Edición de productos utilizando MockAPI y Context API
  - Mensajes de error y confirmaciones al usuario
  - Modal de confirmación antes de eliminar productos
  - Formulario reutilizable para crear/editar

- **Manejo de Errores**
  - Estados de carga y error al obtener productos
  - Mensajes de error en pantalla
  - Manejo de errores de red

### ✅ Requerimiento #3: Optimización de Diseño y Responsividad

- **Diseño Responsivo con Bootstrap y Styled-components**
  - Sistema de grillas de Bootstrap implementado
  - Styled-components para estilos modulares y personalizados
  - Diseño completamente responsivo

- **Interactividad Mejorada con React Icons y React Toastify**
  - Iconos en botones y elementos interactivos con React Icons
  - React Toastify para notificaciones de éxito y error
  - Feedback visual mejorado

- **SEO y Accesibilidad con React Helmet**
  - Modificación de `<title>` y `<meta>` con React Helmet
  - Etiquetas ARIA para accesibilidad
  - Meta tags para redes sociales

### ✅ Requerimiento #4: Funcionalidades de Búsqueda y Paginación

- **Barra de Búsqueda**
  - Búsqueda por nombre y descripción de productos
  - Filtrado por categoría
  - Búsqueda en tiempo real
  - Botón para limpiar filtros

- **Paginador de Productos**
  - Paginación completa con navegación
  - 6 productos por página
  - Información de productos mostrados
  - Navegación intuitiva

### ✅ Requerimiento #5: Preparación para el Despliegue

- **Pruebas de Compatibilidad**
  - Verificado funcionamiento en móviles, tablets y escritorio
  - Diseño responsivo optimizado
  - Experiencia de usuario mejorada

- **Optimización del Código**
  - Código limpio y bien estructurado
  - Estado global bien gestionado con Context API
  - Componentes reutilizables

- **Documentación Básica**
  - README completo con instrucciones
  - Comentarios en el código
  - Estructura clara del proyecto

## Tecnologías Utilizadas

- **Frontend**: React 18.2.0
- **Routing**: React Router DOM 6.22.3
- **Estilos**: Styled-components 6.1.8, Bootstrap 5.3.3
- **Iconos**: React Icons 5.0.1
- **Notificaciones**: React Toastify 10.0.4
- **SEO**: React Helmet Async 2.0.4
- **Estado Global**: Context API (React)
- **API**: MockAPI (https://682bd133d29df7a95be48528.mockapi.io/Productos)

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/jpfassi/kiosco.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd e-commerce-1.2
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

1. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador en `http://localhost:5173` (o el puerto que se indique).

## Credenciales de Prueba

Para acceder a las funcionalidades administrativas:
- **Email**: admin@test.com
- **Contraseña**: 123456

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Cart.jsx        # Carrito de compras
│   ├── Login.jsx       # Formulario de login
│   ├── Navbar.jsx      # Navegación principal
│   ├── Pagination.jsx  # Componente de paginación
│   ├── ProductForm.jsx # Formulario de productos
│   ├── ProductList.jsx # Lista de productos
│   ├── SearchBar.jsx   # Barra de búsqueda
│   └── SEO.jsx         # Componente SEO
├── contexts/           # Contextos de React
│   ├── AuthContext.jsx # Contexto de autenticación
│   ├── CartContext.jsx # Contexto del carrito
│   └── ProductContext.jsx # Contexto de productos
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada
```

## API

Los datos de los productos son obtenidos de la siguiente API mock:
[https://682bd133d29df7a95be48528.mockapi.io/Productos](https://682bd133d29df7a95be48528.mockapi.io/Productos)

## Demo en Vivo

Puedes ver una versión funcionando del proyecto aquí:
[https://netlify.app/](https://sparkly-biscuit-7845a0.netlify.app/)

## Características Destacadas

- 🔐 **Autenticación completa** con localStorage
- 🛒 **Carrito de compras funcional** con Context API
- 🔍 **Búsqueda y filtrado** en tiempo real
- 📱 **Diseño completamente responsivo**
- ⚡ **Paginación optimizada** para mejor rendimiento
- 🎨 **UI moderna** con styled-components y Bootstrap
- 🔔 **Notificaciones** con React Toastify
- 📊 **SEO optimizado** con React Helmet
- 🛠️ **CRUD completo** de productos
- 🎯 **Accesibilidad** mejorada

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ para el curso de React

