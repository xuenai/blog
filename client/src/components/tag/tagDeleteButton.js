import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Message } from '@components';
import { DELETE_TAG, ARTICLES_AND_TAGS } from '@graphql';

const DeleteBtn = ({ name, id, onChange }) => {
  const [deleteTag, { data }] = useMutation(DELETE_TAG, {
    update(cache, { data: { deleteTag } }) {
      let { tags, articles } = cache.readQuery({ query: ARTICLES_AND_TAGS });
      articles.map(article => {
        article.tags = article.tags.filter(tag => tag.id !== deleteTag.id);
        return article
      })
      cache.writeQuery({
        query: ARTICLES_AND_TAGS,
        data: { tags: tags.filter(tag => deleteTag.id !== tag.id), articles },
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