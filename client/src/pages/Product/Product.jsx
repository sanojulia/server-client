import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { menProducts, womenProducts } from '../../mocks/products';
import styles from './Product.module.css'; 
import { useParams } from 'react-router-dom';
import ProductThumbnail from '../../components/ProductThumbnail/ProductThumbnail';
import ProductInfo from '../../components/ProductInfo/ProductInfo';

const Product = () => {
    const { id } = useParams(); // ← Получаем _id из URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/product/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Товар не найден');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>Ошибка: {error}</div>;
//   if (!product) return <div>Товар не найден</div>;

    // useEffect(() => {
    //     const allProducts = [...womenProducts, ...menProducts];
        
    //     const fetchedProduct = allProducts.find((product) => product.id === parseInt(_id, 10));
    //     setProduct(fetchedProduct);
    //     setLoading(false);
    // }, [_id]);

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }   

    return (
        <div className={styles.productPage}>
            <div className={styles.container}>
                <div className={styles.productGrid}>
                    <ProductThumbnail product={product} />
                    <ProductInfo product={product} />
                </div>
            </div>
        </div>
    );
};

export default Product;