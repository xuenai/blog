import React from "react";
import injectSheet, { StyledComponentProps } from "react-jss";

import {Nav, Search} from '../../components'

import logo from '../../assets/images/logo.png'

const styles = {
  header: {
    // color: theme.color,
    borderBottom: "1px solid var(--bg)",
    background: "#fff",
    color: `var(--color)`,
    boxShadow: "0 1px 5px rgba(0, 0, 0, .1)",
  },
  'header-inner': {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    width: 1000,
    maxWidth: '100%',
    height: 60,
    padding: '0 15px',
    margin: '0 auto',
  },
  logo: {
    position:'absolute',
    left: 20,
    top: 10,
    display: 'inline-block',
    height: 40,
    fontSize: 0,
    '& img': {
      height: '100%',
      width: 'auto',
    }
  }
};

const Header = injectSheet(styles)((props: StyledComponentProps) => {
  let cls = props.classes as any;
  return (
    <div className={cls.header}>
      <div className={cls['header-inner']}>
        <figure className={cls.logo}>
          <img src={logo} height="40" alt=""/>
        </figure>
        <Search />
        <Nav></Nav>
      </div>
    </div>
  );
});

export default Header;
