import React from 'react';
import PropTypes from 'prop-types';

import './empty.scss';
import Image from './image';

const Empty = ({ description, children }) => {
  return (
    <div className="empty">
      <div className="empty-image">
        <Image />
      </div>
      <p className="empty-description">{description}</p>
      {children && <div className='empty-footer'>{children}</div>}
    </div >
  )
};

Empty.defaultProps = {
  description: '暂无数据',
}

Empty.propTypes = {
  description: PropTypes.any,
}
export default Empty;