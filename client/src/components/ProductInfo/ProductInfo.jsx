import React, {useEffect, useState } from 'react'
import styles from './ProductInfo.module.css'
import AddToCart from '../AddToCart/AddToCart';
import SizeSelector from '../SizeSelector/SizeSelector';
import ColourSelector from '../ColourSelector/ColourSelector';

const ProductInfo = ({ product }) => {
    const { name, description, price, originalPrice, colors, sizes} = product;


    return (
        <div className={styles.container}>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.priceContainer}>
                {originalPrice ? (
                <>
                    <span className={styles.salePrice}>€{price.toFixed(2)}</span>
                    <span className={styles.originalPrice}>€{originalPrice.toFixed(2)}</span>
                </>
                ) : (
                <span className={styles.price}>€{price.toFixed(2)}</span>
                )}
            </div>
            <p className={styles.descriptionHead}>Description:</p>
            <p className={styles.description}>{description}</p>

            <ColourSelector colours={colors}/>
            <SizeSelector sizes={sizes}/>
            <AddToCart />
        </div>
    )
};

export default ProductInfo;