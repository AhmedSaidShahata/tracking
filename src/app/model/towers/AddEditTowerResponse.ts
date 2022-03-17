import {BaseResponse} from "../base-response";
import {Tower} from "../location-towers/location-towers-response";
import {Asset} from "../search-assets/search-assets-response";


export interface AddEditTowerResponse extends BaseResponse {
  tower: Tower;
}



export interface AddEditAssetResponse extends BaseResponse {
  asset: Asset;
}



export interface SearchExcelAssetResponse extends BaseResponse {
  assets: Asset[];
}


