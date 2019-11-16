import React from 'react';

import './archive.scss';

import { Empty } from '@components';

const Archive = () => {

  return (
    <div className="archive">
      <p>目前共计0篇日志</p>
      <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
    </div>
  )
}

export default Archive;