import React, {useRef} from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Input, Message } from '@components';
import { ADD_TAG } from '@graphql';

const DeleteBtn = ({name, id}) => {
  return (
    <Popconfirm destroyTooltipOnHide title="是否删除标签?" placement="top" onConfirm={() => {
      console.log(123)
    }} >
      <i className="iconfont icon-delete"></i>
    </Popconfirm>
  )
}

export default DeleteBtn;