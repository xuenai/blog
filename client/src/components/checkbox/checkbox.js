import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import './checkbox.scss';

const Checkbox = ({ className, children, disabled, checked, onChange }) => {

  let [isChecked, setIsChecked] = useState(checked);

  let wrapperCls = clsx(className, { 'h-checkbox-wrapper': true })

  let checkboxCls = clsx({
    'h-checkbox': true,
    'h-checkbox-checked': isChecked,
    'h-checkbox-disabled': disabled,
  })

  function handleChange(e) {
    if (disabled) {
      return;
    }
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange({
        target: {
          // ...this.props,
          checked: e.target.checked,
        },
        stopPropagation() {
          e.stopPropagation();
        },
        preventDefault() {
          e.preventDefault();
        },
        nativeEvent: e.nativeEvent,
      });
    }
  }

  return (
    <label className={wrapperCls}>
      <span className={checkboxCls}>
        <input type="checkbox" className='h-checkbox-input' onChange={handleChange} checked={isChecked} disabled={disabled} />
        <span className='h-checkbox-inner'></span>
      </span>
      {
        children !== undefined && <span>{children}</span>
      }
    </label>
  )
};

Checkbox.defaultProps = {
  children: '',
  disabled: false,
  checked: false,
  className: '',
  onChange() { }
}

Checkbox.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func
}

export default Checkbox;