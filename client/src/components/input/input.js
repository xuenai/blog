import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './input.scss';

import { areEqual } from '@config'

const Input = forwardRef(({ type, className, disabled, placeholder, onChange, onEnter, ...rest }, ref) => {
  return (
    <div className={`input-wrapper ${className}`}>
      <input ref={ref} className="input" type={type} disabled={disabled} placeholder={placeholder} onChange={onChange && (e => onChange(e.currentTarget.value))} onKeyUp={
        e => {
          if (e.nativeEvent.keyCode === 13) {
            onEnter && onEnter();
          }
        }
      } {...rest} />
    </div>
  )
})

Input.defalutProps = {
  type: 'text',
  disabled: false,
  placeholder: '',
  onEnter() { },
  onChange() { }
}

Input.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func
}

export default React.memo(Input, areEqual);