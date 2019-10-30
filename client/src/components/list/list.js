import React from 'react';
import './list.scss';

import ListItem from '../list-item/list-item';

const List = ({list, path}) => {
  return (
    <div className="list">
      {
        list.map(item => <ListItem path={`/dashboard/detail/${item.id}`} data={item}></ListItem>)
      }
    </div>
  )
};

export default List;