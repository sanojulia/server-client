import React, { useEffect, useState } from 'react';
import styles from './AddToCart.module.css'

const AddToCart = () => {
  return (
    <button className={styles.addButton}>
        <span style={{ marginRight: "10px" }}>ADD TO BAG</span>
        <span><i className="fa-solid fa-bag-shopping"></i></span>
    </button>
  )
};

export default AddToCart;