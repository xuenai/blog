import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import './input.scss';


const Input = forwardRef(({type, className, disabled, placeholder, onChange, ...rest }, ref) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input ref={ref} className="input" type={type} disabled={disabled} placeholder={placeholder} onChange={onChange && (e => onChange(e.currentTarget.value))} {...rest}/>
    </div>
  )
})

Input.defalutProps = {
  type: 'text',
  disabled: false,
  placeholder: '',
  onChange() { }
}

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default Input;