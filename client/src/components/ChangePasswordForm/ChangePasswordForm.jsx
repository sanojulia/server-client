import React, {useState} from 'react'
import styles from './ChangePasswordForm.module.css';

const ChangePasswordForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');

  return (
        <div className={styles.container}>
            <i className="fa-solid fa-key"></i>
            <h2>CHANGE PASSWORD</h2>
            <p>Feel free to update your password so your account stays secure.</p>
            <form>              
                <div className={styles.formField}>
                    <label htmlFor="currentPassword">CURRENT PASSWORD:</label>
                    <input
                    type="password"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    />
                </div>
                <div className={styles.formField}>
                    <label htmlFor="newPassword">NEW PASSWORD:</label>
                    <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    required
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    SAVE PASSWORD
                </button>
            </form>
        </div>
  )
};

export default ChangePasswordForm;