import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

const Button = ({ className, size, children, disabled }) => {
  let classNames = clsx({
    button: true,
    'button-large': size === 'large',
    'button-small': size === 'small'
  })
  return (
    <button className={`${classNames} ${className}`} disabled={disabled}>{children}</button>
  )
}

Button.defaultProps = {
  className: '',
  size: 'normal',
  disabled: false,
  children: 'Button',
  handleClick: () => null
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'normal']),
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Button;