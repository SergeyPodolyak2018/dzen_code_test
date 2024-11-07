import CONSTANTS from '../constants/constants';
import { TArticle, TArticleShort, TComment, TUser } from '../definitions/main';
import { getQueryStringByObject } from '../utils/utils';

class RestAPI {
  private readonly base_uri: string;

  constructor() {
    this.base_uri = CONSTANTS.baseUri;
  }

  async getAllArticles(): Promise<{ data: TArticleShort[] }> {
    return await fetch(`${this.base_uri}${CONSTANTS.articles}`)
      .then((res) => res.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async getUserInfo(): Promise<{ data: TUser }> {
    return await fetch(`${this.base_uri}${CONSTANTS.user}`)
      .then((res) => res.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }
  async getArticle(id: number): Promise<{ data: TArticle[] }> {
    return await fetch(`${this.base_uri}${CONSTANTS.articles}/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async postComment(data: FormData): Promise<{ data: TComment }> {
    return await fetch(`${this.base_uri}${CONSTANTS.comments}`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async getComments(data: {
    article_id: number;
    comment_id: number;
    page?: number;
    limit?: number;
    order_by?: string;
    orderDirection?: string;
  }): Promise<{ data: TComment[] }> {
    return await fetch(
      `${this.base_uri}${CONSTANTS.comments}${getQueryStringByObject({
        ...data,
      })}`
    )
      .then((res) => res.json())
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}

const restApi = new RestAPI();
export default restApi;
