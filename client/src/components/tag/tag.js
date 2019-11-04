import React from 'react';
import PropTypes from 'prop-types';

import './tag.scss';

import EditBtn from './tagEditButton';
import DeleteBtn from './tagDeleteButton';

const Tag = ({ children, editable, deletable, onClick, id, name }) => {
  return (
    <span className='h-tag' onClick={onClick}>
      {children ? children : 'tag'}
      {
        editable && <EditBtn name={name} id={id}></EditBtn>
      }
      {
        deletable && <DeleteBtn name={name} id={id}></DeleteBtn>
      }
    </span>
  )
};

Tag.defaultProps = {
  editable: false,
  deletable: false,
  color: '',
  onClick() { },
  id: '',
  name: '',
};

Tag.propTypes = {
  editable: PropTypes.bool,
  deletable: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
}

export default Tag;