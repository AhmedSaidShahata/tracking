import {BaseResponse} from "../../base-response";
import {DepartmentsEntity} from "../../emp_department/department";
import {MaincatsComponent} from "../../../app-pages/user/maincats/maincats.component";
import {MainCategory} from "../../asset-lookup/asset-lookup";
import {Nationality} from "../../nationalities/nationalities-response";
import {Job} from "../../jobs/jobs-response";
import {Category} from "../../main-category-categories/main-category-categories";
import {Model} from "../../category-models/category-models-response";

import {Floor} from "../../floors/floors-response";
import {Room} from "../../rooms/rooms-response";

export interface Location {
  Id: number;
  NameAr: string;
  NameEn: string;
  CityName: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
}

export interface AddUpdateLocationResponse extends BaseResponse {
  location: Location;
}


export interface AddUpdateDepartmentResponse extends BaseResponse {
  department: DepartmentsEntity;
}



export interface AddUpdateMainCatResponse extends BaseResponse {
  main_category: MainCategory;
}
export interface AddUpdateNationalityResponse extends BaseResponse {
  nationality: Nationality;
}
export interface AddUpdateJobResponse extends BaseResponse {
  job: Job;
}
export interface AddUpdateCategoryResponse extends BaseResponse {
  category: Category;
}


export interface AddUpdateModelResponse extends BaseResponse {
  model: Model;
}


export interface AddUpdateFloorResponse extends BaseResponse {
  floors: Floor;
}



export interface AddUpdateRoomResponse extends BaseResponse {
  rooms: Room;
}
