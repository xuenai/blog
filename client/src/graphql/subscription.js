import gql from 'graphql-tag';

// 新增标签
export const TAG_ADD_SUBSCRIPTION = gql`
  subscription OnTagAdded {
    newTag {
      tag {
        id
        name
      }
      total
    }
  }
`;