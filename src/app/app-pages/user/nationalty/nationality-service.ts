import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {AddUpdateMainCatResponse, AddUpdateNationalityResponse} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {NationalitiesResponse} from "../../../model/nationalities/nationalities-response";


@Injectable()
export class NationalityService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }


  




  public getNationalities() {
    return this.httpClient.get<NationalitiesResponse>(ApiLinks.NATIONALITIES);
  }



  public addNationality(nameAr: string, nameEn: string): Observable<AddUpdateNationalityResponse> {
    return this.httpClient.post<AddUpdateNationalityResponse>(ApiLinks.NATIONALITIES, {
      NameAr: nameAr,
      NameEn: nameEn
    });
  }

  
  public updateNationality(data, locationId: number): Observable<AddUpdateNationalityResponse> {
    return this.httpClient.put<AddUpdateNationalityResponse>(ApiLinks.NATIONALITIES + "/" + locationId, data
      );
  }


  
  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.NATIONALITIES + "/" + locationId);
  }

 
  

}

