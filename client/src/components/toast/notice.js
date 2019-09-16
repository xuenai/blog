import React from 'react';
import Spin from '../spin/spin'

const icons = {
  info: 'icon-info-circle-fill',
  success: 'icon-check-circle-fill',
  warning: 'icon-warning-circle-fill',
  error: 'icon-close-circle-fill',
}

const Notice = ({ type, content }) => {
  let icon;
  if (type === 'loading') {
    icon = <Spin size={16}></Spin>;
  } else {
    icon = (
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#${icons[type]}`} />
      </svg>
    )
  }
  return (
    <div className={`toast-notice ${type}`}>
      {
        icon
      }
      <span>{content}</span>
    </div>
  )
}

export default Notice