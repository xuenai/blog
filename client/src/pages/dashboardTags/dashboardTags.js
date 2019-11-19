import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { CSSTransition } from 'react-transition-group';

import './dashboardTags.scss';

import { TagList, Loading } from '@components';
import AddTagButton from './addTagButton';
import { ARTICLES_AND_TAGS } from '@graphql'

const DashboardTags = () => {
  const { loading, data: { tags } } = useQuery(ARTICLES_AND_TAGS);

  if (loading) {
    return <Loading title="标签查询中..."></Loading>
  }

  return (
    <div className="d-tags">
      <div>
        <AddTagButton></AddTagButton>
      </div>
      {
        tags.length > 0 && <p className="totalCount">目前共计{tags.length}个标签</p>
      }
      <CSSTransition classNames="article" timeout={400} in={true} appear mountOnEnter unmountOnExit>
        <TagList data={tags}></TagList>
      </CSSTransition>
    </div>
  )
};

export default DashboardTags;
