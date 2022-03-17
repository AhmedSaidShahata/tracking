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
import {AddEditEmployee, EmployeeResponse, User} from "../../../model/employee/EmployesResponse";
import {AssetLookupResponse} from "../../../model/asset-lookup/asset-lookup";
import {AssainAssetsResponse, SearchAssetsResponse} from "../../../model/search-assets/search-assets-response";
import {AddEditAssetResponse} from "../../../model/towers/AddEditTowerResponse";


@Injectable()
export class AssaginService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }




  // get base asset lookup that not related to any thing.
  public getEmpAsset(code: string): Observable<AssainAssetsResponse> {
    return this.httpClient.get<AssainAssetsResponse>(ApiLinks.ASSET_EMP + code);
  }




  // get base asset lookup that not related to any thing.
  public ChangeStatusAsset(assetId: string,rejectorAprove: string): Observable<AddEditAssetResponse> {
    return this.httpClient.get<AddEditAssetResponse>(ApiLinks.ASSET_STATUS + assetId +"/"+rejectorAprove);
  }




}

