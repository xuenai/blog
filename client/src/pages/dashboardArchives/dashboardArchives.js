import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import './dashboardArchives.scss';

import {Page, Button} from '@components';

const DashboardArchives = () => {
  let [current, setCurrent] = useState(1);
  return (
    <div className="archives">
      <Link to='/dashboard/new' className="new-btn">
        <Button><i className="iconfont icon-maobi"></i>写日志</Button>
      </Link>
      <p className="totalCount">目前共计13篇日志</p>
      {/* <Page current={current} total={10} onChange={e => setCurrent(e)}></Page> */}
    </div>
  )
};

export default DashboardArchives;
