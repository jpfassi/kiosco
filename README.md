# Kiosco de Golosinas - Aplicación Web con React

## Descripción

Esta es una aplicación web desarrollada con React que simula la experiencia de un kiosco de golosinas online. Los usuarios pueden explorar productos, agregarlos a un carrito de compras, ajustar cantidades y proceder a una supuesta finalización de compra. La aplicación es responsiva y se adapta a diferentes tamaños de pantalla.

## Funcionalidades

*   Listado de productos disponibles obtenidos de una API externa.
*   Visualización de detalles de cada producto.
*   Funcionalidad de carrito de compras: agregar, eliminar, actualizar cantidad y vaciar carrito.
*   Manejo del estado del carrito utilizando hooks de React (`useState`).
*   Gestión de efectos secundarios (`useEffect`) para la obtención de datos de la API.
*   Navegación entre diferentes secciones de la aplicación (productos, carrito, detalles) utilizando `react-router-dom`.
*   Rutas dinámicas para los detalles de productos.
*   Rutas protegidas (ej. admin, carrito si requiere login).
*   Barra de navegación fija en la parte superior.
*   Diseño responsivo adaptado a dispositivos móviles y de escritorio.
*   Manejo básico de estados de carga y error al obtener datos de la API.

## Tecnologías Utilizadas

*   React
*   React Router DOM
*   HTML5
*   CSS3 (Estilos puros, sin frameworks como Bootstrap en las partes modificadas)
*   Fetch API para consumir datos.

## Instalación

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/jpfassi/kiosco.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd nombre-del-proyecto
    ```
3.  Instala las dependencias:
    ```bash
    npm install
    # o yarn install
    ```

## Uso

1.  Inicia la aplicación en modo desarrollo:
    ```bash
    npm start
    # o yarn start
    ```
2.  Abre tu navegador en `http://localhost:3000` (o el puerto que se indique).

## API

Los datos de los productos son obtenidos de la siguiente API mock:

[https://682bd133d29df7a95be48528.mockapi.io/Productos](https://682bd133d29df7a95be48528.mockapi.io/Productos)

## Demo en Vivo

Puedes ver una versión funcionando del proyecto aquí:\n
[https://timely-cranachan-39a87a.netlify.app/](https://timely-cranachan-39a87a.netlify.app/)

---

