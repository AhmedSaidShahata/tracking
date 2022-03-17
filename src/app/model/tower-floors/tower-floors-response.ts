import {BaseResponse} from "../base-response";
import {Floor} from "../floors/floors-response";


export interface TowerFloorsResponse extends BaseResponse {
  floors: Floor[];
}



