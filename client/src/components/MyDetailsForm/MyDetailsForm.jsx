import React, {useState} from 'react'
import styles from './MyDetailsForm.module.css';       
    
const MyDetailsForm = () => {   
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    return (
        <div className={styles.container}>
            <i className="fa-solid fa-address-card"></i>
            <h2>MY DETAILS</h2>
            <p>Feel free to edit your details so it is up to date.</p>
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
                    <label htmlFor="email">EMAIL ADDRESS:</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                <button type="submit" className={styles.submitButton}>
                    SAVE CHANGES
                </button>
            </form>
        </div>
    )
};

export default MyDetailsForm;