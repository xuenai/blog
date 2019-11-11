import React, { useState } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import BraftEditor from 'braft-editor';
import { useMutation, useQuery } from '@apollo/react-hooks';

import './newArticle.scss';

import { Input, Button, Message, Checkbox } from '@components';
import { ADD_ARTICLE, NEW_ARTICLE_TAGS_QUERY, OWN_ARTICLE_LIST } from '@graphql';
import { setTimeout } from 'optimism';

// 设置代码高亮
BraftEditor.use(CodeHighlighter())

const NewArticle = ({ history }) => {

  let { data: { tags: allTags } } = useQuery(NEW_ARTICLE_TAGS_QUERY);
  let [articleState, setArticleState] = useState({
    editorState: BraftEditor.createEditorState(''),
    content: '<p></p>',
    title: '',
    summary: '',
    tags: []
  })

  const [addArticle, { data }] = useMutation(ADD_ARTICLE, {
    update(cache, { data: { addArticle } }) {
      let { ownArticles } = cache.readQuery({ query: OWN_ARTICLE_LIST });
      cache.writeQuery({
        query: OWN_ARTICLE_LIST,
        data: { ownArticles: [addArticle].concat(ownArticles) },
      });
    }
  });

  if (data) {
    history.go(-1);
    setTimeout(() => Message.success({ content: '新增日志成功', key: 'new_article' }));
  }

  if (!allTags) {
    allTags = [];
  }

  return (
    <div className="article">
      <form onSubmit={event => {
        event.preventDefault();
        event.persist()
        let { content, title, tags, summary } = articleState;
        if (!title || content === '<p></p>') {
          Message.error('标题和内容不能为空！');
          return false;
        }
        addArticle({ variables: { title, summary, content, tags } })
      }}>
        <h4>标题</h4>
        <Input className="article-input" placeholder="请输入标题" onChange={e => setArticleState({ ...articleState, title: e })}></Input>
        <h4>概要</h4>
        <Input className="article-input" placeholder="请输入概要" onChange={e => setArticleState({ ...articleState, summary: e })}></Input>
        {
          allTags.length ?
            <div>
              <h4>标签</h4>
              <div className="article-input">
                <Checkbox.Group options={allTags} onChange={e => setArticleState({ ...articleState, tags: e })}></Checkbox.Group>
              </div>
            </div> : null
        }
        <h4>正文</h4>
        <div className="editor-wrapper">
          <BraftEditor
            value={articleState.editorState}
            onChange={e => setArticleState({ ...articleState, editorState: e, content: e.toHTML() })}
          />
        </div>
        <Button type="submit">保存</Button>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </form>
    </div>
  )
}

export default NewArticle