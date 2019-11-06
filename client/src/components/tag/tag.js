import React from 'react';
import PropTypes from 'prop-types';

import './tag.scss';

import EditBtn from './tagEditButton';
import DeleteBtn from './tagDeleteButton';

const Tag = ({ children, editable, deletable, onClick, id, name, onChange }) => {
  return (
    <span className='h-tag' onClick={onClick}>
      {children ? children : 'tag'}
      {
        editable && <EditBtn onChange={onChange} name={name} id={id}></EditBtn>
      }
      {
        deletable && <DeleteBtn onChange={onChange} name={name} id={id}></DeleteBtn>
      }
    </span>
  )
};

Tag.defaultProps = {
  // 是否可以编辑
  editable: false,
  // 是否可以删除
  deletable: false,
  color: '',
  onClick() { },
  id: '',
  name: '',
  onChange() { },
};

Tag.propTypes = {
  editable: PropTypes.bool,
  deletable: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}

export default Tag;