import React, { useState, useRef } from 'react';

import { Popconfirm, Input, Message } from '@components';
import { ADD_TAG } from '@graphql';
import { useMutation } from '@apollo/react-hooks';

const AddTagButton = () => {
  let ref = useRef()

  const [addTag, { loading, data }] = useMutation(ADD_TAG);
  if (data) {
    console.log(123);
    // Message.success('123')
  }

  return (
    <Popconfirm title="新增标签"  placement="bottom" onConfirm={() => addTag({ variables: { name: 'ref.current.value' }})} >
      <a className="h-button new-btn"><i className="iconfont icon-maobi"></i>新增标签</a>
    </Popconfirm>
  )
};

export default AddTagButton;