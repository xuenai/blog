import React from 'react';
import { Link } from 'react-router-dom';

import './list-item.scss';

const ListItem = ({ path, data }) => {
  let { title, formatDate, summary, tags } = data;
  return (
    <div className="list-item">
      <h3 className="list-item-title">
        <Link className="list-item-link" to={path}>{title}</Link>
      </h3>
      <div className="list-item-meta">
        <span className="iconfont icon-riqi"></span>
        <time>{formatDate}</time>
        {
          tags && (
            <span>
              <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
              <span className="iconfont icon-biaoqian"></span>
              <span>{tags}</span>
            </span>
          )
        }
      </div>
      {
        summary && <p className="list-item-summary">{summary}</p>
      }
    </div>
  )
};

export default ListItem;