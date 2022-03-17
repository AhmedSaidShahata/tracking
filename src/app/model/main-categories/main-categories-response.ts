import {BaseResponse} from "../base-response";
import {MainCategory} from "../asset-lookup/asset-lookup";

export interface MainCategoriesResponse extends BaseResponse {
  main_categories: Array<MainCategory>;
}
