import React, {useRef} from "react";
import styles from './search.module.scss';


const onFocusHandle = (ref) => {
  ref.current.classList.add(styles.active);
}

const onBlurHandle = (ref, iptRef) => {
  if (iptRef.current.value.length === 0) {
    ref.current.classList.remove(styles.active);
  }
}

const onKeyUpHandle = (e, iptRef) => {
  if (e.keyCode === 13) {
    console.log('回车搜索',iptRef.current.value)
  }
}

const Search = () => {
  const labelRef = useRef();
  const iptRef = useRef();
  return (
    <div className={styles['search-box']}>
      <label className={styles.search} htmlFor="inpt_search" ref={labelRef}>
        <input id="inpt_search" type="text" ref={iptRef} onBlur={ () => onBlurHandle(labelRef, iptRef) } onFocus={ () => onFocusHandle(labelRef)} onKeyUp={e => onKeyUpHandle(e, iptRef)} placeholder="回车搜索关键字"/>
      </label>
    </div>
  )
}

export default Search;
