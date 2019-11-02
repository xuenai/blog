import React from 'react';
import Notification from 'rc-notification';
import Icon from '../icon';

import './message.scss';

let defaultDuration = 3;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = 'h-message';
let transitionName = 'move-up';
let getContainer;
let maxCount;

function getMessageInstance(callback) {
  if (messageInstance) {
    callback(messageInstance);
    return;
  }
  Notification.newInstance(
    {
      prefixCls,
      transitionName,
      style: { top: defaultTop }, // 覆盖原来的样式
      getContainer,
      maxCount,
    },
    (instance) => {
      if (messageInstance) {
        callback(messageInstance);
        return;
      }
      messageInstance = instance;
      callback(instance);
    },
  );
}


function notice(args) {
  const duration = args.duration !== undefined ? args.duration : defaultDuration;
  const target = key++;
  const closePromise = new Promise(resolve => {
    const callback = () => {
      if (typeof args.onClose === 'function') {
        args.onClose();
      }
      return resolve(true);
    };
    getMessageInstance(instance => {
      const iconNode = (
        <Icon type={args.type} size={18} className={`${prefixCls}-icon`}></Icon>
      );
      instance.notice({
        key: args.key || target,
        duration,
        style: {},
        content: (
          <div
            className={`${prefixCls}-custom-content${
              args.type ? ` ${prefixCls}-${args.type}` : ''
              }`}
          >
            {iconNode}
            <span className={`${prefixCls}-custom-content-text`}>{args.content}</span>
          </div>
        ),
        onClose: callback,
      });
    });
  });
  const result = () => {
    if (messageInstance) {
      messageInstance.removeNotice(target);
    }
  };
  result.then = (filled, rejected) =>
    closePromise.then(filled, rejected);
  result.promise = closePromise;
  return result;
}

function isArgsProps(content) {
  return typeof content === 'object' && !!content.content;
}

const api = {
  open: notice,
  config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
    if (options.transitionName !== undefined) {
      transitionName = options.transitionName;
      messageInstance = null; // delete messageInstance for new transitionName
    }
    if (options.maxCount !== undefined) {
      maxCount = options.maxCount;
      messageInstance = null;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};

['success', 'info', 'warning', 'error', 'loading'].forEach(type => {
  api[type] = (content, duration, onClose) => {
    if (isArgsProps(content)) {
      return api.open({ ...content, type });
    }

    if (typeof duration === 'function') {
      onClose = duration;
      duration = undefined;
    }

    return api.open({ content, duration, type, onClose });
  };
});

api.warn = api.warning;

export default api;