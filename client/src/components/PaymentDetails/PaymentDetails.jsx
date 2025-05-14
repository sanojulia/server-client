import React, {useState} from 'react'
import styles from './PaymentDetails.module.css';

const PaymentDetails = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [cardNumber, setCardNumber] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

  return (
        <div className={styles.container}>
            <i className="fa-solid fa-credit-card"></i>
            <h2>ADD CARD</h2>
            <p>Please fill your card details.</p>
            <form>              
                <div className={styles.formField}>
                    <label htmlFor="cardNumber">CARD NUMBER:</label>
                    <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="newPassword">EXPIRE DATE:</label>
                    <input
                    type="month"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="nameOnCard">NAME ON CARD:</label>
                    <input
                    type="text"
                    id="nameOnCard"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    SAVE CARD
                </button>
            </form>
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
  )
};

export default PaymentDetails;