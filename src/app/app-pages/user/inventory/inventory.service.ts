import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {AddNewEmpComponent} from "../add-new-emp/add-new-emp.component";
import {AddNewInvatoryComponent} from "../add-new-invatory/add-new-invatory.component";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {DialogService} from "../../../service/dialog.service";
import {ApiService} from "../../../service/api-service";
import {AuthGuard} from "../../../guard/auth.guard";
import {JobsResponse} from "../../../model/jobs/jobs-response";
import {ApiLinks} from "../../../service/api-links";
import {Observable} from "rxjs";
import {AddUpdateJobResponse} from "../../../model/locations/add-update/add-update-location-response";
import {BaseResponse} from "../../../model/base-response";
import {AddUpdateSessionCycleResponse, SessionCycle, SessionCycleResponse} from "../../../model/SessionCycle/SessionCycleResponse";
import {EmployeeResponse} from "../../../model/employee/EmployesResponse";
import {SessionCycleResultResponse} from "../../../model/SessionCycleResult/SessionCycleResultResponse";

@Injectable()
export class InventoryService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }





  private addAuthHeader() {
    const user = this.authGuard.getUser();
    let userToken = null;
    if (user != null) {
      userToken = user.token;
    } else {
      userToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3QvQX" +
        "NzZXRUcmFja2luZy9wdWJsaWMvaW5kZXgucGhwL3dlYl9hcGkvdjEvdXNlcnMvbG9naW4iLCJpYXQiOjE1NDM1Nzc0MDUsImV4cCI6MTU1OTEy" +
        "OTQwNSwibmJmIjoxNTQzNTc3NDA1LCJqdGkiOiJ5M240cjlxc3Nld0hxaDFjIn0.l_s2JQPO5PfRKSEhkX-48TGm3adj_3Ogl-QCHFnNsFg";
    }

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + userToken);
    return headers;
  }





  public getJobs(offset: number, limit: number) {
    let apiLink = ApiLinks.SESSION_CYCLE + "/filter_session";
    let addQuestionMark = false;


    if (offset > -1) {
      if (addQuestionMark) {
        apiLink += "&offset=" + offset;
      } else {
        apiLink += "?offset=" + offset;
        addQuestionMark = true;
      }
    }

    if (limit > -1) {
      if (addQuestionMark) {
        apiLink += "&limit=" + limit;
      } else {
        apiLink += "?limit=" + limit;
        addQuestionMark = true;
      }
    }

    return this.httpClient.get<SessionCycleResponse>(apiLink, {headers: this.addAuthHeader()});
  }



  public addNationality(data: SessionCycle ): Observable<AddUpdateSessionCycleResponse> {
    return this.httpClient.post<AddUpdateSessionCycleResponse>(ApiLinks.SESSION_CYCLE, data, {headers: this.addAuthHeader()});
  }


  public updateNationality(data : SessionCycle): Observable<AddUpdateSessionCycleResponse> {
    return this.httpClient.put<AddUpdateSessionCycleResponse>(ApiLinks.SESSION_CYCLE + "/" + data.Id, data,
      {headers: this.addAuthHeader()});
  }



  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.SESSION_CYCLE + "/" + locationId, {headers: this.addAuthHeader()});
  }




  public getResult(id: number) {
    let apiLink = ApiLinks.SESSION_CYCLE + "/getInventory/" + id;


    return this.httpClient.get<SessionCycleResultResponse>(apiLink, {headers: this.addAuthHeader()});
  }




}
