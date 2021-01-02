import axios, { AxiosRequestConfig } from 'axios';
// resumur
export const HTTP_MATCH = /https?:\/\//;
export class ApiService {
  private readonly baseUrl =
    process.env.REACT_APP_BASE_API_URL || 'http://localhost:3333';

  private prepareUrl = (url: string) => {
    if (HTTP_MATCH.test(url)) {
      return url;
    }

    return `${this.baseUrl}${url}`;
  };

  get = (url: string, config?: AxiosRequestConfig) =>
    axios.get(this.prepareUrl(url), config);

  post = (url: string, data?: any, config?: AxiosRequestConfig) =>
    axios.post(this.prepareUrl(url), data, config);

  put = (url: string, data: any, config?: AxiosRequestConfig) =>
    axios.put(this.prepareUrl(url), data, config);

  delete = (url: string, config?: AxiosRequestConfig) =>
    axios.delete(this.prepareUrl(url), config);
}
