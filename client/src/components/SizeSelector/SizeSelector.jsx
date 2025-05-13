import React, {useState} from 'react'
import styles from './SizeSelector.module.css'

const SizeSelector = ({sizes}) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className={styles.container}>
        <p>Size:</p>
        <select className={styles.dropDownSelector} value={selectedSize} onChange={handleSizeChange}>
          <option value="" disabled>Select a size</option>
          {sizes.map((size, index) => (
            <option key={index} value={size}>{size}</option>
          ))}
        </select>
    </div>
  )
};

export default SizeSelector;