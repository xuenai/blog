import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './page.scss';

// 上一页 1 ... 三个按扭展示
const getPagesPre = ({ current, disabled, space, onChange }) => {
  let halfSpace = parseInt(space / 2);
  let pre = [];
  // 添加 < 按钮
  let preCls = clsx({
    'pagination-pre': true,
    disabled: current === 1 || disabled
  })
  let preBtn = (
    <li className={preCls} key={`pagination-item-${current}-pre`} onClick={() => {
      current > 1 && !disabled && onChange(current - 1);
    }}>
      <span className="iconfont icon-pre"></span>
    </li>
  );
  pre.push(preBtn);

  // 添加 首页
  let cls = clsx({
    'pagination-number': true,
    active: current === 1,
    disabled
  })
  pre.push(<li className={cls} key={`pagination-item-${current}-1`} onClick={() => !disabled && onChange(1)}>1</li>)

  // 添加 ... 按钮
  if (current - halfSpace - 2 >= 1) {
    pre.push(<li className="pagination-space" key={`pagination-item-${current}-space-pre`}>…</li>)
  }
  return pre;
};

// ... 最后页 下一页按钮展示
const getPagesNext = ({ current, total, disabled, space, onChange }) => {
  let next = [];
  let halfSpace = parseInt(space / 2);

  // 添加 ... 按钮
  if (current + halfSpace + 2 <= total) {
    next.push(<li className="pagination-space" key={`pagination-item-${current}-space-next`}>…</li>);
  }

  // 添加 尾页 按钮
  // 当总页数为1时不再添加总数页码
  if (total !== 1) {
    let cls = clsx({
      'pagination-number': true,
      active: current === total,
      disabled
    });
    next.push(<li className={cls} key={`pagination-item-${current}-${total}`} onClick={() => !disabled && onChange(total)}>{total}</li>)
  }

  // 添加 > 按钮
  let nextCls = clsx({
    'pagination-next': true,
    disabled: current === total || disabled
  })
  next.push(<li className={nextCls} key={`pagination-item-${current}-next`} onClick={() => {
    current < total && !disabled && onChange(current + 1);
  }}>
    <span className="iconfont icon-next"></span>
  </li>)
  return next;
}

// 获取分页器中间的页码按钮
const getPages = ({ current, total, disabled, space, onChange }) => {
  let pages = [];
  let start = 1;
  let end = 1;
  let halfSpace = parseInt(space / 2);

  // 判断中间页码起始位置
  // 依照当前页码计算开始位置 然后再根据开始位置 计算结束位置
  if (current - halfSpace - 1 > 1) {
    start = current - halfSpace;
  } else {
    start = 2;
  }
  end = start + space - 1;
  // 结束位置大于总数了，则以总数-1为结束位置重新计算起始位置
  // 计算时要考虑当前总数是不是小于需要展示的页码数目
  if (end >= total) {
    end = total - 1;
    start = total - space > 1 ? total - space : 2;
  }
  // 新增 < 1 ... 的情况
  let pre = getPagesPre({ current, total, disabled, space, onChange });
  pages = pages.concat(pre);

  // 添加中间按钮
  for (let i = start; i <= end; i++) {
    let cls = clsx({
      'pagination-number': true,
      active: current === i,
      disabled
    })
    pages.push(<li className={cls} key={`pagination-item-${current}-${i}`} onClick={() => !disabled && onChange(i)}>{i}</li>)
  }
  // 添加  ... 尾页 > 按钮
  let next = getPagesNext({ current, total, disabled, space, onChange });
  pages = pages.concat(next);

  return pages;
}

// 分页器组件
const Page = ({ current, total, disabled, hideOnSinglePage, space, onChange }) => {
  let pages = getPages({ current, total, disabled, space, onChange })
  let pageIsHide = (hideOnSinglePage && total === 1) || (total === 0)
  return (
    pageIsHide ? null :
      <ul className="pagination">
        {pages}
      </ul>
  )
};

Page.defaultProps = {
  current: 1,
  total: 1,
  space: 3,
  disabled: false,
  hideOnSinglePage: false,
  onChange() { }
};

Page.propTypes = {
  current: PropTypes.number, // 当前页数
  total: PropTypes.number, // 数据总数
  space: PropTypes.number, // 除首位页外展示的页码个数 最好为大于3奇数
  disabled: PropTypes.bool, // 禁用分页
  hideOnSinglePage: PropTypes.bool, // 只有一页时是否隐藏分页器
  onChange: PropTypes.func, // 页码改变的回调，参数是改变后的页码
}

export default Page;

// 分页器用法
// <Page current={current} total={10} onChange={e => setCurrent(e)}></Page>