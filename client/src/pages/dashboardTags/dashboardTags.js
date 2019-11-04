import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import './dashboardTags.scss';

import { Empty, TagList, Loading} from '@components';
import AddTagButton from './addTagButton';
import {TAGS_QUERY} from '@graphql'


const DashboardTags = () => {
  const { loading, data } = useQuery(TAGS_QUERY);

  if (loading) {
    return <Loading title="标签查询中..."></Loading>
  }
  let {tags, total} = data.tags;
  return (
    <div className="d-tags">
      <div>
        <AddTagButton></AddTagButton>
      </div>
      {
        total > 0 && <p className="totalCount">目前共计{total}个标签</p>
      }
      <TagList data={tags}></TagList>
    </div>
  )
};

export default DashboardTags;
