import React, { useState, useEffect } from 'react';
import styles from './NewColletion.module.css'
import ProductCard from '../../components/ProductCard/ProductCard';
import { menProducts, womenProducts } from '../../mocks/products';


const NewColletion = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchedProducts = [...womenProducts.filter(product => product.isNewColletion), ...menProducts.filter(product => product.isNewColletion)];
    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
    setLoading(false);
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = changeFiltering(filters, filtered);
        setFilteredProducts(filtered);
    };

    const handleSortChange = (sortBy) => {
        const sorted = changeSorting(sortBy, filteredProducts);
        setFilteredProducts(sorted);
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2>New Colletion</h2>
        </div>

        <div className={styles.productGrid}>
          {filteredProducts.map(product => (
            <ProductCard key={`${product.id}+${product.name}`} product={product} />
          ))}
        </div>
            
    </div>
  )
};

export default NewColletion;