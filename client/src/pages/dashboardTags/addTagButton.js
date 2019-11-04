import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Input, Message } from '@components';
import { ADD_TAG } from '@graphql';


const AddTagButton = () => {
  let ref = useRef()

  const [addTag, { data }] = useMutation(ADD_TAG);
  if (data && ref) {
    setTimeout(() => Message.success({content: '新增标签成功！', key: 'add_tag'}))
  }
  return (
    <Popconfirm destroyTooltipOnHide title="新增标签" content={<Input ref={ref} autoFocus placeholeder="enter tag name"></Input>} placement="bottom" onConfirm={() => {
      if (!ref.current.value.length) {
        Message.error('请输入标签名');
        return false
      }
      addTag({ variables: { name: ref.current.value } });
    }} >
      <a className="h-button new-btn"><i className="iconfont icon-maobi"></i>新增标签</a>
    </Popconfirm>
  )
};


export default AddTagButton;