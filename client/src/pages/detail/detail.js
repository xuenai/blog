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
  if (data && data.ownArticleDetail) {
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    data.ownArticleDetail && <div className="article-detail">
      <h2 className="article-detail-title">{data.ownArticleDetail.title}</h2>
      {
        data.ownArticleDetail.summary && <p className="article-detail-summary">{data.ownArticleDetail.summary}</p>
      }
      <div className="article-detail-meta">
        <span className="iconfont icon-riqi"></span>
        <time>{data.ownArticleDetail.formatDate}</time>
        <span className="list-item-meta-line">&nbsp;|&nbsp;</span>
        <span className="iconfont icon-biaoqian"></span>
        <span>Javascript</span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.ownArticleDetail.content }} className="article-detial-content"></div>
    </div>
  )
}

export default Detail;