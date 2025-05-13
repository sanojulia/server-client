import React, { useState, useEffect } from 'react';
import styles from './Sale.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductFilters from '../../components/ProductFilters/ProductFilters';
import { menProducts, womenProducts } from '../../mocks/products';
import { changeFiltering } from '../../utils/changeFiltering';
import { useNavigate } from 'react-router-dom';
import { changeSorting } from '../../utils/changeSorting';


const Sale = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

    useEffect(() => {
      const loadProducts = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/sale/`);
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

  // useEffect(() => {
  //   const fetchedProducts = [...womenProducts.filter(product => product.isSale), ...menProducts.filter(product => product.isSale)];
  
  //   setProducts(fetchedProducts);
  //   setFilteredProducts(fetchedProducts);
  //   setLoading(false);
  // }, []);

    const handleFilterChange = (filters) => {
      let filtered = changeFiltering(filters, products);
      setFilteredProducts(filtered);
    };

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
    <div className={styles.salePage}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>Sale</h1>
          <p>Save up to 30% on {filteredProducts.length} styles</p>
        </header>

        <ProductFilters 
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          defaultSort="discount"
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

export default Sale;