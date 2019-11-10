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
export const OWN_ARTICLE_LIST = gql`
  {
    ownArticles {
      id
      title
      formatDate
      updatedAt
      tags {
        id
        name
      }
    }
  }
`;
// export const OWN_ARTICLE_LIST = gql`
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
  query articleDetail($id: ID) {
    articleDetail(id: $id) {
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
    articleDetail(id: $id) {
      title
      summary
      content
      formatDate
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