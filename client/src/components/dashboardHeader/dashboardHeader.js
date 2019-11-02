import React from 'react';
import { NavLink } from 'react-router-dom';

import './dashboardHeader.scss';

const DashboardHeader = ({ url }) => {
  return (
    <div className="d-header">
      <div className="d-header-item">
        <NavLink to={`${url}/archives`} className="d-header-link" activeclassname="active"><i className="iconfont icon-archive"></i><span>Archives</span></NavLink>
        <NavLink to={`${url}/tags`} className="d-header-link" activeclassname="active"><i className="iconfont icon-tag"></i><span>Tags</span></NavLink>
      </div>
    </div>
  )
};

export default DashboardHeader;