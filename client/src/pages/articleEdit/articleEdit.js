import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import BraftEditor from 'braft-editor';
import { useMutation, useQuery } from '@apollo/react-hooks';

import '../newArticle/newArticle.scss';

import { Input, Button, Message, Checkbox, Loading } from '@components';
import { EDIT_ARTICLE, GET_DETAIL_TAGS, OWN_ARTICLE_LIST } from '@graphql';

// 设置代码高亮
BraftEditor.use(CodeHighlighter())

const ArticleEdit = ({ history }) => {
  let { id } = useParams();
  let { loading, data: { tags: allTags, articleDetail } } = useQuery(GET_DETAIL_TAGS, {
    variables: { id }
  });

  const [editArticle, { data }] = useMutation(EDIT_ARTICLE, {
    update(cache, { data: { editArticle } }) {
      let { ownArticles } = cache.readQuery({ query: OWN_ARTICLE_LIST });
      let index = ownArticles.findIndex(a => a.id === editArticle.id);
      if (index > -1) {
        ownArticles[index] = editArticle;
      }
      cache.writeQuery({
        query: OWN_ARTICLE_LIST,
        data: { ownArticles: ownArticles },
      });
    }
  });

  let [articleState, setArticleState] = useState({
    editorState: BraftEditor.createEditorState(''),
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

  if (articleDetail && !articleState.pageReady) {
    let { content, title, tags, summary } = articleDetail;
    setArticleState({
      editorState: BraftEditor.createEditorState(content),
      title,
      content,
      summary,
      tags: tags.map(tag => tag.id),
      pageReady: true
    })
  }
  let { editorState, title, tags, summary } = articleState;


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
        <Input className="article-input" defaultValue={summary} placeholder="请输入概要" onChange={e => setArticleState({ ...articleState, summary: e })}></Input>
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
            value={editorState}
            onChange={e => setArticleState({ ...articleState, editorState: e, content: e.toHTML() })}
          />
        </div>
        <Button type="submit">保存</Button>
        <Button onClick={() => history.go(-1)}>返回</Button>
      </form>
    </div>
  )
}

export default ArticleEdit