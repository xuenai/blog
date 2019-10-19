import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './button.scss';

class Button extends Component {
  static defaultProps = {
    className: '',
    size: 'normal',
    desabled: false,
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
      <button className={className} disabled={disabled}>{children}</button>
    )
  }
}

Button.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(['large', 'small', 'normal']),
  desabled: PropTypes.bool,
  handleClick: PropTypes.func
}

export default Button;