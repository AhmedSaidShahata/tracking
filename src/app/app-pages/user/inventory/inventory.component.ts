import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {AddNewEmpComponent} from "../add-new-emp/add-new-emp.component";
import {AddNewInvatoryComponent} from "../add-new-invatory/add-new-invatory.component";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../../service/dialog.service";
import {ApiService} from "../../../service/api-service";
import {InventoryService} from "./inventory.service";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {SessionCycle, SessionCycleResponse} from "../../../model/SessionCycle/SessionCycleResponse";
import {SessionReportComponent} from "../session-report/session-report.component";
import {SessionCycleResult} from "../../../model/SessionCycleResult/SessionCycleResultResponse";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {



  @ViewChild("addinv")
  addcomponent: AddNewInvatoryComponent;



  @ViewChild("sessionResult")
  sessionResult: SessionReportComponent;



  loadingIndicator = true;


  sessionCycle: SessionCycle[];



  offset = 0;
  limit = 10;
  count = 0;



  constructor(private _commondata: CommonDataService,
              private alertService: DialogService,
              private apiService: InventoryService,
  ) {

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

  }

  ngOnInit(): void {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    this.SearchAsset(this.offset);

  }


  showAddNewItem() {

    this.addcomponent.showModel(asset => {

      this.SearchAsset(this.offset);

    });

  }


  SearchAsset(event) {
       this.offset = event;
    this.apiService.getJobs(this.offset, this.limit).subscribe(response => {
      this.sessionCycle = response.SessionCycles.SessionCycles;
      this.count = response.SessionCycles.count;


    }, (error: HttpErrorResponse) => {

    });

  }


  showReport(selectedAssets: SessionCycle,i :number) {


    this.apiService.getResult(selectedAssets.Id).subscribe(response => {

      this.sessionResult.showModel(response.SessionCycleResults ,selectedAssets );





    }, (error: HttpErrorResponse) => {

    });







  }


  editAsset(selectedAssets: SessionCycle,i :number) {


    this.addcomponent.EditMode(selectedAssets,asset => {

      this.SearchAsset(this.offset);

    });

  }

  deleteAsset(selectedAssets: Asset,i :number) {
    this.alertService.deleteMessage(() => {
      this.apiService.deleteNationality(selectedAssets.Id)
        .subscribe(response => {
          this.sessionCycle.splice(i, 1);

          this.alertService.SuccesMessage();
        }, (error: HttpErrorResponse) => {
        });
    });
  }



}
