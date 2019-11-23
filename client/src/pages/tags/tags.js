import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { CSSTransition } from 'react-transition-group';

import './tags.scss';

import { TAGS_QUERY } from '@graphql';
import { Loading, NetError, Empty } from '@components';
import { useStore, areEqual } from '@config';

const Tags = () => {
  const { loading, data, error } = useQuery(TAGS_QUERY);
  const { firstLoad, headerReady } = useStore('menu');
  if (loading) {
    return <Loading title="标签查询中..."></Loading>
  }
  if (error) {
    return <NetError description={error.message}></NetError>
  }
  let tags = [];
  if (data) {
    tags = data.tags;
  }
  return (
    <CSSTransition classNames="article" timeout={400} in={headerReady && !firstLoad} appear mountOnEnter unmountOnExit>
      {
        tags.length ?
          <div className="tags-wrapper">
            <p>目前总共{tags.length}个标签</p>
            <div className="tags">
              {
                tags.map(tag => <Link className='tag-link' to={`/blog/tag/${tag.id}`} key={tag.id}>{tag.name}</Link>)
              }
            </div>
          </div> :
          <Empty description="你有看到我的标签么，我的标签不见了..."></Empty>
      }
    </CSSTransition>

  )
}

export default React.memo(Tags, areEqual);