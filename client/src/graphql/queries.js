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
      articles {
        id
        title
        formatDate
        updatedAt
        tags
      }
      total
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
  query ownArticleDetail($id: ID) {
    ownArticleDetail(id: $id) {
      title
      summary
      content
      formatDate
      tags
    }
  }
`;