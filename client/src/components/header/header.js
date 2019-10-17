import React, {useState} from "react";
import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './header.scss';

import Poetry from '../poetry/poetry';

const Header = () => {
  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-inner">
        <div className="site-name">
          <Link to="/">
            <div className="site-name-inner">H。</div>
          </Link>
        </div>
        <Poetry></Poetry>
        <CSSTransition in={true} timeout={300} classNames="fade" key="navLink">
          <div className="nav-links">
            <NavLink to="/archive" className="nav-link" activeClassName="active">
              <div className="iconfont icon-archive"></div>
              <div>Archive</div>
            </NavLink>
            <NavLink to="/tags" className="nav-link" activeClassName="active">
              <div className="iconfont icon-tag"></div>
              <div>Tags</div>
            </NavLink>
            <div className="nav-link">
              <div className="iconfont icon-search"></div>
              <div>Search</div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default Header;