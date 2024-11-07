import { TComment, TFilter, TMain } from '../definitions/main';

export type TState = { main: TMain };

export type TAction =
  | { type: 'SET_LOADING'; payload: TMain['status'] }
  | { type: 'ADD_ARTICLES'; payload: TMain['articles'] }
  | { type: 'SET_ACTIVE_ARTICLE'; payload: TMain['activArticle'] }
  | { type: 'SET_ACTIVE_ARTICLE_DATA'; payload: TMain['activeArticleData'] }
  | { type: 'SET_MAIN_COMMENTS'; payload: TComment[] }
  | { type: 'SET_USER_INFO'; payload: TMain['user'] }
  | {
      type: 'SET_FILTER';
      payload: TFilter;
    };

export const mainReducer = (state: TState, action: TAction): TState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        main: {
          ...state.main,
          status: action.payload,
        },
      };
    case 'ADD_ARTICLES':
      return {
        ...state,
        main: {
          ...state.main,
          articles: action.payload,
        },
      };
    case 'SET_ACTIVE_ARTICLE':
      return {
        ...state,
        main: {
          ...state.main,
          activArticle: action.payload,
          activeArticleData: null,
        },
      };
    case 'SET_ACTIVE_ARTICLE_DATA':
      return {
        ...state,
        main: {
          ...state.main,
          activeArticleData: action.payload,
        },
      };
    case 'SET_MAIN_COMMENTS':
      return {
        ...state,
        main: {
          ...state.main,
          mainComments: {
            ...state.main.mainComments,
            comments: action.payload,
          },
        },
      };
    case 'SET_USER_INFO':
      return {
        ...state,
        main: {
          ...state.main,
          user: action.payload,
        },
      };
    case 'SET_FILTER':
      return {
        ...state,
        main: {
          ...state.main,
          mainComments: {
            ...state.main.mainComments,
            filter: {
              ...state.main.mainComments.filter,
              ...action.payload,
            },
          },
        },
      };

    default:
      return state;
  }
};
