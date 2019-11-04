import { PubSub } from 'apollo-server-koa';

export const NEW_ARTICLE = 'newArticle';
export const NEW_TAG = 'newTag';

export const pubsub = new PubSub();
