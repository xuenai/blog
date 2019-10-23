import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

const Button = ({ className, size, children, disabled, type, onClick }) => {
  let classNames = clsx({
    button: true,
    'button-large': size === 'large',
    'button-small': size === 'small'
  })
  return (
    <button className={`${classNames} ${className}`} disabled={disabled} type={type} onClick={() => onClick && onClick()}>{children}</button>
  )
}

Button.defaultProps = {
  className: '',
  size: 'normal',
  disabled: false,
  children: 'Button',
  type: 'button',
  onClick: () => null
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'normal']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
  onClick: PropTypes.func
}

export default Button;