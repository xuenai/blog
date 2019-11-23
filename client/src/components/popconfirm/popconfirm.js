import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';

import '../popover/popover.scss';

import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';

const transitionName = 'zoom-big';
const prefixCls = 'h-popover';

const Popconfirm = forwardRef((props, ref) => {
  let { title, okText, content, cancelText, icon, onCancel, onConfirm, visible, disabled, onVisibleChange, ...rest } = props;
  const [newVisible, setNewVisible] = useState(!!visible);
  /**
   * 点击取消
   * @param {event} e
   */
  function onCancelHandle(e) {
    setVisible(false, e)
    onCancel && onCancel(e);
  }
  /**
   * 点击确定
   * @param {event} e
   */
  function onConfirmHandle(e) {
    setVisible(false, e)
    onConfirm && onConfirm(e)
  }
  /**
   * 弹窗显隐状态变更
   * @param {boolean} e 弹窗显隐状态
   */
  function onVisibleChangeHandle(visible) {
    if (disabled) {
      return;
    }
    setVisible(visible);
  };
  // 设置显隐状态
  function setVisible(visible, e) {
    if (!('visible' in props)) {
      setNewVisible(visible);
    }
    if (onVisibleChange) {
      onVisibleChange(visible, e);
    }
  }
  const overlay = (
    <div>
      <div className={`${prefixCls}-inner-content`}>
        <div className={`${prefixCls}-message`}>
          <Icon type={icon} size={14}></Icon>
          <div className={`${prefixCls}-message-title`}>{title}</div>
        </div>
        {
          content && <div className={`${prefixCls}-inner-content-content`}>{content}</div>
        }
        <div className={`${prefixCls}-buttons`}>
          <Button onClick={onCancelHandle} size="small">
            {cancelText}
          </Button>
          <Button onClick={onConfirmHandle} size="small">
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <Tooltip visible={!('visible' in props) ? newVisible : props.visible} onVisibleChange={onVisibleChangeHandle} prefixCls={prefixCls} ref={ref} transitionName={transitionName} {...rest} overlay={overlay}></Tooltip>
  )
});

Popconfirm.defaultProps = {
  title: '',
  placement: 'top',
  cancelText: '取消',
  okText: '确定',
  icon: 'warning',
  trigger: 'click',
  onConfirm() { },
  onCancel() { },
  disabled: false,
  destroyTooltipOnHide: true,
  content: '',
}

Popconfirm.propTypes = {
  // 需要展示的标题
  title: PropTypes.string,
  // 弹窗文本内容
  content: PropTypes.any,
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
  // 默认是否展示
  visible: PropTypes.bool,
  // 点击 Popconfirm 子元素是否弹出气泡确认框
  disabled: PropTypes.bool,
  // 展示隐藏时触发
  onVisibleChange: PropTypes.func,
}

export default Popconfirm;