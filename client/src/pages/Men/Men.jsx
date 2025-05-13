import React, { useState, useEffect } from 'react';
import styles from './Men.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilters from '../../components/ProductFilters/ProductFilters';
// import { menProducts } from '../../mocks/products';
import { changeFiltering } from '../../utils/changeFiltering';
import { changeSorting } from '../../utils/changeSorting';
import { useNavigate } from 'react-router-dom';

const Men = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchedProducts = menProducts;    
  //   setProducts(fetchedProducts);
  //   setFilteredProducts(fetchedProducts);
  //   setLoading(false);
  // }, []);

  // const handleFilterChange = (filters) => {
  //   let filtered = changeFiltering(filters, products);
  //   setFilteredProducts(filtered);
  // };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/men/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);
  const handleSortChange = (sortBy) => {
    const sorted = changeSorting(sortBy, filteredProducts);
    setFilteredProducts(sorted);
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.menPage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Men's Clothing & Accessories</h1>
          <p>{filteredProducts.length} styles found</p>
        </header>

        <ProductFilters 
          // onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />

        <div className={styles.productGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} onClick={() => handleProductClick(product._id)}>
              <ProductCard key={product.id} product={product} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className={styles.noResults}>
            <h2>No products found</h2>
            <p>Try adjusting your filters or browse our full collection</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Men;
