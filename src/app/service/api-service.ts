import {Injectable} from '@angular/core';
import {AuthGuard} from '../guard/auth.guard';
import {UserLoginRequest} from '../model/login/login-request';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiLinks} from './api-links';
import {DashboardCountersResponse} from '../model/dashboard-counters/dashboard-counters';
import {SalesmenResponse} from '../model/salesmen/salesmen';
import {BaseResponse} from '../model/base-response';
import {LoginResponse} from '../model/login/login-response';
import {AssetLookupResponse} from "../model/asset-lookup/asset-lookup";
import {Observable} from "rxjs";
import {MainCategoryCategories} from "../model/main-category-categories/main-category-categories";
import {LocationTowersResponse} from "../model/location-towers/location-towers-response";
import {TowerFloorsResponse} from "../model/tower-floors/tower-floors-response";
import {FloorRoomsResponse} from "../model/floor-rooms/floor-rooms-response";
import {CategoryModelsResponse} from "../model/category-models/category-models-response";
import {Asset, SearchAssetsResponse} from "../model/search-assets/search-assets-response";
import {LocationsResponse} from "../model/locations/locations-response";
import {TowersResponse} from "../model/towers/towers-response";
import {FloorsResponse} from "../model/floors/floors-response";
import {RoomsResponse} from "../model/rooms/rooms-response";
import {NationalitiesResponse} from "../model/nationalities/nationalities-response";
import {JobsResponse} from "../model/jobs/jobs-response";
import {AddEditAssetResponse, AddEditTowerResponse, SearchExcelAssetResponse} from "../model/towers/AddEditTowerResponse";
import {AddUpdateDepartmentResponse, AddUpdateLocationResponse} from "../model/locations/add-update/add-update-location-response";
import {DepartmentsResponse} from "../model/emp_department/department";
import {AddAssainAssetRequest} from "../model/asset-lookup/AddAssainAssetRequest";
import {Employee} from "../model/assetTrackHistory";
import {UpdateProfileResponse} from "../model/update-profile/update-profile-response";
import {AddEditEmployee} from "../model/employee/EmployesResponse";
import {UpdateProfileImageResponse} from "../model/update-profile/update-profile-image-response";
import {MainCategoriesResponse} from "../model/main-categories/main-categories-response";
import {RolesResponse} from "../model/roles/roles-response";
import {AssetInvitationResponse} from "../model/asset-invitation-response/asset-invitation-response";
import {AssignersResponse} from "../model/assigners/asigners-response";
import {AssignedToResponse} from "../model/assigned-to/asignedto-response";
import {GenerateAssetNumber} from "../model/generate-asset-number/generate-asset-number";
import {parseHttpResponse} from "selenium-webdriver/http";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Cacheable} from "ngx-cacheable";

@Injectable()
export class ApiService {
  IGNORE_FIELDS = new Map<string, string[]>();

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }


  public login(user: UserLoginRequest) {
    return this.httpClient.post<LoginResponse>(ApiLinks.LOGIN, user);
  }

  public getDashboardCounters() {
    return this.httpClient.get<DashboardCountersResponse>(ApiLinks.DASHBOARD_COUNTERS);
  }


  public getSalesmen() {
    return this.httpClient.get<SalesmenResponse>(ApiLinks.SALESMEN);
  }

  public changeSalesmanActiveState(salesmanId: number, state: string) {
    return this.httpClient.post<BaseResponse>
    (ApiLinks.CHANGE_SALESMAN_ACTIVE_STATE, {salesman_id: salesmanId, state: state});
  }


  public forgetPassword(email: string) {
    return this.httpClient.post<BaseResponse>(ApiLinks.FORGET_PASSWORD, {email: email});
  }

  public verifyPasswordCode(email: string, passwordCode: string) {
    return this.httpClient.post<BaseResponse>(ApiLinks.VERIFY_PASSWORD_CODE,
      {email: email, password_code: passwordCode});
  }

  public changeForgettenPassword(passwordCode: string, newPassword: string) {
    return this.httpClient.post<BaseResponse>(ApiLinks.CHANGE_FORGOTEN_PASSWORD, {
      password_code: passwordCode,
      new_password: newPassword
    });
  }

  // get base asset lookup that not related to any thing.
  public getAssetLookup(): Observable<AssetLookupResponse> {
    return this.httpClient.get<AssetLookupResponse>(ApiLinks.ASSET_LOOKUP);
  }

  public getMainCategoryCategories(mainCategoryId: string): Observable<MainCategoryCategories> {
    return this.httpClient.get<MainCategoryCategories>
    (ApiLinks.MAIN_CATEGORIES + "/" + mainCategoryId + "/categories");
  }


  public deleteAsset(mainCategoryId: number): Observable<MainCategoryCategories> {
    return this.httpClient.delete<MainCategoryCategories>
    (ApiLinks.ASSET + "/" + mainCategoryId);
  }


  public updateAsset(updateAsset: Asset, userImage): Observable<AddEditAssetResponse> {
    const formData: FormData = new FormData();
    if (userImage) {
      let i = 1;
      userImage.forEach(image => {
        formData.append(('Image' + i), image, ('Image' + i));
        i++;
      });
    }
    formData.append('AssetData', JSON.stringify(updateAsset));
    formData.append("_method", "PUT");
    return this.httpClient.post<AddEditAssetResponse>(ApiLinks.ASSET + "/" + updateAsset.Id, formData
    );
  }


  public pullAsset(assetId: number, EmployeeId: number): Observable<AddEditAssetResponse> {


    let apiLink = ApiLinks.UNASSAIN_ASSETS;
    apiLink += "?AssetId=" + assetId;
    apiLink += "&EmployeeId=" + EmployeeId;


    return this.httpClient.get<AddEditAssetResponse>(apiLink);

  }


  public addMultiAsset(data: Asset): Observable<BaseResponse> {


    return this.httpClient.post<BaseResponse>(ApiLinks.ASSAIN_addMultiAsset, data);

  }


  public AssainAsset(data: AddAssainAssetRequest): Observable<BaseResponse> {


    return this.httpClient.post<BaseResponse>(ApiLinks.ASSAIN_ASSETS, data);

  }


  public addAsset(userData: Asset, userImage): Observable<AddEditAssetResponse> {
    const formData: FormData = new FormData();
    if (userImage) {
      let i = 1;
      userImage.forEach(image => {
        formData.append(('Image' + i), image, image);
        i++;
      });
    }
    formData.append('AssetData', JSON.stringify(userData));
    return this.httpClient.post<AddEditAssetResponse>(ApiLinks.ASSET, formData);
  }


  public getCategoryModels($categoryId: string): Observable<CategoryModelsResponse> {
    return this.httpClient.get<CategoryModelsResponse>
    (ApiLinks.CATEGORIES + "/" + $categoryId + "/models");

  }

  public getLocationTowers($locationId: string): Observable<LocationTowersResponse> {
    return this.httpClient.get<LocationTowersResponse>
    (ApiLinks.LOCATIONS + "/" + $locationId + "/towers");
  }

  public getTowerFloors($towerId: string): Observable<TowerFloorsResponse> {
    return this.httpClient.get<TowerFloorsResponse>
    (ApiLinks.TOWERS + "/" + $towerId + "/floors");
  }

  public getFloorRooms($floorId: string): Observable<FloorRoomsResponse> {
    return this.httpClient.get<FloorRoomsResponse>
    (ApiLinks.FLOORS + "/" + $floorId + "/rooms");
  }


  public searchAssets(assetId: string, serialNumber: string, mainCategoryId: string,
                      categoryId: string, modelId: string, statusId: string, locationId: string, towerId: string,
                      floorId: string, roomId: string, offset: number,
                      limit: number, assignerId: string, assignedToId: string,
                      creatorId: string, QR: string , date_from ,
                      date_to,userRecive,electronic_id,selectedPriority,return_date): Observable<SearchAssetsResponse> {
    let apiLink = ApiLinks.FILTER_ASSETS;
    let addQuestionMark = false;
    if (assetId != "") {
      apiLink += "?id=" + assetId;
      addQuestionMark = true;
    }








    if (serialNumber != "") {
      if (addQuestionMark) {
        apiLink += "&serial_number=" + serialNumber;
      } else {
        apiLink += "?serial_number=" + serialNumber;
        addQuestionMark = true;
      }
    }



    if (electronic_id != "") {
      if (addQuestionMark) {
        apiLink += "&Epc=" + electronic_id;
      } else {
        apiLink += "?Epc=" + electronic_id;
        addQuestionMark = true;
      }
    }

    if (selectedPriority != "") {
      if (addQuestionMark) {
        apiLink += "&Priority=" + selectedPriority;
      } else {
        apiLink += "?Priority=" + selectedPriority;
        addQuestionMark = true;
      }
    }





    if (userRecive != "" && userRecive != "0"  ) {
      if (addQuestionMark) {
        apiLink += "&userRecive=" + userRecive;
      } else {
        apiLink += "?userRecive=" + userRecive;
        addQuestionMark = true;
      }
    }





    if (mainCategoryId != "") {
      if (addQuestionMark) {
        apiLink += "&main_category=" + mainCategoryId;
      } else {
        apiLink += "?main_category=" + mainCategoryId;
        addQuestionMark = true;
      }
    }


    if (QR != "") {
      if (addQuestionMark) {
        apiLink += "&QR=" + QR;
      } else {
        apiLink += "?QR=" + QR;
        addQuestionMark = true;
      }
    }


    if (categoryId != "") {
      if (addQuestionMark) {
        apiLink += "&category=" + categoryId;
      } else {
        apiLink += "?category=" + categoryId;
        addQuestionMark = true;
      }
    }
    if (modelId != "") {
      if (addQuestionMark) {
        apiLink += "&model=" + modelId;
      } else {
        apiLink += "?model=" + modelId;
        addQuestionMark = true;
      }
    }

    if (statusId != "") {
      if (addQuestionMark) {
        apiLink += "&status=" + statusId;
      } else {
        apiLink += "?status=" + statusId;
        addQuestionMark = true;
      }
    }


    if (date_from != null) {
      if (addQuestionMark) {
        apiLink += "&fromDate=" +  date_from.year + "-" + date_from.month +
          "-" + date_from.day;
      } else {
        apiLink += "?fromDate=" +  date_from.year + "-" + date_from.month +
          "-" + date_from.day;
        addQuestionMark = true;
      }
    }


    if (date_to != null) {
      if (addQuestionMark) {
        apiLink += "&endDate=" +  date_to.year + "-" + date_to.month +
          "-" + date_to.day;
      } else {
        apiLink += "?endDate=" +  date_to.year + "-" + date_to.month +
          "-" + date_to.day;
        addQuestionMark = true;
      }
    }


    if (return_date != null) {
      if (addQuestionMark) {
        apiLink += "&ReturnData=" +  return_date.year + "-" + return_date.month +
          "-" + return_date.day;
      } else {
        apiLink += "?ReturnData=" +  return_date.year + "-" + return_date.month +
          "-" + return_date.day;
        addQuestionMark = true;
      }
    }





    if (locationId != "") {
      if (addQuestionMark) {
        apiLink += "&location=" + locationId;
      } else {
        apiLink += "?location=" + locationId;
        addQuestionMark = true;
      }
    }

    if (towerId != "") {
      if (addQuestionMark) {
        apiLink += "&tower=" + towerId;
      } else {
        apiLink += "?tower=" + towerId;
        addQuestionMark = true;
      }
    }
    if (floorId != "") {
      if (addQuestionMark) {
        apiLink += "&floor=" + floorId;
      } else {
        apiLink += "?floor=" + floorId;
        addQuestionMark = true;
      }
    }

    if (roomId != "") {
      if (addQuestionMark) {
        apiLink += "&room=" + roomId;
      } else {
        apiLink += "?room=" + roomId;
        addQuestionMark = true;
      }
    }

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

    if (assignedToId!=null && assignedToId != "0") {
      if (addQuestionMark) {
        apiLink += "&assigned_to=" + assignedToId;
      } else {
        apiLink += "?assigned_to=" + assignedToId;
        addQuestionMark = true;
      }
    }

    if (assignerId!=null &&assignerId != "0") {
      if (addQuestionMark) {
        apiLink += "&assigner=" + assignerId;
      } else {
        apiLink += "?assigner=" + assignerId;
        addQuestionMark = true;
      }
    }

    if (creatorId!=null  &&creatorId != "0") {
      if (addQuestionMark) {
        apiLink += "&creator_id=" + creatorId;
      } else {
        apiLink += "?creator_id=" + creatorId;
        addQuestionMark = true;
      }
    }

    return this.httpClient.get<SearchAssetsResponse>(apiLink);
  }

  public getLocations(): Observable<LocationsResponse> {
    return this.httpClient.get<LocationsResponse>(ApiLinks.LOCATIONS);
  }


  public getDepartments(): Observable<DepartmentsResponse> {
    return this.httpClient.get<DepartmentsResponse>(ApiLinks.DEPARTMENTS);
  }

  // get buildings
  public getTowers(): Observable<TowersResponse> {
    return this.httpClient.get<TowersResponse>(ApiLinks.TOWERS);
  }


  public getFloors(): Observable<FloorsResponse> {
    return this.httpClient.get<FloorsResponse>(ApiLinks.FLOORS);
  }

  public getRooms() {
    return this.httpClient.get<RoomsResponse>(ApiLinks.ROOMS);
  }


  public addLocation(nameAr: string, nameEn: string, cityName: string): Observable<AddUpdateLocationResponse> {
    return this.httpClient.post<AddUpdateLocationResponse>(ApiLinks.LOCATIONS, {
      NameAr: nameAr,
      NameEn: nameEn,
      CityName: cityName
    });
  }


  public addDepartment(nameAr: string, nameEn: string): Observable<AddUpdateDepartmentResponse> {
    return this.httpClient.post<AddUpdateDepartmentResponse>(ApiLinks.DEPARTMENTS, {
      NameAr: nameAr,
      NameEn: nameEn,
    });
  }

  public updateLocation(data, locationId: number): Observable<AddUpdateLocationResponse> {
    return this.httpClient.put<AddUpdateLocationResponse>(ApiLinks.LOCATIONS + "/" + locationId, data);
  }


  public updateDepartment(data, locationId: number): Observable<AddUpdateDepartmentResponse> {
    return this.httpClient.put<AddUpdateDepartmentResponse>(ApiLinks.DEPARTMENTS + "/" + locationId, data);
  }

  public deleteLocation(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.LOCATIONS + "/" + locationId);
  }

  public addTower(data: any): Observable<AddEditTowerResponse> {
    return this.httpClient.post<AddEditTowerResponse>(ApiLinks.TOWERS, data);
  }

  public updateTower(data: any, towerId) {
    return this.httpClient.put<AddEditTowerResponse>(ApiLinks.TOWERS + "/" + towerId, data);
  }

  public deleteTower(towerId) {
    return this.httpClient.delete<BaseResponse>(ApiLinks.TOWERS + "/" + towerId);
  }


  public updateProfile(editableData: any): Observable<UpdateProfileResponse> {
    return this.httpClient.post<UpdateProfileResponse>(ApiLinks.EMPLOYEES + "/update_profile", editableData);
  }

  public changePassword(data: any): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(ApiLinks.CHANGE_PASSWORD, data);
  }

  public updateProfileImage(userImage: any): Observable<UpdateProfileImageResponse> {
    const formData: FormData = new FormData();
    formData.append('Image', userImage, userImage.name);
    return this.httpClient.post<UpdateProfileImageResponse>(ApiLinks.EMPLOYEES + "/change_profile_image",
      formData);
  }

  public updateUserPassword(userId: number, newPassword: string) {
    return this.httpClient.post<BaseResponse>(ApiLinks.CHANGE_USER_PASSWORD,
      {userId: userId, newPassword: newPassword});
  }


  public getMainCategories(): Observable<MainCategoriesResponse> {
    return this.httpClient.get<MainCategoriesResponse>(ApiLinks.MAIN_CATEGORIES);
  }

  public getRoles() {

    let apiLink = ApiLinks.ROLES;

    if (this.authGuard != null && this.authGuard.getUser() != null &&
      this.authGuard.getUser().role != null) {
      apiLink += "?all=" + this.authGuard.getUser().role.Id;

    }


    return this.httpClient.get<RolesResponse>(apiLink);
  }

  public getAssetAssignInvitationDetail(hashLink: string) {
    return this.httpClient.get<AssetInvitationResponse>(ApiLinks.ASSET + "/asset_assigned_invitation/" + hashLink);
  }


  public getAssigners(): Observable<AssignersResponse> {
    return this.httpClient.get<AssignersResponse>(ApiLinks.USERS + "assigners");
  }

   public getAssignedTo(): Observable<AssignedToResponse> {
    return this.httpClient.get<AssignedToResponse>(ApiLinks.USERS + "assigned_to");
  }

  public generateAssetNumber(): Observable<GenerateAssetNumber> {
    return this.httpClient.get<GenerateAssetNumber>(ApiLinks.ASSET + "/generate_asset_number");
  }


  public deleteAssetImage($assetImageId): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.ASSET + "/images/" + $assetImageId);
  }



  public searchAssetsExsel(excellAsset: Asset[]): Observable<SearchExcelAssetResponse> {
    const formData: FormData = new FormData();
    formData.append('Assets', JSON.stringify(excellAsset));
     return this.httpClient.post<SearchExcelAssetResponse>(ApiLinks.ASSETEXCEL, formData);
  }

}

