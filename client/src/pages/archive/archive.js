import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Prism from 'prismjs';
import moment from 'moment';
import { CSSTransition } from 'react-transition-group';

import './archive.scss';
import { ARCHIVES } from '@graphql';
import { Empty, Loading, NetError, Timeline } from '@components';
import { useStore } from '@config';

const Archive = () => {
  let { data, loading, error } = useQuery(ARCHIVES);
  const { firstLoad, headerReady } = useStore('menu');
  if (loading) {
    return <Loading title="日志寻找中..."></Loading>
  }
  if (error) {
    return <NetError description={error.message}></NetError>
  }
  let archives = [];
  if (data) {
    archives = data.archives;
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    <CSSTransition timeout={400} classNames="article" in={headerReady && !firstLoad} appear mountOnEnter unmountOnExit>
      <div className="archive">
        {
          archives.length ?
            <Timeline>
              {
                archives.map(archive =>
                  <div key={archive.year}>
                    <Timeline.Title key={archive.year}>{archive.year}</Timeline.Title>
                    {
                      archive.articles.map(article => <Timeline.Item key={article.id}>
                        <Link to={`/blog/detail/${article.id}`} className="archive-link">
                          <span className="archive-date">{moment(article.updatedAt - 0).format('MM-DD')}</span>
                          <span className="archive-title">{article.title}</span>
                        </Link>
                        <div className="archive-summary" dangerouslySetInnerHTML={{ __html: article.summary }}></div>
                      </Timeline.Item>)
                    }
                  </div>
                )
              }
            </Timeline> :
            <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
        }
      </div>
    </CSSTransition>
  )
}

export default Archive;