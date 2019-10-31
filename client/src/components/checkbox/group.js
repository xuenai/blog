import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Checkbox from './checkbox';

import './group.scss';

/**
 * getOptions
 * @param {string | Array<string>} options Group的渲染项
 */
const getOptions = (options) => {
  return options.map(option => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      }
    }
    return option;
  })
}

const getChildren = ({options, disabled, groupValue, onChange}) => {
  return getOptions(options).map(option => (
    <Checkbox
      key={option.value.toString()}
      disabled={disabled}
      checked={groupValue.indexOf(option.value) !== -1}
      onChange={onChange}
      className='h-checkbox-group-item'
    >
      {option.label}
    </Checkbox>
  ));
}


const Group = ({ className, value, options, disabled, onChange, children }) => {
  let [groupValue, setGroupValue] = useState(value || []);

  if (options && options.length > 0) {
    children = getChildren({options, disabled, groupValue})
  }

  let classString = clsx(className, {
    'h-checkbox-group-wrapper': true,
  })

  return (
    <div className={classString}>
      {children}
    </div>
  )
}

Group.defaultProps = {
  value: [],
  options: [],
  disabled: false,
  children: '',
  className: '',
  onChange() { }
};

Group.propTypes = {
  value: PropTypes.array,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
}

export default Group;