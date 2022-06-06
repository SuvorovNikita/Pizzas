import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <h1>Ничего не найдено</h1>
      <p className={styles.description}>К сожелению данная страница отсутствует в нашем магазине</p>
    </div>
  );
};

export default NotFoundBlock;
