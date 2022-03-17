import {BaseResponse} from "../base-response";
import {Location} from "../locations/locations-response";

export interface Tower {
  Id: number;
  NameAr: string;
  NameEn: string;
  LocationId: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  location : Location;
}

export interface LocationTowersResponse extends BaseResponse {
  towers: Tower[];
}


