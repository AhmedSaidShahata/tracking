import {BaseResponse} from "../base-response";
import {MainCategory} from "../asset-lookup/asset-lookup";

export class Category {
  Id: number;
  NameAr: string;
  NameEn: string;
  DescriptionAr: string;
  DescriptionEn: string;
  Color: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  MainCategoryId: number;
  main_category:MainCategory;
}

export interface MainCategoryCategories extends BaseResponse {
  categories: Category[];
  main_categories: MainCategory[];
}


