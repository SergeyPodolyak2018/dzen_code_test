import { TMain } from '../definitions/main';

export const MMain: TMain = {
  status: 'loading',
  articles: [],
  activArticle: -1,
  activeArticleData: null,
  user: { name: '', email: '' },
  mainComments: {
    comments: [],
    filter: {
      page: 0,
      limit: 20,
      total: 100,
      orderBy: 'created_time',
      orderDirection: 'DESC',
    },
  },
};
