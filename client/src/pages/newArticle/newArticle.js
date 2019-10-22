import React, { useState, useRef } from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { useMutation } from '@apollo/react-hooks';

import './newArticle.scss';

import { Input, Button, Toast } from '@components';
import { ADD_ARTICLE } from '@graphql'

let handleLoading;
const NewArticle = () => {
  const [editorState, setEditorState] = useState('');
  let [outputHTML, setOutputHTML] = useState('<p></p>');
  let [title, setTitle] = useState('');
  let [summary, setSummary] = useState('');
  const [addArticle, { loading, data }] = useMutation(ADD_ARTICLE);

  if (loading) {
    handleLoading = null;
    handleLoading = Toast.loading('发布中。。。')
  }
  if (!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  // if (data && data.login.code === 0 && !isLogin) {
  //   Toast.success('新增文章成功')
  // }
  return (
    <div className="main-content">
      <div className="article">
        <form onSubmit={event => {
            event.preventDefault();
            event.persist()
            if (!title || !summary || !outputHTML) {
              Toast.error('请将信息补充完整！');
              return false;
            }
            addArticle({ variables: { title, summary, content: outputHTML} })
          }}>
          <h4>文章标题：</h4>
          <Input className="article-input" placeholder="请输入标题" onChange={e => setTitle(e)}></Input>
          <h4>文章简介：</h4>
          <Input className="article-input" placeholder="请输入简介" onChange={e => setSummary(e)}></Input>
          <h4>文章内容：</h4>
          <div className="editor-wrapper">
            <BraftEditor
              value={editorState}
              onChange={e => { setEditorState(e); setOutputHTML(e.toHTML()) }}
            />
          </div>
          <Button type="submit">保存</Button>
          <Button>返回</Button>
        </form>
      </div>
    </div>
  )
}

export default NewArticle