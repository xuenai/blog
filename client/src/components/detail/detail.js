import React from 'react';
import Prism from 'prismjs';
import { CSSTransition } from 'react-transition-group';


import './detail.scss';

const Detail = ({ article }) => {
  let { title, summary, formatDate, tags, content } = article;
  setTimeout(() => { Prism.highlightAll() })
  return (
    <CSSTransition classNames="article" timeout={400} in={true} appear>
      <div className="detail">
      <h2 className="detail-title">{title}</h2>
      {
        summary ? <p className="detail-summary">{summary}</p> : null
      }
      <div className="detail-meta">
        <span className="iconfont icon-riqi"></span>
        <time>{formatDate}</time>
        {
          tags.length ?
            <span>
              <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
              <span className="iconfont icon-biaoqian"></span>
              <span>
                {
                  tags.map(tag => <span className="detail-tag" key={tag.id}>{tag.name}</span>)
                }
              </span>
            </span> : null
        }
      </div>
      <div dangerouslySetInnerHTML={{ __html: content }} className="detial-content"></div>
    </div>
    </CSSTransition>
  )
};

export default Detail;