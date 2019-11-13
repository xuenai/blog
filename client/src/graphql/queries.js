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

// 获取后台自己的文章列表
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
// export const ARTICLES_AND_TAGS = gql`
//   query ownArticles($page: Int, $pageSize: Int, $filter: String) {
//     ownArticles(page: $page, pageSize: $pageSize, filter: $filter) {
//       articles {
//         id
//         title
//         content
//         formatDate
//         tags
//       }
//       total
//       current
//       totalPage
//     }
//   }
// `;

// 获取自己的文章详情
export const OWN_ARTICLE_DETAIL = gql`
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

export const NEW_ARTICLE_TAGS_QUERY = gql`
  {
    tags {
      label: name
      value: id
    }
  }
`;