import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import './dashboardTags.scss';

import { TagList, Loading } from '@components';
import AddTagButton from './addTagButton';
import { TAGS_QUERY } from '@graphql'

const DashboardTags = () => {
  const { loading, data } = useQuery(TAGS_QUERY);

  if (loading) {
    return <Loading title="标签查询中..."></Loading>
  }
  let { tags } = data;

  return (
    <div className="d-tags">
      <div>
        <AddTagButton></AddTagButton>
      </div>
      {
        tags.length > 0 && <p className="totalCount">目前共计{tags.length}个标签</p>
      }
      <TagList data={tags}></TagList>
    </div>
  )
};

export default DashboardTags;
