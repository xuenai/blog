import React, { forwardRef } from 'react';
import RcTooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

import './tooltip.scss';


const Tooltip = forwardRef(({ children, trigger, ...rest }, ref) => {
  let newTrigger = [trigger];
  return (
    <RcTooltip ref={ref} trigger={newTrigger} {...rest}>
      {children}
    </RcTooltip>
  )
});

Tooltip.defaultProps = {
  // 鼠标移入后延迟多久触发 单位 秒
  mouseEnterDelay: 0,
  // 鼠标移入后延迟多久触发 单位 秒
  mouseLeaveDelay: 0,
  // 触发方式 'hover','click','focus'
  trigger: 'hover',
  // tooltip展示的内容
  overlay: 'tooltip',
  // tooltip位置
  placement: 'left',
  // 隐藏时销毁
  destroyTooltipOnHide: false,
  // 显示隐藏触发
  onVisibleChange() { },
  // 显示隐藏完成后触发
  afterVisibleChange() { },
  // 卡牌类名
  overlayClassName: '',
  prefixCls: 'h-tooltip',
  transitionName: 'zoom-big-fast',
}

Tooltip.propTypes = {
  mouseEnterDelay: PropTypes.number,
  mouseLeaveDelay: PropTypes.number,
  trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
  overlay: PropTypes.any,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  destroyTooltipOnHide: PropTypes.bool,
  // 用于手动控制浮层显隐
  visible: PropTypes.bool,
  onVisibleChange: PropTypes.func,
  afterVisibleChange: PropTypes.func,
  overlayClassName: PropTypes.string,
  // 默认是否显隐
  defaultVisible: PropTypes.bool,
  prefixCls: PropTypes.string,
  transitionName: PropTypes.string,
}

export default Tooltip;