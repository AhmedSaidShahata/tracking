import {BaseResponse} from "../base-response";

export interface Asset {
  Id: number;
  SerialNumber: string;
  ModelId: number;
  AssetStatusId: number;
  ManufactureDate: string;
  PurchaseDate: string;
  TowerId: number;
  FloorId: number;
  RoomId: number;
  MainCategoryId: number;
  CategoryId: number;
  LocationId: number;
  Epc: string;
  PrintedDate: string;
  IsPrinted: number;
  IsAssigned: number;
  EmployeeId: number;
  LastAssignDate: string;
  DescriptionAr: string;
  DescriptionEn: string;
  IsDeleted: number;
  IsReceived: number;
  NoSupportedYears: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
}

export interface EmployeeAssetDetail {
  Id: number;
  EmployeeAssetId: number;
  EmployeeId: number;
  AssetId: number;
  IsConfirmed: number;
  ConfirmedDate?: any;
  IsCancelled: number;
  IsCancelledApproved: number;
  CancelledDate?: any;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy?: any;
  asset: Asset;
}

export interface EmployeeAsset {
  Id: number;
  EmployeeId: number;
  IsReceived: number;
  ReceivedDate?: any;
  IsReturned: number;
  ReturnDate?: any;
  IsCancelled: number;
  CancelledDate?: any;
  Notes?: any;
  ReferenceCode: string;
  HashedLink: string;
  HashLinkPermanent: string;
  HashedLinkExpire: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy?: any;
  employee_asset_detail: EmployeeAssetDetail;
}

export interface AssetInvitationResponse extends BaseResponse {
  employeeAsset: EmployeeAsset;
}


