import React from "react";
import injectSheet, { StyledComponentProps } from "react-jss";

const styles = {
  nav: {
    display: 'inline-flex',
    alignItems: 'stretch',
  },
  'nav-pc': {
    display: 'flex',
    alignItems: 'center',
  },
  'nav-mobile': {
    display: 'none',
    alignItems: 'center',
    marginLeft: '15px',
  },
  'nav-item': {
    marginLeft: 30,
    cursor: 'pointer',
    transition: 'all .2s linear',
    fontSize: 'calc(var(--fontSizeBig) * 1px)',
    '&:hover': {
      color: 'var(--primary)',
    }
  },
  'nav-mobile-menu': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width:30,
    height:30,
    paddingRight: '.25em',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all .2s linear',
    '&:hover': {
      boxShadow: '0 1px 1px 2px rgba(0,0,0,.1)',
    },
    '&:active': {
      boxShadow: '0 1px 1px 2px rgba(0,0,0,.05)',
    }
  },
  'nav-mobile-btn': {
    position: 'relative',
    width:20,
    height:12,
    '& span': {
      position: 'absolute',
      left:'-.25em',
      width:20,
      height:2,
      borderRadius: '2px',
      background: 'var(--color)',
      transition: 'all .4s ease-in-out',
    },
    '& span:first-child': {
      top:0,
    },
    '& span:nth-child(2)': {
      top:'50%',
      transform: 'translateY(-50%)',
    },
    '& span:nth-child(3)': {
      bottom:0
    }
  },
  '@media (max-width: 650px)': {
    'nav-pc': {
      display: 'none',
    },
    'nav-mobile': {
      display: 'flex',
    },
  }
}

const Nav = injectSheet(styles)((props: StyledComponentProps) => {
  let cls =  props.classes as any;
  return (
    <div className={cls.nav}>
      <ul className={cls['nav-pc']}>
        <li className={cls['nav-item']}>归档</li>
        <li className={cls['nav-item']}>关于我</li>
      </ul>
      <div className={cls['nav-mobile']}>
        <div className={cls['nav-mobile-menu']}>
          <div className={cls['nav-mobile-btn']}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default Nav;