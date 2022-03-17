import {BaseResponse} from "../base-response";
import {Tower} from "../location-towers/location-towers-response";

export interface TowersResponse extends BaseResponse {
  towers: Tower[];
}



