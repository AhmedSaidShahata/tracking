import {BaseResponse} from "../base-response";


export interface Location {
  Id: number;
  NameAr: string;
  NameEn: string;
  CityName: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
}

export interface LocationsResponse extends BaseResponse {
  locations: Location[];
}


