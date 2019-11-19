import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import './detail.scss';
import { ARTICLE_DETAIL } from '@graphql';
import { Loading, Detail, NetError } from '@components';

const ArticleDetail = ({ blog }) => {
  let { id } = useParams();
  const { loading, data, error } = useQuery(ARTICLE_DETAIL, {
    variables: { id }
  });
  if (loading) {
    return <Loading title="日志查询中..."></Loading>
  }
  if (error) {
    return <NetError description={error.message}></NetError>
  }
  let clsString = blog ? 'blog-detail' : 'article-detail';
  return (
    data.article ?
      <div className={clsString}>
        <Detail article={data.article}></Detail>
      </div> : null
  )
}

ArticleDetail.defaultProps = {
  // 是不是博客页面展示
  blog: false,
}

ArticleDetail.propTypes = {
  blog: PropTypes.bool,
}

export default ArticleDetail;