import React from 'react';
import clsx from 'clsx';

import './timeline.scss';

import { areEqual } from '@config';

const Item = ({ className, ...rest }) => {
  let classString = clsx('h-timeline-item', className);
  return (
    <div className={classString}>
      <div className="h-timeline-item-tail"></div>
      <div className="h-timeline-item-head"></div>
      <div className="h-timeline-item-content" {...rest}></div>
    </div>
  )
}

const Title = ({ className, ...rest }) => {
  let classString = clsx('h-timeline-item-title', className)
  return (
    <div className={classString}>
      <div className="h-timeline-item-tail"></div>
      <div className="h-timeline-item-head"></div>
      <div className="h-timeline-item-content" {...rest}></div>
    </div>
  )
}

const Timeline = ({ className, ...rest }) => {
  let classString = clsx('h-timeline', className)
  return (
    <div className={classString} {...rest}>
    </div>
  )
};

Timeline.Item = Item;
Timeline.Title = Title;

export default React.memo(Timeline, areEqual);