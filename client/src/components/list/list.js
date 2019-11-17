import React from 'react';
import Prism from 'prismjs';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import './list.scss';

import ListItem from '../list-item';
import Empty from '../empty'

const List = ({ list }) => {
  if (list) {
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    <>
    {
      list.length ?
      <TransitionGroup enter appear>
      {
        list.map(item =>
          <CSSTransition
            timeout={400}
            key={item.id}
            classNames="article"
          >
            <ListItem path={`/blog/detail/${item.id}`} data={item}></ListItem>
          </CSSTransition>
        )
      }
      </TransitionGroup>: <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
    }
    </>
  )
};

export default List;