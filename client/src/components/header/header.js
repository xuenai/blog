import React from "react";
import {Link} from 'react-router-dom';
import './header.scss';

import Poetry from '../poetry/poetry';

const Header = () => {

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <span className="logo-text">Justpeth</span>
        </Link>
      </div>
      <Poetry></Poetry>
    </div>
  )
}

export default Header;