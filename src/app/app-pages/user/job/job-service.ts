import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {AddUpdateMainCatResponse, AddUpdateJobResponse} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {NationalitiesResponse} from "../../../model/nationalities/nationalities-response";
import {JobsResponse} from "../../../model/jobs/jobs-response";


@Injectable()
export class JobService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }







  public getJobs() {
    return this.httpClient.get<JobsResponse>(ApiLinks.JOBS);
  }



  public addNationality(nameAr: string, nameEn: string): Observable<AddUpdateJobResponse> {
    return this.httpClient.post<AddUpdateJobResponse>(ApiLinks.JOBS, {
      NameAr: nameAr,
      NameEn: nameEn
    });
  }


  public updateNationality(data, locationId: number): Observable<AddUpdateJobResponse> {
    return this.httpClient.put<AddUpdateJobResponse>(
      ApiLinks.JOBS + "/" + locationId, data
      );
  }



  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.JOBS + "/" + locationId
      );
  }




}

