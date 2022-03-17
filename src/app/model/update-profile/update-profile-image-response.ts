import {BaseResponse} from "../base-response";
import {Employee} from "../assetTrackHistory";

export class UpdateProfileImageResponse extends BaseResponse {
  employee: Employee;
}
