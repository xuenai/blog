import React from "react";
import clsx from 'clsx';
import styles from './search.module.scss';

const Search = () => {

  return (
    <div className={styles.search}>
      <svg className={styles['search-svg']} viewBox="0 0 320 70"
          data-init="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21"
          data-mid="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5"
          data-active="M27,3 L293,3 a27,27 0 0,1 0,54 L27,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5">
        <path className={styles['search-svg__path']} d="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21" />
      </svg>
      <input type="text" className={styles['search-input']} />
      <div className={styles['search-close']}></div>
    </div>
  )
}

export default Search;
