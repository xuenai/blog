import React from 'react';
import PropTypes from 'prop-types';

import './tagList.scss';
import Tag from '../tag';
import Empty from '../empty';

const TagList = ({data}) => {
  console.log(data)
  return (
    <div className="tag-list">
      {/* <Tag editable deletable className="tag-item">标签1</Tag> */}
      {
        data.length ?
          data.map(tag => <Tag editable deletable className="tag-item" id={tag.id} name={tag.name}  key={tag.id}>{tag.name}</Tag>) :
          <Empty description="标签空空的..."></Empty>
      }
    </div>
    
  )
};

TagList.defaultProps = {
  data: [],
}

TagList.propTypes = {
  data: PropTypes.array
}

export default TagList;