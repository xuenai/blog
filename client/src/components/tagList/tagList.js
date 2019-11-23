import React from 'react';
import PropTypes from 'prop-types';

import './tagList.scss';
import Tag from '../tag';
import Empty from '../empty';

const TagList = ({ data, onChange }) => {
  return (
    <div className="tag-list">
      {
        data.length ?
          data.map(tag => <Tag editable deletable className="tag-item" onChange={onChange} id={tag.id} name={tag.name} key={tag.id}>{tag.name}</Tag>) :
          <Empty description="你有看到我的标签么，我的标签不见了..."></Empty>
      }
    </div>
  )
};

TagList.defaultProps = {
  data: [],
  onChange() { }
}

TagList.propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func
}

export default TagList;