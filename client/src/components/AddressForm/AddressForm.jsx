import React, {useState} from 'react'
import styles from './AddressForm.module.css';

const AddressForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [address, setAddress] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [country, setCountry] = useState('');

  return (
        <div className={styles.container}>
            <i className="fa-solid fa-house"></i>
            <h2>ADDRESS</h2>
            <p>Please fill the address you would like your items to be posted.</p>
            <form>              
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
                    SAVE ADDRESS
                </button>
            </form>
        </div>
  )
};

export default AddressForm;