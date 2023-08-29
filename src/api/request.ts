import axios from 'axios';

/**
 * 接口请求
 */
class HttpRequest {
  constructor() {}
  /**
   * 是否处理url请求路径
   */
  isDealUrl(url: string) {
    // 开发环境不需要转换
    if (import.meta.env.MODE === 'development') {
      return false;
    }
    // 访问资源完整路径的不需要转换
    const reg = /\.(json|svg|png)$/i;
    if (reg.test(url.toLowerCase())) {
      return false;
    }
    //  import.meta.env.MODE === 'production'
    return true;
  }
  /**
   *  get请求
   * @param url
   * @returns
   */
  async get(url: string) {
    console.log('环境', import.meta.env);
    console.log('url', url);
    // http://localhost:5173/path2D/mypath2d/
    if (this.isDealUrl(url)) {
      return fetch(`/iconJson/${url}/data.json`).then((r) => r.json());
    }
    const res = await axios.get(url);
    return res.data;
  }
}

export const httpRequest = new HttpRequest();
