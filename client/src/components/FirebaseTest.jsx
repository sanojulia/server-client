import React, { useState, useEffect } from 'react';
import {
  auth,
  db,
  googleProvider,
  facebookProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc
} from '../firebase';

const FirebaseTest = () => {
  const [user, setUser] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [testValue, setTestValue] = useState('');

  // Listen for auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setTestMessage('Auth state changed');
    });

    return () => unsubscribe();
  }, []);

  // Test database write
  const testDatabaseWrite = async () => {
    try {
      const docRef = doc(db, 'test', 'test-document');
      await setDoc(docRef, {
        timestamp: new Date(),
        value: testValue
      });
      setTestMessage('Successfully wrote to database');
    } catch (error) {
      setTestMessage(`Database write error: ${error.message}`);
    }
  };

  // Test database read
  const testDatabaseRead = async () => {
    try {
      const docRef = doc(db, 'test', 'test-document');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTestMessage(`Database read successful: ${JSON.stringify(docSnap.data())}`);
      } else {
        setTestMessage('No document found');
      }
    } catch (error) {
      setTestMessage(`Database read error: ${error.message}`);
    }
  };

  // Test Google sign in
  const testGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setTestMessage(`Google sign in successful: ${result.user.email}`);
    } catch (error) {
      setTestMessage(`Google sign in error: ${error.message}`);
    }
  };

  // Test Facebook sign in
  const testFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      setTestMessage(`Facebook sign in successful: ${result.user.email}`);
    } catch (error) {
      setTestMessage(`Facebook sign in error: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Firebase Test Component</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current User:</h3>
        {user ? (
          <div>
            <p>Email: {user.email}</p>
            <p>UID: {user.uid}</p>
          </div>
        ) : (
          <p>No user signed in</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Database Operations:</h3>
        <input
          type="text"
          value={testValue}
          onChange={(e) => setTestValue(e.target.value)}
          placeholder="Enter test value"
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={testDatabaseWrite}>Write to Database</button>
        <button onClick={testDatabaseRead}>Read from Database</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Test Authentication:</h3>
        <button onClick={testGoogleSignIn}>Sign in with Google</button>
        <button onClick={testFacebookSignIn}>Sign in with Facebook</button>
      </div>

      <div>
        <h3>Test Results:</h3>
        <p style={{ color: testMessage.includes('error') ? 'red' : 'green' }}>
          {testMessage}
        </p>
      </div>
    </div>
  );
};

export default FirebaseTest;
