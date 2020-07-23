import Axios from "axios";
import BaseService from "../baseService";
class UserService extends BaseService{
  /**
   * 登录
   * @param data
   */
  login(data){
    return Axios.post(this.httpRequestPathPrefix+"/login",{ body: data })
  }
}
export default new UserService();
