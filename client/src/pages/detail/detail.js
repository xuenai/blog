import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Prism from 'prismjs';

import './detail.scss';
import { OWN_ARTICLE_DETAIL } from '@graphql';
import { Loading } from '@components';

const Detail = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(OWN_ARTICLE_DETAIL, {
    variables: { id }
  });
  if (loading) {
    return <Loading title="日志查询中..."></Loading>
  }
  if (data && data.article) {
    setTimeout(() => { Prism.highlightAll() })
  }
  let {title, summary, formatDate, tags, content} = data.article;
  return (
    data.article ? 
      <div className="article-detail">
        <h2 className="article-detail-title">{title}</h2>
        {
          summary ? <p className="article-detail-summary">{summary}</p> : null
        }
        <div className="article-detail-meta">
          <span className="iconfont icon-riqi"></span>
          <time>{formatDate}</time>
          {
            tags.length ? 
            <span>
              <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
              <span className="iconfont icon-biaoqian"></span>
              <span>
                {
                  tags.map(tag => <span className="article-detail-tag" key={tag.id}>{tag.name}</span>)
                }
              </span>
            </span> : null
          }
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} className="article-detial-content"></div>
      </div> : null
  )
}

export default Detail;