import React from 'react';
import './list.scss';

import ListItem from '../list-item';
import Empty from '../empty'

const List = ({ list }) => {
  return (
    <>
    {
      list.legnth ? 
      <div className="list">
        {
          list.map(item => <ListItem path={`/dashboard/detail/${item.id}`} data={item}></ListItem>)
        }
      </div> : <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
    }
    </>
  )
};

export default List;