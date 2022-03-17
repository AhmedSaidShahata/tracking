import {BaseResponse} from "../base-response";
import {Employee} from "../assetTrackHistory";

export interface UpdateProfileResponse extends BaseResponse {
  employee: Employee;
}



