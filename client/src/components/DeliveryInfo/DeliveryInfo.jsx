import React, {useState} from 'react'
import styles from './DeliveryInfo.module.css';

const DeliveryInfo = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');


  return (
        <div className={styles.container}>
            <i className="fa-solid fa-truck"></i>
            <h2>DELIVERY INFO</h2>
            <p>Please fill the name, phone number and address for delivery.</p>
            <form>
                <div className={styles.formField}>
                    <label htmlFor="firstName">FIRST NAME:</label>
                    <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="lastName">LAST NAME:</label>
                    <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="phone">PHONE NUMBER:</label>
                    <input
                    type="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    />
                </div>                              
                <div className={styles.formField}>
                    <label htmlFor="address">ADDRESS:</label>
                    <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    />
                    <input
                    type="text"
                    id="addressLine2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    placeholder='Optional'
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="city">CITY:</label>
                    <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                </div>

                <div className={styles.formField}>
                    <label htmlFor="postcode">POSTCODE:</label>
                    <input
                    type="text"
                    id="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    required
                    />
                </div>

                    <div className={styles.formField}>
                    <label htmlFor="country">COUNTRY:</label>
                    <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    CONFIRM INFO
                </button>
            </form>
        </div>
  )
};

export default DeliveryInfo;