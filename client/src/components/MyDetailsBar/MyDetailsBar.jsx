import React from 'react'
import styles from './MyDetailsBar.module.css';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';

const MyDetailsBar = ({ onOptionClick }) => {

  return (
    <div className={styles.container}>
        <div className={styles.greetingBox}>
            <div>
                <Avatar firstName="Vini" surname='Sano'/>
            </div>
            <div>
                <p>Hi,</p> 
                <p className={styles.customerName}>UserName</p>
            </div>
        </div>
        <div className={styles.myDetailsBox}>
            <ul>
                <li onClick={() => onOptionClick('myDetailsForm')}><span style={{ display: "inline", paddingRight: "15px"}}><i className="fa-solid fa-address-card"></i></span>My Details</li>
                <li onClick={() => onOptionClick('changePasswordForm')}><span style={{ display: "inline", paddingRight: "15px"}}><i className="fa-solid fa-key"></i></span>Change Password</li>
                <li onClick={() => onOptionClick('addressForm')}><span style={{ display: "inline", paddingRight: "15px"}}><i className="fa-solid fa-house"></i></span>Address</li>
                <li onClick={() => onOptionClick('paymentDetails')}><span style={{ display: "inline", paddingRight: "15px"}}><i className="fa-solid fa-credit-card"></i></span>Payment Details</li>
                <li><Link to="/Account" className={styles.barLink}><span style={{ display: "inline", paddingRight: "15px"}}><i className="fa-solid fa-right-from-bracket"></i></span>Sign Out</Link></li>
            </ul>
        </div>
    </div>
  )
};

export default MyDetailsBar;