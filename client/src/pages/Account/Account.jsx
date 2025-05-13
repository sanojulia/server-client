import React, { useState} from 'react';
import styles from './Account.module.css';
import { useNavigate } from 'react-router-dom';
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setDoc,
  doc,
  getDoc
} from "../../firebase";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Clear form after successful login
        setEmail('');
        setPassword('');
      } catch (err) {
        setError("Login error: " + err.message);
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save name and surname to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          firstName,
          lastName,
          email,
          createdAt: new Date()
        });

        // Clear form after successful registration
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
      } catch (err) {
        setError("Registration error: " + err.message);
      }
    }
    setIsLoading(false);
  };
  const registerWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Registration Error:", error.message);
    }
  };

  const registerWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  
  // const loginWithGoogle = async () => {
  //   try {
  //     await signInWithPopup(auth, googleProvider);
  //     navigate('/');
  //   } catch (error) {
  //     console.error("Google Sign-In Error:", error.message);
  //   }
  // };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save data to Firestore if it doesn't exist
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          createdAt: new Date()
        });
         navigate('/');
      }
    } catch (err) {
      setError("Google login error: " + err.message);
    }
  };

  const loginWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      // Save data to Firestore if it doesn't exist
      const userDocRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        await setDoc(userDocRef, {
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
          email: user.email,
          createdAt: new Date()
        });
      }
    } catch (err) {
      setError("Facebook login error: " + err.message);
    }
  };

  return (
    <div className={styles.accountPage}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(true)}
            >
              SIGN IN
            </button>
            <button 
              className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(false)}
            >
              JOIN
            </button>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName">FIRST NAME:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName">LAST NAME:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="email">EMAIL ADDRESS:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">PASSWORD:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {isLogin && (
                <button type="button" className={styles.forgotPassword}>
                  Forgot password?
                </button>
              )}
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : (isLogin ? 'SIGN IN' : 'JOIN JUSA')}
            </button>

            {!isLogin && (
              <p className={styles.terms}>
                By creating your account, you agree to our{' '}
                <a href="#terms">Terms & Conditions</a> and{' '}
                <a href="#privacy">Privacy Policy</a>
              </p>
            )}
          </form>

          <div className={styles.socialLogin}>
            <p>OR SIGN IN WITH:</p>
            <div className={styles.socialButtons}>
              <button className={`${styles.socialButton} ${styles.google}`} onClick={loginWithGoogle}>
                <i className="fab fa-google"></i> GOOGLE
              </button>
              <button className={`${styles.socialButton} ${styles.facebook}`} onClick={loginWithFacebook}>
                <i className="fab fa-facebook-f"></i> FACEBOOK
              </button>
              <button className={`${styles.socialButton} ${styles.apple}`} disabled>
                <i className="fab fa-apple"></i> APPLE
              </button>
            </div>
          </div>
        </div>

        <div className={styles.benefits}>
          <h2>BENEFITS OF JOINING JUSA:</h2>
          <ul>
            <li>
              <i className="fas fa-truck"></i>
              <span>Free Delivery</span>
              <p>Get complimentary standard delivery on all orders</p>
            </li>
            <li>
              <i className="fas fa-gift"></i>
              <span>Birthday Treat</span>
              <p>Receive exclusive offers on your birthday</p>
            </li>
            <li>
              <i className="fas fa-percent"></i>
              <span>Exclusive Discounts</span>
              <p>Be the first to know about sales and special offers</p>
            </li>
            <li>
              <i className="fas fa-heart"></i>
              <span>Saved Items</span>
              <p>Create wishlists and save your favorite items</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;