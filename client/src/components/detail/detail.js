import React from 'react';
import Prism from 'prismjs';
import { CSSTransition } from 'react-transition-group';

import './detail.scss';

import { useStore } from '@config';

const Detail = ({ article }) => {
  const { firstLoad, headerReady } = useStore('menu');
  let { title, summary, formatDate, tags, content } = article;
  setTimeout(() => { Prism.highlightAll() })
  return (
    <CSSTransition classNames="article" timeout={400} in={headerReady && !firstLoad} appear mountOnEnter unmountOnExit>
      <div className="detail">
        <h2 className="detail-title">{title}</h2>
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
        {
          summary ? <div className="detial-content" dangerouslySetInnerHTML={{ __html: summary }}></div> : null
        }
        <div dangerouslySetInnerHTML={{ __html: content }} className="detial-content"></div>
      </div>
    </CSSTransition>
  )
};

export default Detail;