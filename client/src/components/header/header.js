import React, { useState } from "react";
import { Link, NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import clsx from 'clsx';

import './header.scss';

import Poetry from '../poetry';
import Input from '../input';
import Button from '../button';


const Header = ({ url }) => {
  let [poetryStatus, setPoetryStatus] = useState(false);
  let [searchStatus, setSearchStatus] = useState(false);

  return (
    <div className="header">
      <div className="header-line"></div>
      <div className="header-inner">
        <div className="site-name">
          <Link to={`${url}`}>
            <div className="site-name-inner">
              <CSSTransition in={true} timeout={300} classNames="fade" appear>
                <div className="site-name-text">H。</div>
              </CSSTransition>
            </div>
          </Link>
        </div>
        <Poetry onEntered={() => setPoetryStatus(true)}></Poetry>
        <div className="nav-links-wrapper">
          <CSSTransition in={poetryStatus} timeout={300} classNames="fade" unmountOnExit>
            <div className="nav-links">
              <NavLink to={`${url}/archive`} className="nav-link" activeClassName="active">
                <div className="iconfont icon-archive"></div>
                <div>Archive</div>
              </NavLink>
              <NavLink to={`${url}/tags`} className="nav-link" activeClassName="active">
                <div className="iconfont icon-tag"></div>
                <div>Tags</div>
              </NavLink>
              <div className="nav-link" onClick={e => {
                if (!searchStatus) {
                  setSearchStatus(true)
                }
              }}>
                <div className="iconfont icon-search"></div>
                <div>Search</div>
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <CSSTransition in={searchStatus} timeout={500} classNames="alert" appear>
        {
          searchStatus ?
            <div className="search-box">
              <form className="search-form" onSubmit={event => {
                event.preventDefault();
                event.persist()
                console.log('submit')
                setSearchStatus(false)
              }}>
                <Input placeholder="请输入关键字，按回车键搜索" type="search"></Input>
                <Button type="submit" className="search-btn">Search</Button>
              </form>
            </div> : <div></div>
        }
      </CSSTransition>

    </div>
  )
}

export default Header;