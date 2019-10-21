import React from 'react';
import PropTypes from 'prop-types';

import './input.scss';


const Input = ({ type, className, disabled, placeholder, onChange }) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input className="input" type={type} disabled={disabled} placeholder={placeholder} onChange={onChange && (e => onChange(e.currentTarget.value))}/>
    </div>
  )
}

Input.defalutProps = {
  type: 'text',
  disabled: false,
  placeholder: '',
  onChange: function () {}
}

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Input;