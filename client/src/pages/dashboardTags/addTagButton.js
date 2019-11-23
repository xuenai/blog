import React, { useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Popconfirm, Input, Message } from '@components';
import { ADD_TAG, TAGS_QUERY } from '@graphql';

const AddTagButton = ({ onChange }) => {
  let ref = useRef()
  // eslint-disable-next-line
  const [addTag, { data }] = useMutation(ADD_TAG, {
    update(cache, { data: { addTag } }) {
      const { tags } = cache.readQuery({ query: TAGS_QUERY });
      Message.success({ content: '新增标签成功！', key: `add_tag_${addTag.id}` });
      onChange && onChange();
      cache.writeQuery({
        query: TAGS_QUERY,
        data: { tags: tags.concat([addTag]) },
      });
    }
  });
  return (
    <Popconfirm destroyTooltipOnHide title="新增标签" content={<Input ref={ref} autoFocus placeholeder="enter tag name"></Input>} placement="bottom" onConfirm={() => {
      if (!ref.current.value.length) {
        Message.error('请输入标签名');
        return false
      }
      addTag({ variables: { name: ref.current.value } });
    }} >
      <span className="h-button new-btn"><i className="iconfont icon-maobi"></i>新增标签</span>
    </Popconfirm>
  )
};


export default AddTagButton;