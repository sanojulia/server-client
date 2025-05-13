import React, { useState } from 'react'
import styles from './ColourSelector.module.css'

const ColourSelector = ({colours}) => {
    const [selectedColour, setSelectedColour] = useState('');

    const handleColourChange = (e) => {
    setSelectedColour(e.target.value);
    };

  return (
    <div className={styles.container}>
        <p>Colour:</p>
        <select className={styles.dropDownSelector} value={selectedColour} onChange={handleColourChange}>
            <option value="" disabled>Select a colour</option>
            {colours.map((colour, index) => (
            <option key={index} value={colour}>{colour}</option>
            ))}
        </select>
    </div>
  )
};

export default ColourSelector;