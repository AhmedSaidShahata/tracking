import {BaseResponse} from "../base-response";

export interface Job {
  Id: number;
  NameAr: string;
  NameEn: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn?: any;
  UpdatedBy?: any;
}

export interface JobsResponse extends BaseResponse {
  jobs: Job[];
}


