import React, { useRef } from 'react';
import { Link } from 'react-router-dom';


import './dashboardTags.scss';

import { Empty, Popconfirm, Input } from '@components';
import AddTagButton from './addTagButton';


const DashboardTags = () => {
  return (
    <div className="d-tags">
      <div>
        <AddTagButton></AddTagButton>
      </div>
      <p className="totalCount">目前共计123个标签</p>
      <Empty></Empty>
    </div>
  )
};

export default DashboardTags;
