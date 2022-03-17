import { Component, OnInit } from '@angular/core';
import {Location, MainCategory, Status} from "../asset-lookup/asset-lookup";
import {Category} from "../main-category-categories/main-category-categories";
import {Model} from "../category-models/category-models-response";
import {Room} from "../rooms/rooms-response";
import {Floor} from "../floors/floors-response";
import {Tower} from "../location-towers/location-towers-response";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../service/api-service";
import {ModalService} from "../../shared/_services";
import {DialogService} from "../../service/dialog.service";
import {CommonDataService} from "../../common-data.service";
import {NgForm} from "@angular/forms";
import {Asset} from "../search-assets/search-assets-response";
import {AppRouter} from "../../service/app-router";
import {ToastsManager} from "ng2-toastr";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {TranslateService} from "../../service/translate.service";
import {TranslatePipe} from "../../service/translate.pipe";

@Component({
  selector: 'app-excel-asset',
  templateUrl: './excel-asset.component.html',
  styleUrls: ['./excel-asset.component.scss']
})
export class ExcelAssetComponent implements OnInit {

  selectedMainCat = "";
  selectedstatus = "";
  selectedSubcat = "";
  selectedModel = "";
  selectedLocation = "";
  selectedTowers = "";
  selectedFloors = "";
  selectedRoom = "";


  DateCreate: NgbDateStruct;
  DateBuy: NgbDateStruct;
  numberOfSupportedYears = "";
  DesAr = "";
  DesEn = "";



  main_categories: MainCategory[];
  sub_category: Category[];
  status: Status[];
  locations: Location[];
  models: Model[];
  towers: Tower[];
  floors: Floor[];
  rooms: Room[];
  assets: Asset[];
  submitForm = false;

  assetSelected: Asset = new Asset();
  tr: TranslatePipe;



  inSystemCount = 0;
  outSystemCount = 0;


  constructor(private _commondata: CommonDataService,
              private alertService: DialogService,
              private router: AppRouter,
              private toast: ToastsManager,
              private translate: TranslateService,

              private apiService: ApiService) {

    this.tr = new TranslatePipe(translate);



  }

  ngOnInit() {
    this.setLookupData();
    this._commondata.setExpandDiv('Table');

    this.assets = this._commondata.assets;


    this.assets .forEach((element, index) => {
      if(element.foundinsystem){
        this.inSystemCount ++;
      }else {
        this.outSystemCount++;
      }
    });

  }

  ClearAll() {

    this.selectedMainCat = "";
    this.submitForm = false;
    this.selectedstatus = "";
    this.selectedSubcat = "";
    this.selectedModel = "";
    this.selectedLocation = "";
    this.selectedTowers = "";
    this.selectedFloors = "";
    this.selectedRoom = "";
    this.DesAr = "";
    this.DesEn = "";
    this.DateCreate = null;
    this.DateBuy = null;
    this.numberOfSupportedYears = "";

    this.inSystemCount = 0;
    this.outSystemCount = 0;


    this.assets .forEach((element, index) => {
      if(element.foundinsystem){
        this.inSystemCount ++;
      }else {
        this.outSystemCount++;
      }
    });

  }
  AssginAssets(addasset: NgForm) {
    console.log(addasset);
    this.submitForm = true;

    if (addasset.form.invalid) {
      return;
    }


    this.assetSelected.MainCategoryId = Number(this.selectedMainCat);
      this.assetSelected.CategoryId = Number(this.selectedSubcat);
    this.assetSelected.ModelId = Number(this.selectedModel);
    this.assetSelected.AssetStatusId = Number(this.selectedstatus);
    this.assetSelected.LocationId = Number(this.selectedLocation);
    this.assetSelected.TowerId = Number(this.selectedTowers);
    this.assetSelected.FloorId = Number(this.selectedFloors);
    this.assetSelected.RoomId = Number(this.selectedRoom);


    if (this.DateBuy != null) {
      this.assetSelected.PurchaseDate = this.DateBuy.year + "-" +
        this.DateBuy.month + "-" + this.DateBuy.day;

    }
    if (this.DateCreate != null) {

      this.assetSelected.ManufactureDate = this.DateCreate.year + "-" + this.DateCreate.month + "-" + this.DateCreate.day;
    }

    this.assetSelected.NoSupportedYears = Number(this.numberOfSupportedYears);
    this.assetSelected.DescriptionAr = this.DesAr;
    this.assetSelected.DescriptionEn = this.DesEn;


    const excellAsset: Asset[] = Array<Asset>();
    const deleteIndexs: number[] = Array<number>();

    this.assets .forEach((element, index) => {

      if(element.selectedAttach){
        excellAsset.push(element);
        deleteIndexs.push(index);

      }


    });



      if (excellAsset.length == 0) {

        this.toast.error(this.tr.transform("Choose_one"));
        return;
      }

    this.assetSelected.Assets = excellAsset;

    this.apiService.addMultiAsset(this.assetSelected)
      .subscribe(response => {
        deleteIndexs .forEach((element, index) => {


          this.assets.splice(element, 1);


        });

        this.assets .forEach((element, index) => {

            element.selectedAttach = false;




        });
        this.ClearAll();


        this.alertService.SuccesMessage();


      }, (error: HttpErrorResponse) => {

      });




  }

  getModel(deviceValue) {
    this.apiService.getCategoryModels(this.selectedSubcat)
      .subscribe(response => {
        this.models = response.models;
        this.selectedModel = "";

      }, (error: HttpErrorResponse) => {

      });
  }


  getFloors(deviceValue) {
    this.apiService.getTowerFloors(this.selectedTowers)
      .subscribe(response => {
        this.floors = response.floors;
        this.selectedFloors = "";
      }, (error: HttpErrorResponse) => {

      });
  }


  getFloorRooms(deviceValue) {
    this.apiService.getFloorRooms(this.selectedFloors)
      .subscribe(response => {
        this.rooms = response.rooms;
        this.selectedRoom = "";
      }, (error: HttpErrorResponse) => {

      });
  }


  getBuild(deviceValue) {
    this.apiService.getLocationTowers(this.selectedLocation)
      .subscribe(response => {
        this.towers = response.towers;
        this.selectedTowers = "";
      }, (error: HttpErrorResponse) => {

      });
  }

  getAllSubCat(deviceValue) {

    this.apiService.getMainCategoryCategories(this.selectedMainCat)
      .subscribe(response => {
        this.sub_category = response.categories;
        this.selectedSubcat = "";
      }, (error: HttpErrorResponse) => {

      });
  }

  setLookupData() {
    this.apiService.getAssetLookup()
      .subscribe(response => {
        this.main_categories = response.lookup.main_categories;
        this.status = response.lookup.status;
        this.locations = response.lookup.locations;

      }, (error: HttpErrorResponse) => {

      });
  }


  deleteAsset(selectedAssets: Asset, rowIndex: number) {
    this.assets.splice(rowIndex, 1);

  }


  selectInAsset() {




    this.assets .forEach((element, index) => {

      if(element.foundinsystem){
        element.selectedAttach = true;
      }else {
        element.selectedAttach = false;

      }


    });

  }



  selectOutAsset() {
    this.assets .forEach((element, index) => {

      if(!element.foundinsystem){
        element.selectedAttach = true;
      }else {
        element.selectedAttach = false;

      }



    });

  }
}
