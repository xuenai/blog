import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Input, Message } from '@components';
import { EDIT_TAG, TAGS_QUERY } from '@graphql';

const EditBtn = ({ name, id, onChange }) => {
  let ref = useRef();

  const [editTag, { data }] = useMutation(EDIT_TAG, {
    update(cache, { data: { editTag } }) {
      const { tags } = cache.readQuery({ query: TAGS_QUERY });
      let index = tags.findIndex(tag => tag.id === editTag.id);
      if (index > -1) {
        tags[index] = editTag;
      }
      cache.writeQuery({
        query: TAGS_QUERY,
        data: { tags },
      });
    }
  });
  if (data && ref) {
    setTimeout(() => {
      Message.success({ content: '标签编辑成功！', key: 'edit_tag' });
      onChange && onChange();
    });
  }

  return (
    <Popconfirm destroyTooltipOnHide title="编辑标签" content={<Input defaultValue={name} ref={ref} autoFocus placeholeder="enter tag new name"></Input>} placement="top" onConfirm={() => {
      if (!ref.current.value.length) {
        Message.error('标签名字不能为空');
        return false
      }
      editTag({ variables: { name: ref.current.value, id } });
    }} >
      <i className="iconfont icon-bianji"></i>
    </Popconfirm>
  )
}

export default EditBtn;