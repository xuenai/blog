import React from 'react';
import {Link} from 'react-router-dom';

import './dashboardArticleList.scss';

const DashboardArticleList = ({list}) => {
  return (
    <div className="d-article-list">
      {
        list.map(item => (
          <div className="d-article-item" key={item.id}>
            <Link to={`/dashboard/detail/${item.id}`}>{item.title}</Link>
          </div>
        ))
      }
    </div>
  )
};

export default DashboardArticleList;