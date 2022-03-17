import {BaseResponse} from "../base-response";
import {Category} from "../main-category-categories/main-category-categories";


export interface Nationality {
  Id: number;
  NameAr: string;
  NameEn: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn?: any;
  UpdatedBy?: any;
}

export interface NationalitiesResponse extends BaseResponse {
  nationalities: Nationality[];
}




export interface CategoryResponse extends BaseResponse {
  categories: Category[];
}
