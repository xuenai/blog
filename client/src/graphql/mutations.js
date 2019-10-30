import gql from "graphql-tag";

// 注册
export const REGISTER_MUTATUIION = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      code
    }
  }
`;

// 登录
export const LOGIN_MUTATUIION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      code
      isAdmin
    }
  }
`;

// 退出登录
export const LOGOUT_MOTATION = gql`
  mutation logout {
    logout {
      code
    }
  }
`;

// 新增文章
export const ADD_ARTICLE = gql`
  mutation addArticle($title: String!,$summary: String!, $content: String!, $tags: String!) {
    addArticle(title: $title, summary: $summary, content: $content, tags: $tags) {
      code
    }
  }
`
