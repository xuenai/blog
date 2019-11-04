// 订阅部分
import { NEW_ARTICLE, NEW_TAG, pubsub } from '../subscription';

const newArticle = {
  subscribe: () => pubsub.asyncIterator(NEW_ARTICLE)
}

const newTag = {
  subscribe: () => pubsub.asyncIterator(NEW_TAG)
}

export default { newArticle, newTag }