import {BaseResponse} from "../base-response";

export class MainCategory {
  Id: number;
  MainCategoryId: number;
  NameAr: string;
  NameEn: string;
  DescriptionAr: string;
  DescriptionEn: string;

  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;

}

export interface Status {
  Id: number;
  NameAr: string;
  NameEn: string;
  Color?: any;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn?: any;
  UpdatedBy?: any;
}

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

export interface Lookup {
  main_categories: MainCategory[];
  status: Status[];
  locations: Location[];
}

export interface AssetLookupResponse extends BaseResponse {
  lookup: Lookup;

}


