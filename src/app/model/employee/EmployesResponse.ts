import {BaseResponse} from "../base-response";
import {Asset} from "../search-assets/search-assets-response";
import {DepartmentsEntity} from "../emp_department/department";
import {Job} from "../jobs/jobs-response";
import {Role} from "../login/login-response";
import {MainCategory} from "../asset-lookup/asset-lookup";

export class User {
  Id: number;
  NameAr: string;
  NameEn: string;
  JobId: number;
  foundinsystem: Boolean;
  AddressEn: string;
  AddressAr: string;
  MobileNumber: string;
  TelephoneNumber: string;
  IpAddress: string;
  PCName?: string;
  NationalityId: number;
  IdentifierNo: string;
  extension_number: string;
  UserId: number;
  LocationId: number;
  Priority: string;
  RoleId: number;
  DepartmentId: number;
  HiringDate: string;
  RetirementDate?: any;
  Email: string;
  ImageUrl: string;
  ManagerId: number;
  EmployeeId: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  selectedAttach: Boolean;
  user: User;
  manager: User;
  UserName: any;
  PasswordHash: string;
  department: DepartmentsEntity;
  job: Job;
  userRole: Role;
  userCategories: MainCategory[];
  main_categories: MainCategory[];
  assets_assigned: Asset[];
  Employees: User[];

}


export interface EmployeeResponse extends BaseResponse {
  data: { employees: User[], count: number };

}

export interface EmployeExceleResponse extends BaseResponse {
  Employees:  User[];

}


export interface AddEditEmployee extends BaseResponse {
  employee: User;

}
