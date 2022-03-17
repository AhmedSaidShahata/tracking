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
import {AddEditEmployee, EmployeeResponse, EmployeExceleResponse, User} from "../../../model/employee/EmployesResponse";
import {AssignedToResponse} from "../../../model/assigned-to/asignedto-response";
import {Cacheable} from "ngx-cacheable";


@Injectable()
export class EmpService {

  constructor(private authGuard: AuthGuard, private httpClient: HttpClient) {

  }


  public getAssignedTo(offset: number, limit: number, dep: string): Observable<AssignedToResponse> {
    return this.httpClient.get<AssignedToResponse>(ApiLinks.USERS + "assigned_to");
  }


  public getEmps(offset: number, limit: number,
                 dep: string, jop: string,  empname: string, mobileNumber: string,
                 selectedlocation: string, extension_number: string, emp_number: string, ip_address: string
    , userRoleselected: string, selectedAssigner: string, email: string, Priority: string
  ) {
    let apiLink = ApiLinks.EMPLOYEES + "/filterEmployees";
    let addQuestionMark = false;

    if (email != "") {
      if (addQuestionMark) {
        apiLink += "&email=" + email;
      } else {
        apiLink += "?email=" + email;
        addQuestionMark = true;
      }
    }
    if (selectedlocation != "") {
      if (addQuestionMark) {
        apiLink += "&LocationId=" + selectedlocation;
      } else {
        apiLink += "?LocationId=" + selectedlocation;
        addQuestionMark = true;
      }
    }

    if (Priority != "") {
      if (addQuestionMark) {
        apiLink += "&Priority=" + Priority;
      } else {
        apiLink += "?Priority=" + Priority;
        addQuestionMark = true;
      }
    }




    if (selectedAssigner == null){
      selectedAssigner = "";
    }

    if (selectedAssigner != "") {
      if (addQuestionMark) {
        apiLink += "&manger=" + selectedAssigner;
      } else {
        apiLink += "?manger=" + selectedAssigner;
        addQuestionMark = true;
      }
    }
    if (userRoleselected != "") {
      if (addQuestionMark) {
        apiLink += "&roleId=" + userRoleselected;
      } else {
        apiLink += "?roleId=" + userRoleselected;
        addQuestionMark = true;
      }
    }


    if (mobileNumber != "") {
      if (addQuestionMark) {
        apiLink += "&mobile=" + mobileNumber;
      } else {
        apiLink += "?mobile=" + mobileNumber;
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

    if (dep != "") {
      if (addQuestionMark) {
        apiLink += "&DepartmentId=" + dep;
      } else {
        apiLink += "?DepartmentId=" + dep;
        addQuestionMark = true;
      }
    }


    if (jop != "") {
      if (addQuestionMark) {
        apiLink += "&JobId=" + jop;
      } else {
        apiLink += "?JobId=" + jop;
        addQuestionMark = true;
      }
    }


    if (empname != "") {
      if (addQuestionMark) {
        apiLink += "&Name=" + empname;
      } else {
        apiLink += "?Name=" + empname;
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

    return this.httpClient.get<EmployeeResponse>(apiLink);
  }

  public searchEmpsExsel(excellAsset: User[]) {
    const apiLink = ApiLinks.EMPLOYEES + "/assetsexcel";


    const formData: FormData = new FormData();

    formData.append('Employees', JSON.stringify(excellAsset));


    return this.httpClient.post<EmployeExceleResponse>(apiLink, formData);
  }


  public addEmp(userData: User, userImage): Observable<AddEditEmployee> {
    const formData: FormData = new FormData();
    if (userImage != null && userImage.name != null) {
      formData.append('Image', userImage, userImage.name);

    }
    formData.append('UserData', JSON.stringify(userData));
    return this.httpClient.post<AddEditEmployee>(ApiLinks.EMPLOYEES, formData);
  }


  public updateEmp(userData: User, userImage): Observable<AddEditEmployee> {
    const formData: FormData = new FormData();
    if (userImage != null && userImage.name != null) {
      formData.append('Image', userImage, userImage.name);

    }
    formData.append('UserData', JSON.stringify(userData));
    formData.append("_method", "PUT");
    return this.httpClient.post<AddEditEmployee>(ApiLinks.EMPLOYEES + "/" + userData.Id, formData);
  }


  public deleteEmp(locationId: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(ApiLinks.EMPLOYEES + "/" + locationId);
  }

  public sendAssetReminder(employeeId: number): Observable<BaseResponse> {
    return this.httpClient.get<BaseResponse>(ApiLinks.ASSET + "/send_reminder/" + employeeId);
  }

  addMulti(assetSelected: User): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(ApiLinks.EMPLOYEES + "/multiUserExcel", assetSelected);

  }
}

