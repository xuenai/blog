import gql from 'graphql-tag';

// 检测是否登录
export const ME_QUERY = gql`
  {
    me {
      code
      isAdmin
    }
  }
`;

// 获取文章列表和标签列表
export const ARTICLES_AND_TAGS = gql`
  {
    articles {
      id
      title
      formatDate
      updatedAt
      content
      summary
      tags {
        id
        name
      }
    }
    tags{
      id
      name
    }
  }
`;

// 获取日志归档（按年划分的）
export const ARCHIVES = gql`
{
  archives{
    year: _id
    articles{
      id
      title
      updatedAt
      summary
    }
  }
}
`;

// 获取后台自己的文章列表
export const ARTICLES = gql`
  {
    articles {
      id
      title
      formatDate
      updatedAt
      content
      summary
      tags {
        id
        name
      }
    }
  }
`;

// 获取自己的文章详情
export const ARTICLE_DETAIL = gql`
  query article($id: ID!) {
    article(id: $id) {
      id
      title
      summary
      content
      formatDate
      tags {
        id
        name
      }
    }
  }
`;

// 获取编辑页面的日志详情和标签列表
export const GET_DETAIL_TAGS = gql`
query getArticleAndTags($id: ID) {
  article(id: $id) {
      id
      title
      summary
      content
      tags {
        id
        name
      }
    }
    tags {
      label: name
      value: id
    }
  }
`;

export const TAGS_QUERY = gql`
  {
    tags {
      name
      id
    }
  }
`;

export const TAG_ARTICLES = gql`
  query getTagArticles($id: ID) {
    articles(tag: $id) {
        id
        title
        summary
        updatedAt
        tags {
          id
          name
        }
      }
      tag(id: $id) {
        id
        name
      }
  }
`;

export const SEARCH_ARTICLES = gql`
  query getSearchArticles($filter: String) {
    articles(filter: $filter) {
        id
        title
        summary
        updatedAt
        tags {
          id
          name
        }
      }
  }
`;

export const NEW_ARTICLE_TAGS_QUERY = gql`
  {
    tags {
      label: name
      value: id
    }
  }
`;