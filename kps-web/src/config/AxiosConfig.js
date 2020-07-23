import Axios from 'axios';
import {Message} from 'iview';
import EnvConfig from '../config/run.config';
import {AjaxReturnStatus,AjaxReturnType,AjaxRequestPrefix,AjaxGlobalReturnState} from "../data/data.ajax";

class AxiosConfig {
  /**
   * 创建请求ID
   * @returns {*}
   */
  createRequestNo() {
    // return StringTool.randomString(32);
    return "123456";
  }

  /**
   * 创建请求系统类型
   * @returns {string}
   */
  createSystemType() {
    return "H5";
  }

  /**
   * 设置默认头
  */
  setDefaultHeader() {
    // Axios.defaults.headers.post["accept"] = "application/json; charset=utf-8";
    // Axios.defaults.headers.common["accept"] = "application/json; charset=utf-8";
  }

  // setCrosHeader(){
  //   // 设置前端的跨域
  //   'Access-Control-Allow-Origin': '*',
  //     // 数据的提交方式为form的方式提交，若需要使用json的模式提交则将Content-Type值改为如下
  //     // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'X-URL-PATH': location.pathname
  // }
  /**
   * 配置请求url前缀
   */
  addHttpRequestPrefix() {
    Axios.defaults.baseURL = EnvConfig.runConfig.baseUrl;
  }

  /**
   * 请求
   */
  addCommonDataToRequest() {
    Axios.interceptors.request.use(config => {
      if (config.url.indexOf("/kps") !== -1) {
        // 创建请求体的head
        const head = {
          reqSys: this.createSystemType(),
          transCode: this.createRequestNo()
        };
        if (config.method === "get") {
          console.log("get请求...")
          if (!config.params) {
            config.params = {};
          }
          const params = config.params;
          config.params = { head, ...params };
        } else {
          console.log(config.method+":"+config.data)
          if (!config.data) {
            config.data = {
              body: {}
            };
          }
          const requestData = config.data;
          if (config.headers["Content-Type"] !== "multipart/form-data") {
            config.data = { head, ...requestData };
          }
        }
      }else {
        alert("-1")
      }
      return config;
    });
  }

  /**
   * 处理响应
   * @param router
   */
  handleResponseData(router) {
    Axios.interceptors.response.use(res => {
        return response;
        // if (response.status === Number(AjaxGlobalReturnState.tokenFail)) {
        //   sessionStorage.clear();
        //   store.commit(Types.UPDATE_USERNAME, "");
        //   router.replace({
        //     path: "/login",
        //     query: { redirect: router.currentRoute.fullPath }
        //   });
        //   return response;
        // } else {
        //
        // }
      },
      error => {
        let errorMessage = "";
        if (error.response.status === Number(AjaxGlobalReturnState.tokenFail)) {
          // 返回 401 清除token信息并跳转到登录页面
          sessionStorage.clear();
          store.commit(Types.UPDATE_USERNAME, "");
          errorMessage = "用户未登录或未授权";
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
        }
        return Promise.reject(errorMessage || error.response.data);
      }
    );
  }
  // 创建实例
  create() {
    let conf = {
      // 远程请求的服务的地址
      baseURL: EnvConfig.runConfig.baseUrl,
      // 超时时间
      timeout: 5000,
      headers: {
        // 设置前端的跨域
        'Access-Control-Allow-Origin': '*',
        // 数据的提交方式为form的方式提交，若需要使用json的模式提交则将Content-Type值改为如下
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        // 'Content-Type': 'application/json; charset=utf-8',
        'X-URL-PATH': location.pathname
      }
    };
    return Axios.create(conf);
  }
  init(router) {
    // this.create();
    this.setDefaultHeader();
    this.addHttpRequestPrefix();
    this.addCommonDataToRequest();
    this.handleResponseData(router);
  }
}

export default new AxiosConfig();
