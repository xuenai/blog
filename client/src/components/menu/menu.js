import React, {useRef} from "react";
import { NavLink } from "react-router-dom";
import clsx from 'clsx';
import { useStore } from '@config';
import styles from './menu.module.scss';

const Menu = () => {
  const reset = 'M300-10c0,0,0,164,0,410c0,232,0,410,0,410';
  const {isAinimate, toggle, isOpen, morphOpen, morphClose} = useStore('menu');
  const { isLogin } = useStore('user');
  const svgEl = useRef(null);
  let menuCls = clsx({
    [styles.menu]: true,
    [styles['menu--anim']]: isAinimate,
    [styles['menu--open']]: isOpen
  });
  let modalCls = clsx({
    [styles.modal]: true,
    [styles['modal--show']]: isAinimate,
    [styles['modal--open']]: isOpen,
  })
  return (
    <div>
      <div className={modalCls}></div>
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
          {
            isLogin && <li className={styles['menu__nav__item']}>
              <NavLink to="/new-art" activeClassName="active">new article</NavLink>
            </li>
          }
        </ul>
        <div className={styles.shape}>
          <svg width="100%" height="100%" viewBox="0 0 600 800" preserveAspectRatio="none" ref={svgEl}>
            <path fill="none" d={reset} />
          </svg>
        </div>
      </nav>
    </div>
  )
}

export default Menu;