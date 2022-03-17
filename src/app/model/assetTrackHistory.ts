import {Status} from "./asset-lookup/asset-lookup";

export interface AssetTrackHistory {
  Id: number;
  AssetId: number;
  EmployeeId: number;
  AssetStatusId: number;
  AssetActionId: number;
  CreatedOn: string;
  ReturnData: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  employee: Employee;
  asset_status: Status;
  asset_action: Status;
}

export interface Employee {
  Id: number;
  NameAr: string;
  NameEn: string;
  JobId: number;
  AddressEn?: null;
  AddressAr: string;
  MobileNumber: string;
  TelephoneNumber: string;
  IpAddress?: null;
  PCName?: null;
  NationalityId: number;
  IdentifierNo: string;
  UserId: number;
  LocationId?: null;
  DepartmentId: number;
  HiringDate: string;
  RetirementDate?: null;
  Email: string;
  ImageUrl: string;
  ManagerId?: null;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;

}

