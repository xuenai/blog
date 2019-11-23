import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './spin.scss';
import Icon from '../icon';

import {areEqual} from '@config';

const Spin = ({ size, className }) => {
  let classString = clsx('spin', className)
  return (
    <div className={classString}>
      <Icon type="loading" size={size}></Icon>
    </div>
  )
};

Spin.defaultProps = {
  size: 30,
  className: '',
}

Spin.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

export default React.memo(Spin, areEqual);