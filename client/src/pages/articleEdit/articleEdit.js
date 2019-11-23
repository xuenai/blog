import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import BraftEditor from 'braft-editor';
import { useMutation, useQuery } from '@apollo/react-hooks';

import 'prismjs/components/prism-scss';

import '../newArticle/newArticle.scss';

import { Input, Button, Message, Checkbox, Loading } from '@components';
import { EDIT_ARTICLE, GET_DETAIL_TAGS, ARTICLES_AND_TAGS } from '@graphql';
 

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

const ArticleEdit = ({ history }) => {
  let { id } = useParams();
  let { loading, data: { tags: allTags, article } } = useQuery(GET_DETAIL_TAGS, {
    variables: { id }
  });

  const [editArticle, { data }] = useMutation(EDIT_ARTICLE, {
    update(cache, { data: { editArticle } }) {
      let { articles } = cache.readQuery({ query: ARTICLES_AND_TAGS });
      let index = articles.findIndex(a => a.id === editArticle.id);
      if (index > -1) {
        articles[index] = editArticle;
      }
      cache.writeQuery({
        query: ARTICLES_AND_TAGS,
        data: { articles },
      });
    }
  });

  let [articleState, setArticleState] = useState({
    contentEditorState: BraftEditor.createEditorState(''),
    summaryEditorState: BraftEditor.createEditorState(''),
    content: '<p></p>',
    title: '',
    summary: '',
    tags: [],
    pageReady: false
  })

  if (loading) {
    return <Loading title="日志查询中..."></Loading>
  }

  if (data) {
    history.go(-1);
    setTimeout(() => Message.success({ content: '编辑日志成功', key: 'edit_article' }));
  }

  if (article && !articleState.pageReady) {
    let { content, title, tags, summary } = article;
    setArticleState({
      contentEditorState: BraftEditor.createEditorState(content),
      summaryEditorState: BraftEditor.createEditorState(summary),
      title,
      content,
      summary,
      tags: tags.map(tag => tag.id),
      pageReady: true
    })
  }

  let { contentEditorState, summaryEditorState, title, tags } = articleState;

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
        editArticle({ variables: { id, title, summary, content, tags } })
      }}>
        <h4>标题</h4>
        <Input className="article-input" defaultValue={title} placeholder="请输入标题" onChange={e => setArticleState({ ...articleState, title: e })}></Input>
        <h4>概要</h4>
        <div className="editor-wrapper">
          <BraftEditor
            value={summaryEditorState}
            onChange={e => setArticleState({ ...articleState, summaryEditorState: e, summary: e.toHTML() })}
          />
        </div>
        {
          allTags.length ?
            <div>
              <h4>标签</h4>
              <div className="article-input">
                <Checkbox.Group value={tags} options={allTags} onChange={e => setArticleState({ ...articleState, tags: e })}></Checkbox.Group>
              </div>
            </div> : null
        }
        <h4>正文</h4>
        <div className="editor-wrapper">
          <BraftEditor
            value={contentEditorState}
            onChange={e => setArticleState({ ...articleState, contentEditorState: e, content: e.toHTML() })}
          />
        </div>
        <Button type="submit">保存</Button>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </form>
    </div>
  )
}

export default ArticleEdit;