import {Injectable} from '@angular/core';
import {AuthGuard} from "../../../guard/auth.guard";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiLinks} from "../../../service/api-links";
import {
  AddUpdateModelResponse,
  AddUpdateMainCatResponse,
  AddUpdateNationalityResponse, AddUpdateFloorResponse, AddUpdateRoomResponse
} from "../../../model/locations/add-update/add-update-location-response";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../model/base-response";
import {MainCategoryCategories} from "../../../model/main-category-categories/main-category-categories";
import {CategoryResponse, NationalitiesResponse} from "../../../model/nationalities/nationalities-response";
import {CategoryModelsResponse} from "../../../model/category-models/category-models-response";
import {FloorRoomsResponse} from "../../../model/floor-rooms/floor-rooms-response";
import {FloorsResponse} from "../../../model/floors/floors-response";
import {RoomsResponse} from "../../../model/rooms/rooms-response";


@Injectable()
export class OfficeService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }








  public getNationalities() {
    return this.httpClient.get<RoomsResponse>(ApiLinks.ROOMS);
  }



  public addNationality(data): Observable<AddUpdateRoomResponse> {
    return this.httpClient.post<AddUpdateRoomResponse>(ApiLinks.ROOMS, data);
  }


  public updateNationality(data, locationId: number): Observable<AddUpdateRoomResponse> {
    return this.httpClient.put<AddUpdateRoomResponse>(ApiLinks.ROOMS + "/" + locationId, data);
  }



  public deleteNationality(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.ROOMS + "/" + locationId);
  }

 
  

}

