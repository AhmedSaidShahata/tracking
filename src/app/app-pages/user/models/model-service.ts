import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {
  AddUpdateModelResponse,
  AddUpdateMainCatResponse,
  AddUpdateNationalityResponse
} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {CategoryResponse, NationalitiesResponse} from "../../../model/nationalities/nationalities-response";
import {CategoryModelsResponse} from "../../../model/category-models/category-models-response";


@Injectable()
export class ModelService {

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



  public getNationalities() {
    return this.httpClient.get<CategoryModelsResponse>(ApiLinks.MODEL, {headers: this.addAuthHeader()});
  }



  public addNationality(data): Observable<AddUpdateModelResponse> {
    return this.httpClient.post<AddUpdateModelResponse>(ApiLinks.MODEL, data, {headers: this.addAuthHeader()});
  }

  
  public updateNationality(data, locationId: number): Observable<AddUpdateModelResponse> {
    return this.httpClient.put<AddUpdateModelResponse>(ApiLinks.MODEL + "/" + locationId, data,
      {headers: this.addAuthHeader()});
  }


  
  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.MODEL + "/" + locationId, {headers: this.addAuthHeader()});
  }

 
  

}

