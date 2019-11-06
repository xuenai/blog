// 订阅部分
import { NEW_ARTICLE, NEW_TAG, EDITED_TAG, DELETED_TAG, pubsub } from '../subscription';

const newArticle = {
  subscribe: () => pubsub.asyncIterator(NEW_ARTICLE)
}

// 新增标签
const newTag = {
  subscribe: () => pubsub.asyncIterator(NEW_TAG)
}
// 编辑标签
const editedTag = {
  subscribe: () => pubsub.asyncIterator(EDITED_TAG)
}

// 删除标签
const deletedTag = {
  subscribe: () => pubsub.asyncIterator(DELETED_TAG)
}


export default { newArticle, newTag, editedTag, deletedTag }