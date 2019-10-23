import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import './dashboardArchives.scss';

import {Page, Button, Spin, DashboardArticleList} from '@components';
import { OWN_ARTICLE_LIST } from '@graphql'

const DashboardArchives = () => {
  let [current, setCurrent] = useState(1);
  let pageSize = 3;

  const {loading, data, refetch} = useQuery(OWN_ARTICLE_LIST, {
    variables: {page: current, pageSize, filter: ''}
  });

  if (loading) {
    return <Spin size={16}></Spin>
  }
  return (
    <div className="archives">
      <Link to='/dashboard/new' className="new-btn">
        <Button><i className="iconfont icon-maobi"></i>写日志</Button>
      </Link>
      <p className="totalCount">目前共计{data.ownArticles.total}篇日志</p>
      <DashboardArticleList list={data.ownArticles.articles}></DashboardArticleList>
      <Page current={data.ownArticles.current} total={data.ownArticles.totalPage} onChange={e => {setCurrent(e); refetch();}}></Page>
    </div>
  )
};

export default DashboardArchives;
