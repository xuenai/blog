import React from 'react';
import {Link} from 'react-router-dom';


import './dashboardTags.scss';

import {Button, Empty} from '@components';

const DashboardTags = () => {
  return (
    <div className="d-tags">
      <Button><i className="iconfont icon-maobi"></i>新增标签</Button>
      <p className="totalCount">目前共计123个标签</p>
      <Empty></Empty>
    </div>
  )
};

export default DashboardTags;
