import gql from 'graphql-tag';

export const ME_QUERY = gql`
  {
    me {
      code
      isAdmin
    }
  }
`