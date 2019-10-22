import React, {useState} from 'react';

import './dashboardArchives.scss';

import {Page} from '@components';

const DashboardArchives = () => {
  let [current, setCurrent] = useState(1);
  return (
    <div className="archives">dashboardArchives

      <Page current={current} total={10} onChange={e => setCurrent(e)}></Page>
    </div>
  )
};

export default DashboardArchives;
