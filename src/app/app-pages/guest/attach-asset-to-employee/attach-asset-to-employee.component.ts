import {Component, OnInit, ViewChild} from '@angular/core';

import {Location, MainCategory, Status} from "../../../model/asset-lookup/asset-lookup";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {Model} from "../../../model/category-models/category-models-response";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {Floor} from "../../../model/floors/floors-response";
import {Room} from "../../../model/rooms/rooms-response";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {TranslatePipe} from "../../../service/translate.pipe";
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {DialogService} from "../../../service/dialog.service";
import {TranslateService} from "../../../service/translate.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {User} from "../../../model/employee/EmployesResponse";
import {NgForm} from "@angular/forms";

import {AppRouter} from "../../../service/app-router";
import {AddAssainAssetRequest} from "../../../model/asset-lookup/AddAssainAssetRequest";
import {EmpService} from "../../user/systememps/emp-service";
import {AssaginService} from "./assagin-service";
import {AssetTrackHistory} from "../../../model/assetTrackHistory";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-attach-asset-to-employee',
  templateUrl: './attach-asset-to-employee.component.html',
  styleUrls: ['./attach-asset-to-employee.component.scss']
})
export class AttachAssetToEmployeeComponent implements OnInit {

  loadingIndicator = true;


  assets: Asset[];



  NoteText = "";

  submitForm = false;

  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService,
              private empService: EmpService,
              private assaginService: AssaginService,
              private alertService: DialogService,
              private translate: TranslateService,
              private router: ActivatedRoute
  ) {
    this.tr = new TranslatePipe(translate);
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

    this.assets = Array<Asset>();


    this.assaginService.getEmpAsset(this.router.snapshot.params.hash_link).subscribe(response => {
      for (const selected of response.assets) {



        const asset = selected.employee_asset_detail.asset;
        asset.Id =  selected.employee_asset_detail.Id;
        asset.IsCancelled =  selected.employee_asset_detail.IsCancelled;
        asset.IsConfirmed =  selected.employee_asset_detail.IsConfirmed;
        this.NoteText =  selected.Notes;

        this.assets.push(selected.employee_asset_detail.asset);


      }

    }, (error: HttpErrorResponse) => {

    });


  }


  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);

  }

  isAttachedBefore(item: Asset): boolean {
    let attachedBefore = true;

    if (item.IsConfirmed == 1 || item.IsCancelled == 1){
      attachedBefore = false;
    }

    return attachedBefore;
  }


  AcceptAsset(item: Asset, Index: number) {


    this.alertService.confirmationWithTitle(
      this.tr.transform("confirm_message"), () => {

        this.assaginService.ChangeStatusAsset("" + item.Id, "1").subscribe(response => {

         this.assets[Index].IsConfirmed = 1;

        }, (error: HttpErrorResponse) => {

        });

      });


  }


  RejectAsset(item: Asset, Index: number) {
    this.alertService.confirmationWithTitle(
      this.tr.transform("cancel_message"), () => {
        this.assaginService.ChangeStatusAsset("" + item.Id, "0").subscribe(response => {

          this.assets[Index].IsCancelled = 1;

        }, (error: HttpErrorResponse) => {

        });

      });
  }


}
