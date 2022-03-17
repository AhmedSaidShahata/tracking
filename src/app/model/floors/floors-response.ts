import {BaseResponse} from "../base-response";
import {Tower} from "../location-towers/location-towers-response";

export interface Floor {
  Id: number;
  NameAr: string;
  NameEn: string;
  TowerId: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  tower : Tower;
}

export interface FloorsResponse extends BaseResponse {
  floors: Floor[];
}



