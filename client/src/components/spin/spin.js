import React from 'react';
import styles from './spin.module.scss'

const Spin = ({size = 60}) => {
  return (
    <div className={styles.spin} style={{width: size, height: size}}>
      <svg className={styles.spinner} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
        <circle className={styles.circle} fill="none" strokeWidth="4" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
      </svg>
    </div>
  )
}

export default Spin;