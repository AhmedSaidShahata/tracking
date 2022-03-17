import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {
  AddUpdateModelResponse,
  AddUpdateMainCatResponse,
  AddUpdateNationalityResponse, AddUpdateFloorResponse
} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {CategoryResponse, NationalitiesResponse} from "../../../model/nationalities/nationalities-response";
import {CategoryModelsResponse} from "../../../model/category-models/category-models-response";
import {FloorRoomsResponse} from "../../../model/floor-rooms/floor-rooms-response";
import {FloorsResponse} from "../../../model/floors/floors-response";


@Injectable()
export class RoofService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }







  public getNationalities() {
    return this.httpClient.get<FloorsResponse>(ApiLinks.FLOORS);
  }



  public addNationality(data): Observable<AddUpdateFloorResponse> {
    return this.httpClient.post<AddUpdateFloorResponse>(ApiLinks.FLOORS, data);
  }


  public updateNationality(data, locationId: number): Observable<AddUpdateFloorResponse> {
    return this.httpClient.put<AddUpdateFloorResponse>(ApiLinks.FLOORS + "/" + locationId, data);
  }



  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.FLOORS + "/" + locationId);
  }

 
  

}

