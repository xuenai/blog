import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CSSTransition } from 'react-transition-group';
import Prism from 'prismjs';
import moment from 'moment';

import './tagArticles.scss';

import { TAG_ARTICLES } from '@graphql';
import { Loading, NetError, Empty, Timeline } from '@components';

const TagArticles = () => {
  let { id } = useParams();

  const { loading, data, error } = useQuery(TAG_ARTICLES, {
    variables: { id }
  });

  if (loading) {
    return <Loading title="日志查询中..."></Loading>
  }
  if (error) {
    return <NetError description={error.message}></NetError>
  }
  let articles = [];
  if (data) {
    articles = data.articles;
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    <CSSTransition in={true} timeout={500} classNames="article" appear>
      {
        articles.length ?
          <Timeline className="tag-articles">
            <Timeline.Title>
              <span className="iconfont icon-biaoqian"></span>
              <span>{data.tag.name}</span>
            </Timeline.Title>
            {
              articles.map(article =>
                <Timeline.Item key={article.id}>
                  <Link to={`/blog/detail/${article.id}`} className="tag-articles-link">
                    <span className="tag-articles-date">{moment(article.updatedAt - 0).format('YYYY-MM-DD')}</span>
                    <span className="tag-articles-title">{article.title}</span>
                  </Link>
                  <div className="tag-articles-summary" dangerouslySetInnerHTML={{ __html: article.summary }}></div>
                </Timeline.Item>
              )
            }
          </Timeline> :
          <Empty description="你有看到我的日志么，我的日志不见了"></Empty>
      }
    </CSSTransition>
  )
}

export default TagArticles;