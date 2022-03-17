import {BaseResponse} from "../base-response";
import {Category} from "../main-category-categories/main-category-categories";

export interface Model {
  Id: number;
  NameAr: string;
  NameEn: string;
  Color: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  DescriptionAr: string;
  Priority: string;
  DescriptionEn: string;
  UpdatedBy: string;
  CategoryId: number;
  category: Category;
}

export interface CategoryModelsResponse extends BaseResponse {
  models: Model[];
}



