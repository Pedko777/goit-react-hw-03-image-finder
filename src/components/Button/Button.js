import React from 'react';

import styles from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={styles.Button}>
        Load More
      </button>
    </div>
  );
};


export default Button;