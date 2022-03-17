import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Asset} from "./model/search-assets/search-assets-response";
import {User} from "./model/employee/EmployesResponse";

@Injectable()
export class CommonDataService {

  public loader: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public assets: Asset[];
  public emplist: User[];


  constructor() {
  }

  showLoader(value: boolean) {
    this.loader.next(value);
  }

  setExpandDiv(id) {

    if (document.getElementById(id) != null) {
      document.getElementById(id).setAttribute("class", "collapse show");
      document.getElementById(id).previousElementSibling.setAttribute("aria-expanded", "true");
    }

  }


  setAssetArray(userid: Asset[]) {
    this.assets = userid;
  }

  setEmployeeArray(userid: User[]) {
    this.emplist = userid;
  }
}
