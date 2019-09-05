import React, {useRef} from "react";
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import { useStore } from '@config';
import styles from './menu.module.scss';

// const Snap = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
// const mina = require(`imports-loader?this=>window,fix=>module.exports=0!snapsvg/dist/snap.svg.js`);
const Menu = () => {
  const reset = 'M300-10c0,0,0,164,0,410c0,232,0,410,0,410';
  const {isAinimate, toggle, isOpen, morphOpen, morphClose} = useStore('menu');
  const svgEl = useRef(null);
  let menuCls = clsx({
    [styles.menu]: true,
    [styles['menu--anim']]: isAinimate,
    [styles['menu--open']]: isOpen
  })
  return (
    <nav className={menuCls}>
      <button className={styles['menu__handle']} onClick={() => {
          var s = window.Snap( svgEl.current );
          let pathEl = s.select( 'path' );
          pathEl.stop().animate( { 'path' : isAinimate ? morphClose : morphOpen }, 350, window.mina.easeout, function() {
						pathEl.stop().animate( { 'path' : reset }, 200, window.mina.bounce );
					} );
          toggle();
        }
      }>
        <span>Menu</span>
      </button>
      <ul className={styles['menu__nav']}>
        <li className={styles.site}>justpeth.com</li>
        <li className={styles['menu__nav__item']}>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li className={styles['menu__nav__item']}>
          <NavLink to="/archive" activeClassName="active">Archive</NavLink>
        </li>
        <li className={styles['menu__nav__item']}>
          <NavLink to="/About" activeClassName="active">About</NavLink>
        </li>
      </ul>
      <div className={styles.shape}>
        <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none" ref={svgEl}>
          <path fill="none" d={reset} />
        </svg>
      </div>
    </nav>
  )
}

export default Menu;