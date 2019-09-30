import React from 'react';
import {Link} from 'react-router-dom';

import './list-item.scss';

const ListItem = () => {
  return (
    <div className="list-item">
      <h3 className="list-item-title">
        <Link className="list-item-link" to="/detail/2">今日诗词——诗词实时智能推荐</Link>
      </h3>
      <div className="list-item-meta">
        <span>发表于</span>
        <time>2019-9-12</time>
        <span>&nbsp;|&nbsp;</span>
        <span>分类于</span>
        <span>Javascript</span>
      </div>
      <p className="list-item-summary">一个可以根据当前情景智能推荐古诗词的一言 API，很有意思。</p>
    </div>
  )
};

export default ListItem;