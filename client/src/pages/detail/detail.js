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
  if (data && data.articleDetail) {
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    data.articleDetail && <div className="article-detail">
      <h2 className="article-detail-title">{data.articleDetail.title}</h2>
      {
        data.articleDetail.summary && <p className="article-detail-summary">{data.articleDetail.summary}</p>
      }
      <div className="article-detail-meta">
        <span className="iconfont icon-riqi"></span>
        <time>{data.articleDetail.formatDate}</time>
        {
          data.articleDetail.tags.length ? 
          <span>
            <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
            <span className="iconfont icon-biaoqian"></span>
            <span>
              {
                data.articleDetail.tags.map(tag => <span className="article-detail-tag" key={tag.id}>{tag.name}</span>)
              }
            </span>
          </span> : null
        }
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.articleDetail.content }} className="article-detial-content"></div>
    </div>
  )
}

export default Detail;