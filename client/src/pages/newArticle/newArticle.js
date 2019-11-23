import React, { useState } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import BraftEditor from 'braft-editor';
import { useMutation, useQuery } from '@apollo/react-hooks';
import 'prismjs/components/prism-scss';

import './newArticle.scss';

import { Input, Button, Message, Checkbox } from '@components';
import { ADD_ARTICLE, NEW_ARTICLE_TAGS_QUERY, ARTICLES_AND_TAGS } from '@graphql';
 

const options = {
  syntaxs: [
    {
      name: 'JavaScript',
      syntax: 'javascript'
    },
    {
      name: 'HTML',
      syntax: 'html'
    },
    {
      name: 'CSS',
      syntax: 'css'
    },
    {
      name: 'SCSS',
      syntax: 'scss'
    }
  ]
}

// 设置代码高亮
BraftEditor.use(CodeHighlighter(options))

const NewArticle = ({ history }) => {

  let { data: { tags: allTags } } = useQuery(NEW_ARTICLE_TAGS_QUERY);

  let [articleState, setArticleState] = useState({
    contentEditorState: BraftEditor.createEditorState(''),
    summaryEditorState: BraftEditor.createEditorState(''),
    content: '<p></p>',
    title: '',
    summary: '',
    tags: []
  })

  const [addArticle, { data }] = useMutation(ADD_ARTICLE, {
    update(cache, { data: { addArticle } }) {
      let { articles } = cache.readQuery({ query: ARTICLES_AND_TAGS });
      cache.writeQuery({
        query: ARTICLES_AND_TAGS,
        data: { articles: [addArticle].concat(articles) },
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
        <div className="editor-wrapper">
          <BraftEditor
            value={articleState.summaryEditorState}
            onChange={e => setArticleState({ ...articleState, summaryEditorState: e, summary: e.toHTML() })}
          />
        </div>
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
            value={articleState.contentEditorState}
            onChange={e => setArticleState({ ...articleState, contentEditorState: e, content: e.toHTML() })}
          />
        </div>
        <Button type="submit">保存</Button>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </form>
    </div>
  )
}

export default NewArticle;