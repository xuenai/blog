import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Checkbox from './checkbox';

import './group.scss';
import { areEqual } from '@config';

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

const Group = ({ className, value, options, disabled, onChange, children }) => {
  let [groupValue, setGroupValue] = useState(value || []);
  let newOption = getOptions(options);

  /**
   * toggleOption 单个checkbox点击时
   * @param {boolean} checked 当前的checkbox是否选中
   * @param {object} option 处理后的options数组中的单个对象
   */
  function toggleOption(checked, option) {
    const optionIndex = groupValue.indexOf(option.value);
    const newValue = [...groupValue];
    if (optionIndex === -1) {
      newValue.push(option.value);
    } else {
      newValue.splice(optionIndex, 1);
    }
    setGroupValue(newValue);
    // 判断是否有onchange事件如果有将新的选中的值返回去
    if (onChange) {
      onChange(
        newValue
          .sort((a, b) => {
            const indexA = newOption.findIndex(opt => opt.value === a);
            const indexB = newOption.findIndex(opt => opt.value === b);
            return indexA - indexB;
          }),
      );
    }
  }

  // 获取需要展示的checkbox列表
  if (options && options.length > 0) {
    children = newOption.map(option => (
      <Checkbox
        key={option.value.toString()}
        disabled={disabled}
        checked={groupValue.indexOf(option.value) !== -1}
        onChange={e => toggleOption(e.target.checked, option)}
        className='h-checkbox-group-item'
      >
        {option.label}
      </Checkbox>
    ));
  }

  // 设置group的类名
  let classString = clsx({
    'h-checkbox-group-wrapper': true,
  }, className)

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

export default React.memo(Group, areEqual);