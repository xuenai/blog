import React from 'react';

import './archive.scss';

import { Empty } from '@components';

const Archive = () => {

  return (
    <div className="archive">
      <p>目前共计0篇日志</p>
      <Empty></Empty>
    </div>
  )
}

export default Archive;