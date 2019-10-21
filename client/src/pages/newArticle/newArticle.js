import React, { useState, useRef } from 'react';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import { useMutation } from '@apollo/react-hooks';

import './newArticle.scss';

import { Input, Button } from '@components';
import { ADD_ARTICLE } from '@graphql'

const NewArticle = () => {
  const [editorState, setEditorState] = useState('');
  let [outputHTML, setOutputHTML] = useState('<p></p>');
  return (
    <div className="main-content">
      <div className="article">
        <h4>文章标题：</h4>
        <Input className="article-input" placeholder="请输入标题" onChange={e => console.log(e)}></Input>
        <h4>文章简介：</h4>
        <Input className="article-input" placeholder="请输入简介"></Input>
        <h4>文章内容：</h4>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={e => { setEditorState(e); setOutputHTML(e.toHTML()) }}
          />
        </div>
        {/* <Button onClink={addArticle('标题', '简介', '内容')}>保存</Button> */}
        <Button>返回</Button>
      </div>
    </div>
  )
}

export default NewArticle