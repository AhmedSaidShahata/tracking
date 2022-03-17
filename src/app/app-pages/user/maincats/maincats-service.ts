import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {AddUpdateMainCatResponse} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";


@Injectable()
export class MaincatsService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }


  




  public getMainCategory(): Observable<MainCategoryCategories> {
    return this.httpClient.get<MainCategoryCategories>
    (ApiLinks.MAIN_CATEGORIES );
  }




  public addMainCat(nameAr: string, nameEn: string, DescriptionEn: string, DescriptionAr: string): Observable<AddUpdateMainCatResponse> {
    return this.httpClient.post<AddUpdateMainCatResponse>(ApiLinks.MAIN_CATEGORIES, {
      NameAr: nameAr,
      NameEn: nameEn,
      DescriptionEn: DescriptionEn,
      DescriptionAr: DescriptionAr,
    });
  }

  
  public updateMainCategory(data, locationId: number): Observable<AddUpdateMainCatResponse> {
    return this.httpClient.put<AddUpdateMainCatResponse>(ApiLinks.MAIN_CATEGORIES + "/" + locationId, data);
  }


  
  public deleteCat(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.MAIN_CATEGORIES + "/" + locationId);
  }

 
  

}

