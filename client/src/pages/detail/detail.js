import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import Prism from 'prismjs';

import './detail.scss';
import { OWN_ARTICLE_DETAIL } from '@graphql';
import { Spin } from '@components';

const Detail = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(OWN_ARTICLE_DETAIL, {
    variables: { id }
  });
  if (loading) {
    return <Spin size={16}></Spin>
  }
  if (data && data.ownArticleDetail) {
    setTimeout(() => { Prism.highlightAll() }, 300)
  }
  return (
    <div className="article-detail">
      <h1>{data.ownArticleDetail.title}</h1>
      <p>data.ownArticleDetail.summary</p>
      <div dangerouslySetInnerHTML={{ __html: data.ownArticleDetail.content }}></div>
    </div>
  )
}

export default Detail;