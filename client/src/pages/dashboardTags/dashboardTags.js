import React from 'react';
import {useQuery, useSubscription} from '@apollo/react-hooks';

import './dashboardTags.scss';

import { TagList, Loading} from '@components';
import AddTagButton from './addTagButton';
import {TAGS_QUERY, TAG_ADD_SUBSCRIPTION} from '@graphql'

const DashboardTags = () => {
  const { loading, data } = useQuery(TAGS_QUERY);
  const {data: addedTag} = useSubscription(TAG_ADD_SUBSCRIPTION);
  if (loading) {
    return <Loading title="标签查询中..."></Loading>
  }
  let {tags, total} = data.tags;
  
  if (data && addedTag) {
    tags.push(addedTag.newTag.tag);
    total = addedTag.newTag.total
  }

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
