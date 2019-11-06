import gql from 'graphql-tag';

// 暂时订阅全部没用 o(╯□╰)o

// 新增标签
export const TAG_ADD_SUBSCRIPTION = gql`
  subscription OnTagAdded {
    newTag {
      id
      name
    }
  }
`;

// 编辑标签
export const TAG_EDIT_SUBSCRIPTION = gql`
  subscription OnTagEdited {
    editedTag {
      id
      name
    }
  }
`;

// 编辑标签
export const TAG_DELETE_SUBSCRIPTION = gql`
  subscription OnTagDeleted {
    deletedTag {
      id
      name
    }
  }
`;