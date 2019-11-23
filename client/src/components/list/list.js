import React from 'react';
import Prism from 'prismjs';
import { CSSTransition } from 'react-transition-group';

import './list.scss';

import ListItem from '../list-item';
import Empty from '../empty'
import { useStore, areEqual } from '@config';

const List = ({ list }) => {
  const { firstLoad, headerReady } = useStore('menu');
  if (list) {
    setTimeout(() => { Prism.highlightAll() })
  }
  return (
    <CSSTransition timeout={400} classNames="article" in={headerReady && !firstLoad} appear mountOnEnter unmountOnExit >
      {
        list.length ?
          <div>
            {
              list.map(item => <ListItem key={item.id} path={`/blog/detail/${item.id}`} data={item}></ListItem>)
            }
          </div> : <Empty description="你有看到我的日志么，我的日志不见了..."></Empty>
      }
    </CSSTransition>
  )
};

export default React.memo(List, areEqual);