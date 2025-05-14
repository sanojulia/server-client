import React, { useState } from 'react'
import styles from './ItemsCheckout.module.css'
import { Link } from 'react-router-dom';

const ItemsCheckout = () => {
      const [items, setItems] = useState([
        {
          id: 1,
          name: 'Elegant Blouse',
          brand: 'JUSA Pro',
          color: 'Beige',
          size: 'L',
          price: 89.99,
          quantity: 1,
          image: '/public/images/women/d1-1.jpg'
        },
        {
          id: 2,
          name: 'Classic Cashmere Sweater',
          brand: 'JUSA Pro',
          color: 'Blue',
          size: 'S',
          price: 89.99,
          quantity: 1,
          image: '/public/images/men/j1-1.jpg'
        }
      ]);

    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;
  return (
    <div>
        <div className={styles.itemsList}>
            <div className={styles.totalQtyItems}>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)} ITEMS</span>
                <span><Link to="/bag" className={styles.linkEdit}>EDIT</Link></span>
            </div>

            {items.map(item => (
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
                        <p className={styles.quantity}>Qty: {item.quantity}</p>
                    </div>
                    <div className={styles.itemActions}>
                    </div>
                    </div>
                </div>
            ))}
        </div>
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
            </div>
        </div>
    </div>
)
};

export default ItemsCheckout;