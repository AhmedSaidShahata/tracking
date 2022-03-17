import {BaseResponse} from "../base-response";
import {Employee} from "../assetTrackHistory";

export interface Pivot {
  RoleId: number;
  UserId: number;
}

export class Role {
  Id: number;
  NameAr: string;
  NameEn: string;
  pivot: Pivot;
}

export interface User {
  Id: number;
  IsActive: number;
  LicenseKey: string;
  Email: string;
  EmailConfirmed: number;
  SecurityStamp: string;
  PhoneNumber: string;
  PhoneNumberConfirmed: number;
  TwoFactorEnabled: number;
  LockoutEndDateUtc?: any;
  LockoutEnabled: number;
  AccessFailedCount: number;
  UserName: string;
  token: string;
  employee?: Employee;
  role: Role;
}

export interface LoginResponse extends BaseResponse {
  user: User;
}


