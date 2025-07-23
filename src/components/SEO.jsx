import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const defaultTitle = 'Kiosco de Golosinas - Tu tienda de dulces online';
  const defaultDescription = 'Descubre la mejor selección de golosinas y dulces. Envío gratis en compras superiores a $50. ¡Compra ahora!';
  const defaultKeywords = 'golosinas, dulces, caramelos, chocolates, kiosco, tienda online';
  const defaultImage = '/og-image.jpg';
  const defaultUrl = window.location.href;

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url || defaultUrl} />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta property="twitter:description" content={description || defaultDescription} />
      <meta property="twitter:image" content={image || defaultImage} />

      {/* Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url || defaultUrl} />
    </Helmet>
  );
};

export default SEO; 