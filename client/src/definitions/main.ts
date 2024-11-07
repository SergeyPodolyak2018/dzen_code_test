export type TMain = {
  status: 'loading' | 'loaded';
  articles: TArticleShort[];
  activArticle: number;
  activeArticleData: TArticle | null;
  user: TUser;
  mainComments: {
    comments: TComment[];
    filter: {
      page: number;
      limit: number;
      total: number;
      orderBy: 'created_time' | 'user_name' | 'user_email';
      orderDirection: 'ASC' | 'DESC';
    };
  };
};

export type TCommentsTree = TComment & {
  subComents: TCommentsTree;
};
export type TComment = {
  id: number;
  text: string;
  article_id: number;
  file_id: number | null;
  user_id: number;
  user_name: string;
  created_time: number;
  subCommentsQuantity: number;
  file_path: string | null;
  user_email: string;
};
export type TArticleShort = {
  id: number;
  title: string;
  created_time: string;
};
export type TArticle = {
  id: number;
  title: string;
  content: string;
  created_time: number;
};
export type TUser = {
  name: string;
  email: string;
};

export type TFilter = {
  page?: number;
  limit?: number;
  orderBy?: 'created_time' | 'user_name' | 'user_email';
  orderDirection?: 'ASC' | 'DESC';
};
