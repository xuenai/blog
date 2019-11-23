import React from 'react';
import { Link } from 'react-router-dom';

import './list-item.scss';

import { areEqual } from '@config'

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
          tags.length ?
            <span>
              <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
              <span className="iconfont icon-biaoqian"></span>
              {
                tags.map(tag => <span key={tag.id} className="list-item-tag">{tag.name}</span>)
              }
            </span> : null
        }
      </div>
      {
        summary && <div className="list-item-summary" dangerouslySetInnerHTML={{ __html: summary }}></div>
      }
    </div>
  )
};

export default React.memo(ListItem, areEqual);