import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CSSTransition } from 'react-transition-group';

import './dashboardArchives.scss';

import { Button, Loading, ArchiveList, Empty } from '@components';
import { ARTICLES_AND_TAGS } from '@graphql';
import { areEqual } from '@config';

const DashboardArchives = () => {
  const { loading, data } = useQuery(ARTICLES_AND_TAGS);

  if (loading) {
    return <Loading title="日志查询中..."></Loading>
  }
  return (
    <div className="d-archives">
      <Link to='/dashboard/new' className="new-btn">
        <Button><i className="iconfont icon-maobi"></i>写日志</Button>
      </Link>
      {
        data.articles.length ?
          <div>
            <p className="totalCount">目前共计{data.articles.length}篇日志</p>
            <CSSTransition classNames="article" timeout={400} in={true} appear mountOnEnter unmountOnExit>
              <ArchiveList list={data.articles}></ArchiveList>
            </CSSTransition>
          </div> :
          <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
      }
      {/* <Page current={data.ownArticles.current} total={data.ownArticles.totalPage} onChange={e => {setCurrent(e); refetch();}}></Page> */}
    </div>
  )
};

export default React.memo(DashboardArchives, areEqual);
