import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

class Button extends Component {
  static defaultProps = {
    className: '',
    size: 'normal',
    disabled: false,
    children: 'Button',
    handleClick: () => null
  }
  render() {
    let { className, size, children, disabled } = this.props;
    let classNames = clsx({
      button: true,
      'button-large': size === 'large',
      'button-small': size === 'small'
    })
    return (
      <button className={`${classNames} ${className}`} disabled={disabled}>{children}</button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'normal']),
  disabled: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Button;