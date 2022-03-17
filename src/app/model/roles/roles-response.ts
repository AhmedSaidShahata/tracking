import {BaseResponse} from "../base-response";
import {Role} from "../login/login-response";

export interface RolesResponse extends BaseResponse {
  roles: Role[];
}
