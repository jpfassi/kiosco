// Función para exportar productos del localStorage al archivo JSON
export const exportProductsToFile = () => {
  try {
    const products = localStorage.getItem('products');
    if (products) {
      const productsData = JSON.parse(products);
      
      // Crear el contenido del archivo JSON
      const jsonContent = JSON.stringify(productsData, null, 2);
      
      // Crear un blob y descargar el archivo
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'products.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      console.log('Productos exportados exitosamente');
      return true;
    } else {
      console.log('No hay productos en localStorage para exportar');
      return false;
    }
  } catch (error) {
    console.error('Error al exportar productos:', error);
    return false;
  }
};

// Función para importar productos desde un archivo JSON
export const importProductsFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const products = JSON.parse(e.target.result);
        localStorage.setItem('products', JSON.stringify(products));
        console.log('Productos importados exitosamente');
        resolve(products);
      } catch (error) {
        console.error('Error al importar productos:', error);
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}; 