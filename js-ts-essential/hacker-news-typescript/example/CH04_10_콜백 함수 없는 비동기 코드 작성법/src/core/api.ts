import { NEWS_URL, CONTENT_URL } from '../config';
import { NewsFeed, NewsDetail } from '../types';

export default class Api {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async request<AjaxResponse>(): Promise<AjaxResponse> {
    const response = await fetch(this.url);
    return (await response.json()) as AjaxResponse;
  }
}

export class NewsFeedApi extends Api {
  constructor() {
    super(NEWS_URL);
  }

  getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}

export class NewsDetailApi extends Api {
  constructor(id: string) {
    super(CONTENT_URL.replace('@id', id));
  }

  getData(): Promise<NewsDetail> {
    return this.request<NewsDetail>();
  }
}
