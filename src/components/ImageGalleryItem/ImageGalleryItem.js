import React from 'react';

import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImage, largeImage, onClick }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        onClick={() => onClick(largeImage)}
        src={smallImage}
        alt="gallaryImg"
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;
