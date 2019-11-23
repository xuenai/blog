import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './popover.scss';

import Tooltip from '../tooltip';

const Popover = forwardRef(({ title, prefixCls, content, ...rest }, ref) => {
  return (
    <Tooltip
      ref={ref}
      prefixCls={prefixCls}
      {...rest}
      overlay={
        <div>
          {title && <div className={`${prefixCls}-title`}>{title}</div>}
          <div className={`${prefixCls}-inner-content`}>{content}</div>
        </div>
      }
    />
  )
});

Popover.defaultProps = {
  prefixCls: 'h-popover',
  placement: 'top',
  trigger: 'click',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  title: '',
  content: '',
}

Popover.propTypes = {
  prefixCls: PropTypes.string,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  transitionName: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  title: PropTypes.string,
  content: PropTypes.any,
}

export default Popover;