import { PubSub } from 'apollo-server-koa';

export const NEW_ARTICLE = 'newArticle';
export const NEW_TAG = 'newTag';
export const EDITED_TAG = 'editedTag';
export const DELETED_TAG = 'deletedTag';

export const pubsub = new PubSub();
