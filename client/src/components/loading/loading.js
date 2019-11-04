import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './loading.scss';
import Spin from '../spin';

const Loading = ({ title, className }) => {

  let classString = clsx('h-loading', className)

  return (
    <div className={classString}>
      <Spin size={36}></Spin>
      <div className="h-loading-title">{title}</div>
    </div>
  )
};

Loading.defaultProps = {
  title: '加载中...',
  className: '',
}

Loading.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
}

export default Loading;