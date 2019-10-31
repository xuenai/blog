import React, { useState } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import BraftEditor from 'braft-editor';
import { useMutation } from '@apollo/react-hooks';

import './newArticle.scss';

import { Input, Button, Toast, Checkbox } from '@components';
import { ADD_ARTICLE } from '@graphql';

// 设置代码高亮
BraftEditor.use(CodeHighlighter())

let handleLoading;
const NewArticle = ({ history }) => {
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(''));
  let [outputHTML, setOutputHTML] = useState('<p></p>');
  let [title, setTitle] = useState('');
  let [summary, setSummary] = useState('');
  let [tags, setTags] = useState('');
  const [addArticle, { loading, data }] = useMutation(ADD_ARTICLE);
  if (loading) {
    handleLoading = null;
    handleLoading = Toast.loading('发布中。。。')
  }
  if (!loading && handleLoading) {
    setTimeout(handleLoading)
    handleLoading = null;
  }
  if (data && data.addArticle.code === 0) {
    Toast.success('新增文章成功');
    history.go(-1);
  }
  return (
    <div className="article">
      <form onSubmit={event => {
        event.preventDefault();
        event.persist()
        if (!title || outputHTML === '<p></p>') {
          Toast.error('标题和内容不能为空！');
          return false;
        }
        addArticle({ variables: { title, summary, content: outputHTML, tags } })
      }}>
        <h4>标题</h4>
        <Input className="article-input" placeholder="请输入标题" onChange={e => setTitle(e)}></Input>
        <h4>概要</h4>
        <Input className="article-input" placeholder="请输入概要" onChange={e => setSummary(e)}></Input>
        <h4>标签</h4>
        <div className="article-input"><Checkbox>sdf</Checkbox></div>
        <h4>正文</h4>
        <div className="editor-wrapper">
          <BraftEditor
            // controls={controls}
            value={editorState}
            onChange={e => { setEditorState(e); setOutputHTML(e.toHTML()) }}
          />
        </div>
        <Button type="submit">保存</Button>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </form>
    </div>
  )
}

export default NewArticle