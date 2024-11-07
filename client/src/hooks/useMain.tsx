import React from 'react';

import { AppContext } from '../store/store';
import restApi from '../api/rest';
import { TFilter } from '../definitions/main';

export function useMain() {
  const globalState = React.useContext(AppContext);
  const { state, dispatch } = globalState;

  React.useEffect(() => {
    dispatch({
      type: 'SET_LOADING',
      payload: 'loading',
    });
    getAllArticles();
    getUserInfo();
  }, []);
  React.useEffect(() => {
    getCommentsMain(state.main.activArticle);
  }, [state.main.mainComments.filter]);

  const getAllArticles = () => {
    restApi.getAllArticles().then((resp) => {
      dispatch({
        type: 'ADD_ARTICLES',
        payload: resp.data,
      });
      dispatch({
        type: 'SET_LOADING',
        payload: 'loaded',
      });
    });
  };
  const getUserInfo = () => {
    restApi.getUserInfo().then((resp) => {
      dispatch({
        type: 'SET_USER_INFO',
        payload: resp.data,
      });
    });
  };

  const setActiveArticle = (id: number) => {
    dispatch({
      type: 'SET_ACTIVE_ARTICLE',
      payload: id,
    });
  };

  const getArticle = (id: number) => {
    restApi.getArticle(id).then((data) => {
      dispatch({
        type: 'SET_ACTIVE_ARTICLE_DATA',
        payload: data.data[0],
      });
    });
  };
  const getCommentsMain = (articleId: number) => {
    restApi
      .getComments({
        article_id: articleId,
        comment_id: 0,
        page: state.main.mainComments.filter.page,
        order_by: state.main.mainComments.filter.orderBy,
        limit: state.main.mainComments.filter.limit,
        orderDirection: state.main.mainComments.filter.orderDirection,
      })
      .then((data) => {
        dispatch({
          type: 'SET_MAIN_COMMENTS',
          payload: data.data,
        });
      });
  };
  const submitComment = (form: FormData) => {
    restApi.postComment(form).then(() => {
      getCommentsMain(state.main.activArticle);
    });
  };
  const changeFilter = (data: TFilter) => {
    dispatch({
      type: 'SET_FILTER',
      payload: data,
    });
  };

  return {
    ...state.main,
    getAllArticles,
    setActiveArticle,
    getArticle,
    submitComment,
    getCommentsMain,
    changeFilter,
  };
}
