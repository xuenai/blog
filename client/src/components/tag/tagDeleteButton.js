import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Message } from '@components';
import { DELETE_TAG, TAGS_QUERY } from '@graphql';

const DeleteBtn = ({ name, id, onChange }) => {
  const [deleteTag, { data }] = useMutation(DELETE_TAG, {
    update(cache, { data: { deleteTag } }) {
      const { tags } = cache.readQuery({ query: TAGS_QUERY });
      cache.writeQuery({
        query: TAGS_QUERY,
        data: { tags: tags.filter(tag => deleteTag.id !== tag.id) },
      });
    }
  });
  if (data) {
    setTimeout(() => {
      Message.success({ content: `${name} 已删除！`, key: 'delete_tag' })
      onChange && onChange();
    });
  }

  return (
    <Popconfirm destroyTooltipOnHide title="是否删除标签?" placement="top" onConfirm={() => {
      deleteTag({ variables: { id } })
    }} >
      <i className="iconfont icon-delete"></i>
    </Popconfirm>
  )
}

export default DeleteBtn;