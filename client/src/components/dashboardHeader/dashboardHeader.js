import React from 'react';
import { Link } from 'react-router-dom';

import './dashboardHeader.scss';

const DashboardHeader = () => {
  return (
    <div className="d-header">
      <div className="d-header-item">
        <Link to="/" className="d-header-link" activeClassName="active"><i className="iconfont icon-archive"></i><span>Archives</span></Link>
        <Link to="/" className="d-header-link" activeClassName="active"><i className="iconfont icon-tag"></i><span>Tags</span></Link>
        <Link to="/" className="d-header-link" activeClassName="active"><i className="iconfont icon-new"></i><span>New Archive</span></Link>
      </div>
    </div>
  )
};

export default DashboardHeader;