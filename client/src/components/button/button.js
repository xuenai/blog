import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

import Icon from '../icon'

const prefixCls = 'h-button'

const Button = forwardRef(({ className, loading, size, children, disabled, type, onClick }, ref) => {
  let classNames = clsx({
    [`${prefixCls}`]: true,
    [`${prefixCls}-button-large`]: size === 'large',
    [`${prefixCls}-button-small`]: size === 'small'
  })
  return (
    <button ref={ref} className={`${classNames} ${className}`} disabled={loading || disabled} type={type} onClick={() => onClick && onClick()}>
      {loading && <Icon className={`${prefixCls}-loading`} type="loading"></Icon>}
      {children}
    </button>
  )
});

Button.defaultProps = {
  className: '',
  size: 'normal',
  disabled: false,
  children: 'Button',
  type: 'button',
  loading: false,
  onClick() { }
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'normal']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
}

export default Button;