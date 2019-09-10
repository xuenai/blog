import React, {useRef} from "react";
import styles from './search.module.scss';

const initD = 'M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21';
const midD = 'M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5';
const finalD = 'M27,3 L293,3 a27,27 0 0,1 0,54 L27,57 a27,27 0 0,1 0,-54 M179.5,49.5 179.5,49.5';
const backDelay = 400;
const midAnim = 200;
const bigAnim = 400;
let animating = false;

function onOpenHandle (boxRef, svgRef, iptRef, closeRef) {
  let box = boxRef.current;
  let svg = window.Snap( svgRef.current );
  let path = svg.select( 'path' );
  let ipt = iptRef.current;
  let close = closeRef.current;
  if(animating) {
    return;
  }
  if (box.classList.contains(styles.active)) {
    return false;
  }
  animating = true;

  box.classList.add(styles.active)
  window.Snap(path).animate({"path": midD}, midAnim, window.mina.backin, function() {
    window.Snap(path).animate({"path": finalD}, bigAnim, window.mina.easeinout, function() {
      ipt.classList.add(styles.visible);
      ipt.focus();
      close.classList.add(styles.visible);
      animating = false;
    });
  });
}
function onCloseHandle (boxRef, svgRef, iptRef, closeRef) {
  if (animating) return;
  let box = boxRef.current;
  let svg = window.Snap( svgRef.current );
  let path = svg.select( 'path' );
  let ipt = iptRef.current;
  let close = closeRef.current;
  animating = true;
  box.classList.remove(styles.active);
  ipt.classList.remove(styles.visible);
  close.classList.remove(styles.visible);
  box.classList.remove(styles.visible);
  setTimeout(function() {
    window.Snap(path).animate({"path": midD}, bigAnim, window.mina.easeinout, function() {
      window.Snap(path).animate({"path": initD}, midAnim, window.mina.easeinout, function() {
        animating = false;
      });
    });
  }, backDelay);
}

const Search = () => {
  const searchRef = useRef(null);
  const svgRef = useRef(null);
  const iptRef = useRef(null);
  const closeRef = useRef(null);
  return (
    <div className={styles.search} ref={searchRef} onClick={() => onOpenHandle(searchRef, svgRef, iptRef, closeRef )}>
      <svg className={styles['search-svg']} viewBox="0 0 324 64" ref={svgRef} >
        <path className={styles['search-svg__path']} d="M160,3 L160,3 a27,27 0 0,1 0,54 L160,57 a27,27 0 0,1 0,-54 M197,67 181.21,51.21" />
      </svg>
      <input type="text" ref={iptRef} className={styles['search-input']}/>
      <div ref={closeRef} className={styles['search-close']} onClick={()=> onCloseHandle(searchRef, svgRef, iptRef, closeRef )}></div>
    </div>
  )
}

export default Search;
