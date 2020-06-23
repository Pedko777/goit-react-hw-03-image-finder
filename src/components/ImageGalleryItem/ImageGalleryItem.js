import React from 'react';

import styles from "./imageGalleryItem.module.css";


const ImageGalleryItem = ({ smallImage }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={smallImage}
        alt="gallaryImg"
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

export default ImageGalleryItem;