import {Location, MainCategory, Status} from "../asset-lookup/asset-lookup";
import {Category} from "../main-category-categories/main-category-categories";
import {Model} from "../category-models/category-models-response";
import {Tower} from "../location-towers/location-towers-response";

import {AssetTrackHistory} from "../assetTrackHistory";
import {BaseResponse} from "../base-response";
import {Floor} from "../floors/floors-response";
import {Room} from "../rooms/rooms-response";
import {User} from "../employee/EmployesResponse";

export class Asset {


  selectedAttach = false;


  Id: number;
  SerialNumber: string;
  Priority: string;
  ModelId: number;
  AssetStatusId: number;
  ManufactureDate: string;
  PurchaseDate: string;
  ImageUrl: string;
  TowerId?: any;
  FloorId?: any;
  RoomId?: any;
  MainCategoryId: number;
  CategoryId: number;
  LocationId: number;
  Epc: string;
  PrintedDate?: any;
  IsPrinted: number;
  IsAssigned: number;
  IsCancelled: number;

  IsConfirmed: number;


  EmployeeId: number;
  LastAssignDate?: any;
  DescriptionAr: string;
  DescriptionEn: string;
  Comment: string;
  QR: string;
  IsDeleted: number;
  IsReceived: number;
  NoSupportedYears: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  mainCategoryNameAr: string;
  mainCategoryNameEn: string;
  modelArName: string;
  modelEnName: string;
  statusNameAr: string;
  statusNameEn: string;
  locationNameAr: string;
  locationNameEn: string;
  towerNameAr?: any;
  towerNameEn?: any;
  floorNameAr?: any;
  floorNameEn?: any;
  roomNameAr?: any;
  roomNameEn?: any;
  checkForEmp: boolean;
  foundinsystem: boolean;

  main_category: MainCategory;
  images: AssetImage[];
  category: Category;
  status: Status;
  location: Location;
  model: Model;
  tower: Tower;
  floor: Floor;
  room: Room;
  employee: User;
  Assets: Asset[]
  asset_track_history: AssetTrackHistory[];
}

export interface SearchAssetsResponse extends BaseResponse {
  assets: { assets: Asset[], count: number };
}

export interface AssetImage {
  Id: number;
  AssetId: number;
  ImageUrl: string;
  imageFile?: any;
}


export interface AssainAssetsResponse extends BaseResponse {
  assets: [{ employee_asset_detail: { asset: Asset, Id: number, IsCancelled: number, IsConfirmed: number },
    Id: number,  Notes: string;
  }];
}

