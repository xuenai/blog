import React from "react";
import clsx from 'clsx';
import styles from './search.module.scss';

const Search = () => {
  let cls = clsx({
    [styles.search]: true
  })
  return (
    <>
      <span className={cls}>
        <input
          className={styles['search__ipt']}
          type="text"
          id="input-8"
        />
        <label className={styles['search__label']} htmlFor="input-8">
          <span
            className={styles['search__label-content']}
            data-content="Email"
          >Email</span>
        </label>
        <svg
          className={styles.graphic}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"
          />
        </svg>
      </span>
    </>
  )
}

export default Search;