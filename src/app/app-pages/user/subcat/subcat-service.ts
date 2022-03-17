import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {
  AddUpdateCategoryResponse,
  AddUpdateMainCatResponse,
  AddUpdateNationalityResponse
} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {CategoryResponse, NationalitiesResponse} from "../../../model/nationalities/nationalities-response";


@Injectable()
export class SubcatService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }


  





  public getNationalities() {
    return this.httpClient.get<CategoryResponse>(ApiLinks.CATEGORIES);
  }



  public addNationality(data): Observable<AddUpdateCategoryResponse> {
    return this.httpClient.post<AddUpdateCategoryResponse>(ApiLinks.CATEGORIES, data);
  }

  
  public updateNationality(data, locationId: number): Observable<AddUpdateCategoryResponse> {
    return this.httpClient.put<AddUpdateCategoryResponse>(ApiLinks.CATEGORIES + "/" + locationId, data);
  }


  
  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.CATEGORIES + "/" + locationId);
  }

 
  

}

