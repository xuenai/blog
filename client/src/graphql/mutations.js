import gql from "graphql-tag";

export const REGISTER_MUTATUIION = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      code
    }
  }
`;
export const LOGIN_MUTATUIION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      code
      isAdmin
    }
  }
`;
export const LOGOUT_MOTATION = gql`
  mutation logout {
    logout {
      code
    }
  }
`;

export const ADD_ARTICLE = gql`
  mutation addArticle($title: String!,$summary: String!, $content: String!) {
    addArticle(title: $title, summary: $summary, content: $content) {
      title
      summary
      content
      createdAt
      user
    }
  }
`
