import {Injectable} from '@angular/core';
// import * as jsPDF from 'jspdf';
//
import * as jsPDFAuto from 'jspdf-autotable';
import {Asset} from "../model/search-assets/search-assets-response";
import {TranslateService} from "./translate.service";
import {TranslatePipe} from "./translate.pipe";

import * as XLSX from 'xlsx';
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "./api-service";
import {AssetTrackHistory} from "../model/assetTrackHistory";
import {Category} from "../model/main-category-categories/main-category-categories";
import {Model} from "../model/category-models/category-models-response";
import {Location} from "../model/locations/locations-response";
import {Tower} from "../model/location-towers/location-towers-response";
import {Floor} from "../model/floors/floors-response";
import {Room} from "../model/rooms/rooms-response";
import {DepartmentsEntity} from "../model/emp_department/department";
import {MainCategory} from "../model/asset-lookup/asset-lookup";
import {SessionCycleResult} from "../model/SessionCycleResult/SessionCycleResultResponse";
import {SessionCycle} from "../model/SessionCycle/SessionCycleResponse";


const jsPDF = require('jspdf');
require('jspdf-autotable');

@Injectable()
export class PdfServiceService {
  tr: TranslatePipe;

  constructor(private translate: TranslateService, private apiService: ApiService
  ) {
    this.tr = new TranslatePipe(translate);


  }

  rows = [];


  printMainCat(cats: Array<MainCategory>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
      ]);


    }

    this.printCSV();
  }




  printBuild(cats: Array<Tower>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("location"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
        , this.tr.transform(asset.location)
      ]);


    }

    this.printCSV();
  }

  printFloor(cats: Array<Floor>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("buildings"),
      this.tr.transform("location"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
        , this.tr.transform(asset.tower)
        , this.tr.transform(asset.tower.location)
      ]);


    }

    this.printCSV();
  }


  printDepartment(cats: Array<DepartmentsEntity>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name")

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
      ]);


    }

    this.printCSV();
  }

  printRoom(cats: Array<Room>) {
    this.rows = [];
    this.rows.push([
      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("floor"),
      this.tr.transform("building"),
      this.tr.transform("location"),
    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
        ,
        this.tr.transform(asset.floor),
        this.tr.transform(asset.floor.tower),
        this.tr.transform(asset.floor.tower.location),
      ]);


    }

    this.printCSV();
  }


  printLocation(cats: Array<Location>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("city"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
        , asset.CityName
      ]);


    }

    this.printCSV();
  }


  printInvitoryResult(cats: Array<SessionCycleResult> , nameSesson:SessionCycle) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("electronic_id"),
      this.tr.transform("status"),

      this.tr.transform("serial_number"),
      this.tr.transform("main_department"),
      this.tr.transform("category"),
      this.tr.transform("model"),
      this.tr.transform("location"),
      this.tr.transform("building"),
      this.tr.transform("floor"),
      this.tr.transform("offices_select"),




    ]);

    for (const asset of cats) {
      if (asset.asset == null){
        asset.asset = new Asset();
      }

      this.rows.push([
        this.tr.transform(asset.Epc),
        this.tr.transform(this.getstatuName(this.tr,asset)),
        asset.asset.SerialNumber,
        this.tr.transform( asset.asset.main_category)
        , this.tr.transform(asset.asset.category)
        , this.tr.transform(asset.asset.model)
        , this.tr.transform(asset.asset.location)
        , this.tr.transform(asset.asset.tower)
        , this.tr.transform(asset.asset.floor)
        , this.tr.transform(asset.asset.room)
      ]);


    }

    this.printCSV(nameSesson.Name);

  }

  public getstatuName (tr: TranslatePipe , Session: SessionCycleResult):string{
    if (Session.IsFound == 1 && Session.IsRead == 1) {
      return tr.transform("found2");
    }else if (Session.IsFound == 1 && Session.IsRead == 0) {
      return tr.transform("not_found2");
    }else if (Session.IsFound == 0 && Session.IsRead == 1 && Session.asset == null ) {
      return tr.transform("not_found_in_system");
    }else if (Session.IsFound == 0 && Session.IsRead == 1 && Session.asset != null) {
      return tr.transform("found_other_place") +
        tr.transform(Session.asset.location ) + "/"   + tr.transform(Session.asset.tower )  + "/"   +
        tr.transform(Session.asset.floor) + "/"   + tr.transform(Session.asset.room )

        ;
    }
  }

  printTrackHistory(cats: Array<AssetTrackHistory>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("status"),
      this.tr.transform("action"),
      this.tr.transform("empname"),
      this.tr.transform("CreatedOn"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        this.tr.transform(asset.asset_status),
        this.tr.transform(asset.asset_action),
         this.tr.transform(asset.employee),
         this.tr.transform(asset.CreatedOn)

      ]);


    }

    this.printCSV();

  }
  printModel(cats: Array<Model>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("category"),
      this.tr.transform("main_departments"),

    ]);


    for (const asset of cats) {
      if (asset.category == null){
        asset.category = new Category();
      }



        this.rows.push([
        asset.NameAr,
        asset.NameEn
        , this.tr.transform(asset.category)
        , this.tr.transform(asset.category.main_category)
      ]);


    }

    this.printCSV();
  }

  printSubCat(cats: Array<Category>) {
    this.rows = [];
    this.rows.push([

      this.tr.transform("arabic_name"),
      this.tr.transform("english_name"),
      this.tr.transform("main_department"),

    ]);

    for (const asset of cats) {
      this.rows.push([
        asset.NameAr,
        asset.NameEn
        , this.tr.transform(asset.main_category)
      ]);


    }

    this.printCSV();
  }

  printAssets(assetId: string, serialNumber: string, mainCategoryId: string,
              categoryId: string, modelId: string, statusId: string, locationId: string, towerId: string,
              floorId: string, roomId: string, assignerId, assignedToId, creatorId,
              QR,date_from, date_to, userRecive,epc,Priority,return_date) {


    this.rows = [];


    this.rows.push([
      this.tr.transform("electronic_id"),
      this.tr.transform("serial_number"),
      this.tr.transform("QR"),
      this.tr.transform("main_department"),
      this.tr.transform("category"),
      this.tr.transform("model"),
      this.tr.transform("status"),
      this.tr.transform("location"),
      this.tr.transform("building"),
      this.tr.transform("floor"),
      this.tr.transform("offices_select"),
      this.tr.transform("name_attached"),
      this.tr.transform("CreatedOn"),
      this.tr.transform("follow_request"),
      this.tr.transform("Comment"),
    ]);


    this.apiService.searchAssets("", serialNumber, mainCategoryId, categoryId,
      modelId, statusId, locationId, towerId, floorId
      , roomId, 0, 10000, assignerId,
      assignedToId, creatorId, QR,date_from,
      date_to, userRecive,epc,Priority,return_date).subscribe(response => {

      for (const asset of response.assets.assets) {
        this.rows.push([
          asset.Epc,
          asset.SerialNumber,
          asset.QR,
          this.tr.transform(asset.main_category)
          , this.tr.transform(asset.category)
          , this.tr.transform(asset.model)
          , this.tr.transform(asset.status)
          , this.tr.transform(asset.location)
          , this.tr.transform(asset.tower)
          , this.tr.transform(asset.floor)
          , this.tr.transform(asset.room)
          , this.tr.transform(asset.employee)
          , asset.CreatedOn
          , this.getAssetHistoryString(asset.asset_track_history)
          , asset.Comment
        ]);





      }

      this.printCSV();

    }, (error: HttpErrorResponse) => {

    });


  }


  printCSV(fileName: string = 'SheetJS') {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.rows);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName + '.xlsx');

  }

  getAssetHistoryString(assetTrackHisetory: AssetTrackHistory[]): string {
    let valuelist = this.tr.transform('status') + " - " +
      this.tr.transform('action') + " - " + this.tr.transform('empname')
      + " - " + this.tr.transform('CreatedOn') + "\n";

    for (let i = 0; i < assetTrackHisetory.length; i++) {
      valuelist += this.tr.transform(assetTrackHisetory[i].asset_status) + " - " +
        this.tr.transform(assetTrackHisetory[i].asset_action) + " - " +
        this.tr.transform(assetTrackHisetory[i].employee) + " - " +
        assetTrackHisetory[i].CreatedOn + "\n";

    }


    return valuelist;
  }
}
