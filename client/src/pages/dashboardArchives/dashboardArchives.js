import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import './dashboardArchives.scss';

import { Button, Spin, ArchiveList } from '@components';
import { OWN_ARTICLE_LIST } from '@graphql'

const DashboardArchives = () => {
  const { loading, data } = useQuery(OWN_ARTICLE_LIST);
  if (loading) {
    return <Spin size={16}></Spin>
  }
  return (
    <div className="d-archives">
      <Link to='/dashboard/new' className="new-btn">
        <Button><i className="iconfont icon-maobi"></i>写日志</Button>
      </Link>
      <p className="totalCount">目前共计{data.ownArticles.total}篇日志</p>
      <ArchiveList path='/dashboard/detail/' list={data.ownArticles.articles}></ArchiveList>
      {/* <Page current={data.ownArticles.current} total={data.ownArticles.totalPage} onChange={e => {setCurrent(e); refetch();}}></Page> */}
    </div>
  )
};

export default DashboardArchives;
