import React, {useRef} from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Input, Message } from '@components';
import { ADD_TAG } from '@graphql';

const EditBtn = ({name, id}) => {
  let ref = useRef();
  return (
    <Popconfirm destroyTooltipOnHide title="编辑标签" content={<Input ref={ref} autoFocus placeholeder="enter tag new name"></Input>} placement="top" onConfirm={() => {
      console.log(123)
    }} >
      <i className="iconfont icon-bianji"></i>
    </Popconfirm>
  )
}

export default EditBtn;