import axios from 'axios';
import qs from 'qs';
import {getToken} from './storage.helper';

const configTimeOut = 20000;

const instance = axios.create({
  timeout: configTimeOut,
});

instance.interceptors.response.use(
  config => config,
  error => Promise.reject(error),
);
const preprocessResponse = data => {
  if (data.success === false) {
    throw {response: {message: data.message, code: data.code}};
  }
  console.log('res data: ', data);
  return data;
};

export default class RequestHelper {
  static async getHeader() {
    const token = await getToken();
    console.log('token: ', token);
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }
  static async getHeaderUrlEncode() {
    const token = await getToken();
    console.log('token: ', token);
    return {
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    };
  }

  static async get(url, params) {
    const header = await this.getHeader();
    const source = axios.CancelToken.source();
    console.log('url -->get: ', url);
    setTimeout(() => {
      source.cancel();
    }, configTimeOut);
    return instance
      .get(url, {
        headers: header,
        params: {...params},
        paramsSerializer: params => {
          return qs.stringify(params, {arrayFormat: 'repeat'});
        },
        cancelToken: source.token,
      })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return data;
      })
      .catch(e => {
        throw e;
      });
  }

  static async post(url, data) {
    console.log('post url: ', url);
    console.log('post data: ', data);
    return instance({
      method: 'post',
      url: url,
      headers: await this.getHeader(),
      data: data,
    })
      .then(data => {
        return data.data;
      })
      .then(data => {
        return data;
      })
      .catch(e => {
        throw e;
      });
  }

  static async postUrlEncode(url, data) {
    const source = axios.CancelToken.source();
    setTimeout(() => {
      source.cancel();
    }, configTimeOut);
    return instance(
      {
        method: 'post',
        url: url,
        headers: await this.getHeaderUrlEncode(),
        data: qs.stringify(data),
        // params: {culture: getCulture()},
      },
      {cancelToken: source.token},
    )
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        throw e;
      });
  }

  static async put(url, data) {
    const source = axios.CancelToken.source();
    console.log('put -->data: ', data);
    console.log('put -->url: ', url);
    setTimeout(() => {
      source.cancel();
    }, configTimeOut);
    return instance(
      {
        method: 'put',
        url: url,
        headers: await this.getHeader(),
        data: data,
      },
      {cancelToken: source.token},
    )
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        throw e;
      });
  }

  static async delete(apiUrl, data) {
    const source = axios.CancelToken.source();
    console.log('delete --> apiUrl: ', apiUrl);
    console.log('delete --> data: ', data);
    setTimeout(() => {
      source.cancel();
    }, configTimeOut);
    return instance(
      {
        method: 'delete',
        url: apiUrl,
        headers: await this.getHeader(),
        data: data,
      },
      {cancelToken: source.token},
    )
      .then(data => {
        return data.data;
      })
      .then(data => {
        return preprocessResponse(data);
      })
      .catch(e => {
        throw e;
      });
  }
}
