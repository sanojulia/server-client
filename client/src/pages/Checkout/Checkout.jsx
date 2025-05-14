import React from 'react'
import styles from './Checkout.module.css'
import ItemsCheckout from '../../components/ItemsCheckout/ItemsCheckout';
import AddressForm from '../../components/AddressForm/AddressForm';
import PaymentDetails from '../../components/PaymentDetails/PaymentDetails';
import DeliveryInfo from '../../components/DeliveryInfo/DeliveryInfo';


const Checkout = () => {
  return (
      <div className={styles.checkoutPage}>
        <h1>CHECKOUT</h1>
        <p>Secure Page</p>
        <div className={styles.container}>
          <div className={styles.items}>
            <ItemsCheckout />
            
          </div>  
          <div className={styles.forms}>
            <DeliveryInfo />
            <PaymentDetails />
            <button className={styles.placeOrderButton}>BUY NOW</button>
            <p>By placing your order you agree to our T&C's, privacy and returns policies. You also consent to your data being stored by JUSA.</p>
          </div>
        </div>
    </div>
  )
};

export default Checkout;