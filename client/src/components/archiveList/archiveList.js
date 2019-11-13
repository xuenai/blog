import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';

import './archiveList.scss';

import { Tooltip, Popconfirm, Message } from '@components';
import { DELETE_ARTICLE, ARTICLES_AND_TAGS } from '@graphql';

const ArchiveList = ({ list }) => {

  const [deleteArticle, { data }] = useMutation(DELETE_ARTICLE, {
    update(cache, { data: { deleteArticle } }) {
      let { articles } = cache.readQuery({ query: ARTICLES_AND_TAGS });
      cache.writeQuery({
        query: ARTICLES_AND_TAGS,
        data: { articles: articles.filter(article => article.id !== deleteArticle.id) },
      });
    }
  });

  if (data) {
    setTimeout(() => {
      Message.success({ content: `《${data.deleteArticle.title}》已删除！`, key: `delete_article_${data.deleteArticle.id}` })
    });
  }

  return (
    <div className="d-article-list">
      {
        list.map(item => (
          <div className="d-article-item" key={item.id}>
            <h3 className="d-article-item-title">
              <Link className="d-article-item-link" to={`/dashboard/detail/${item.id}`}>{item.title}</Link>
              {/* 编辑按钮 */}
              <Link rel="stylesheet" to={`/dashboard/edit/${item.id}`} className="d-article-item-edit">
                <Tooltip placement="top" overlay={<span>点击对《{item.title}》进行编辑</span>}>
                  <span className="iconfont icon-edit"></span>
                </Tooltip>
              </Link>
              {/* 删除按钮 */}
              <span className="d-article-item-edit">
                <Popconfirm destroyTooltipOnHide title={`是否删除《${item.title}》?`} placement="top" onConfirm={() => {
                  deleteArticle({ variables: { id: item.id } })
                }} >
                  <i className="iconfont icon-delete"></i>
                </Popconfirm>
              </span>

            </h3>
            {
              item.tags.length ?
                <p>
                  <span className="iconfont icon-biaoqian"></span>
                  <span>
                    {
                      item.tags.map(tag => <span className="d-article-item-tag" key={tag.id}>{tag.name}</span>)
                    }
                  </span>
                </p> : null
            }
            <div className="d-article-item-date">{moment(item.updatedAt - 0).format('YYYY-MM-DD')}</div>
          </div>
        ))
      }
    </div>
  )
};

export default ArchiveList;