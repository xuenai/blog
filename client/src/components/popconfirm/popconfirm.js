import React from 'react';
import PropTypes from 'prop-types';

import './popconfirm.scss';

import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';

const transitionName = 'zoom-big'

const Popconfirm = () => {
  return (
    <div>Popconfirm</div>
  )
};

Popconfirm.defaultProps = {
  title: '',
  palcement: 'top',
  cancelText: '取消',
  okText: '确定',
  icon: 'warning',
  trigger: 'click',
  onConfirm() { },
  onCancel() { }
}

Popconfirm.propTypes = {
  // 需要展示的标题
  title: PropTypes.string,
  // 弹窗位置
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']),
  // 取消按钮文字
  cancelText: PropTypes.string,
  // 确定按钮文字
  okText: PropTypes.string,
  // 图标类型
  icon: PropTypes.oneOf(['info', 'error', 'warning', 'success']),
  // 触发方式
  trigger: PropTypes.oneOf(['click', 'hover', 'focus']),
  // 点击确定按钮触发
  onConfirm: PropTypes.func,
  // 点击取消按钮触发
  onCancel: PropTypes.func,
}

export default Popconfirm;