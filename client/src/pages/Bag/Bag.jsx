import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Bag.module.css';

const Bag = () => {
  const [items, setItems] = React.useState([
    {
      id: 1,
      name: 'Oversized T-Shirt',
      brand: 'JUSA Eco',
      color: 'Black',
      size: 'L',
      price: 29.99,
      quantity: 1,
      image: '/images/products/women/1.jpg'
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      brand: 'JUSA Pro',
      color: 'Blue',
      size: '32/32',
      price: 49.99,
      quantity: 1,
      image: '/images/products/men/2.jpg'
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  return (
    <div className={styles.bagPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>SHOPPING BAG</h1>
        
        <div className={styles.content}>
          <div className={styles.itemsList}>
            {items.length > 0 ? (
              items.map(item => (
                <div key={item.id} className={styles.item}>
                  <div className={styles.itemImage}>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className={styles.itemDetails}>
                    <div className={styles.itemInfo}>
                      <h3>{item.name}</h3>
                      <p className={styles.brand}>{item.brand}</p>
                      <p className={styles.color}>Color: {item.color}</p>
                      <p className={styles.size}>Size: {item.size}</p>
                      <p className={styles.price}>€{item.price.toFixed(2)}</p>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.quantity}>
                        <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className={styles.removeButton}
                      >
                        <i className="fas fa-times"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyBag}>
                <i className="fas fa-shopping-bag"></i>
                <h2>Your bag is empty</h2>
                <p>Find something you love from our collection</p>
                <Link to="/" className={styles.shopButton}>
                  CONTINUE SHOPPING
                </Link>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className={styles.summary}>
              <h2>TOTAL</h2>
              <div className={styles.summaryDetails}>
                <div className={styles.summaryRow}>
                  <span>Sub-total</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : `€${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className={styles.freeShipping}>
                    Add €{(50 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}
                <div className={`${styles.summaryRow} ${styles.total}`}>
                  <span>Total</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <button className={styles.checkoutButton}>
                  CHECKOUT
                </button>
                <div className={styles.paymentMethods}>
                  <p>WE ACCEPT:</p>
                  <div className={styles.paymentIcons}>
                    <i className="fab fa-cc-visa"></i>
                    <i className="fab fa-cc-mastercard"></i>
                    <i className="fab fa-cc-amex"></i>
                    <i className="fab fa-cc-paypal"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bag;
