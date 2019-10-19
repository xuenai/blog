import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './input.scss';

class Input extends Component {
  static defalutProps = {
    type: 'text',
  }
  render() {
    let { type, className, ...rest } = this.props
    return (
      <div className={`input-wrapper ${className}`}>
        <input className="input" type={type} {...rest} />
      </div>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
}

export default Input;