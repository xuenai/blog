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
  mutation addArticle($title: String!,$summary: String!, $content: String!, $tags: [ID!]) {
    addArticle(title: $title, summary: $summary, content: $content, tags: $tags) {
      id
      title
      formatDate
      updatedAt
      tags{
        name
        id
      }
    }
  }
`;

// 编辑文章
export const EDIT_ARTICLE = gql`
  mutation editArticle($id: ID!, $title: String!, $summary: String!, $content: String!, $tags: [ID!]) {
    editArticle(id: $id, title: $title, summary: $summary, content: $content, tags: $tags) {
      id
      title
      formatDate
      updatedAt
      content
      tags{
        name
        id
      }
    }
  }
`;

// 删除文章
export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: ID!) {
    deleteArticle(id: $id) {
      id
      title
    }
  }
`

// 新增标签
export const ADD_TAG = gql`
  mutation addTag($name: String!) {
    addTag(name: $name) {
      id
      name
    }
  }
`;

// 编辑标签
export const EDIT_TAG = gql`
  mutation editTag($name: String!, $id: ID!) {
    editTag(name: $name, id: $id) {
      name
      id
    }
  }
`;

// 删除标签
export const DELETE_TAG = gql`
  mutation deleteTag($id: ID!) {
    deleteTag(id: $id) {
      name
      id
    }
  }
`;