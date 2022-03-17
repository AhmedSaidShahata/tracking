import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from "../../../shared/_services";
import {CommonDataService} from "../../../common-data.service";
import {Location, MainCategory, Status} from "../../../model/asset-lookup/asset-lookup";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {Model} from "../../../model/category-models/category-models-response";
import {Tower} from "../../../model/location-towers/location-towers-response";

import {Asset} from "../../../model/search-assets/search-assets-response";
import {ApiService} from "../../../service/api-service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {DialogService} from "../../../service/dialog.service";
import {Room} from "../../../model/rooms/rooms-response";
import {Floor} from "../../../model/floors/floors-response";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {AssetImagesComponent} from "../asset-images/asset-images.component";
import {delay} from "q";

@Component({
  selector: 'app-addnew-asset',
  templateUrl: './addnew-asset.component.html',
  styleUrls: ['./addnew-asset.component.scss']
})
export class AddnewAssetComponent implements OnInit {


  DateCreate: NgbDateStruct;
  DateBuy: NgbDateStruct;
  numberOfSupportedYears = "";
  DesAr = "";
  DesEn = "";
  Comment = "";


  selectedTab = "collapse1";


  selectedMainCat = "";
  selectedstatus = "";
  selectedPriority = "";
  selectedSubcat = "";
  selectedModel = "";
  selectedLocation = "";
  selectedTowers = "";
  selectedFloors = "";
  selectedRoom = "";
  serial_number = "";
  electronic_id = "";
  QR = "";

  AssetId = 0;
  submitForm = false;


  main_categories: MainCategory[];
  sub_category: Category[];
  status: Status[];
  locations: Location[];
  models: Model[];
  towers: Tower[];
  floors: Floor[];
  rooms: Room[];
  assetSelected: Asset = new Asset();
  callback = null;

  editMode = false;
  disableGenrator = false;

  //GUI.
  @ViewChild("assetImages")
  assetImages: AssetImagesComponent;

  constructor(private _commondata: CommonDataService,
              private alertService: DialogService,
              private modalService: ModalService,
              private apiService: ApiService) {


  }


  ngOnInit() {


  }


  showModel(callback: (asset: Asset) => any) {
    this.callback = callback;

    this.modalService.open("add_new_asset");
    this.ClearAll();
    this.setLookupData();
  }


  showModelWithEPc(Epc: string) {

    this.modalService.open("add_new_asset");
    this.ClearAll();
    this.setLookupData();

    this.QR = Epc;
    this.serial_number = Epc;
    this.electronic_id = Epc;
  }

  EditMode(asset: Asset, callback: (asset: Asset) => any) {
    this.ClearAll();
    this.callback = callback;

    this.modalService.open("add_new_asset");
    this.editMode = true;
    this.assetSelected = asset;

    this.assetImages.setImages(asset.images);

    this.selectedMainCat = this.getEmptyIfNull(asset.MainCategoryId);
    this.selectedstatus = this.getEmptyIfNull(asset.AssetStatusId);
    this.selectedPriority = this.getEmptyIfNull(asset.Priority);
    this.selectedSubcat = this.getEmptyIfNull(asset.CategoryId);
    this.selectedModel = this.getEmptyIfNull(asset.ModelId);
    this.selectedLocation = this.getEmptyIfNull(asset.LocationId);
    this.selectedTowers = this.getEmptyIfNull(asset.TowerId);
    this.selectedFloors = this.getEmptyIfNull(asset.FloorId);
    this.selectedRoom = this.getEmptyIfNull(asset.RoomId);
    this.serial_number = this.getEmptyIfNull(asset.SerialNumber);
    this.electronic_id = this.getEmptyIfNull(asset.Epc);
    this.numberOfSupportedYears = this.getEmptyIfNull(asset.NoSupportedYears);
    this.DesAr = this.getEmptyIfNull(asset.DescriptionAr);
    this.DesEn = this.getEmptyIfNull(asset.DescriptionEn);
    this.Comment = this.getEmptyIfNull(asset.Comment);
    this.QR = this.getEmptyIfNull(asset.QR);

    this.AssetId = asset.Id;


    if (this.getEmptyIfNull(asset.ManufactureDate) != "") {
      const valueFrom = asset.ManufactureDate.split(" ")[0].split("-");
      this.DateCreate = new class implements NgbDateStruct {
        day: number = Number(valueFrom[2]);
        month: number = Number(valueFrom[1]);
        year: number = Number(valueFrom[0]);
      };
    }

    if (this.getEmptyIfNull(asset.PurchaseDate) != "") {
      const valueTO = asset.PurchaseDate.split(" ")[0].split("-");
      this.DateBuy = new class implements NgbDateStruct {
        day: number = Number(valueTO[2]);
        month: number = Number(valueTO[1]);
        year: number = Number(valueTO[0]);
      };

    }


    this.setLookupData();
    this.getModel(null);
    this.getFloors(null);
    this.getFloorRooms(null);
    this.getBuild(null);
    this.getAllSubCat(null);
  }

  getEmptyIfNull(par: any) {
    if (par == null || par == undefined) {
      return "";
    }

    return "" + par;
  }

  closeModal() {
    this.modalService.close("add_new_asset");

  }


  getModel(deviceValue) {
    if (this.selectedSubcat == "") {
      return;
    }

    this.apiService.getCategoryModels(this.selectedSubcat)
      .subscribe(response => {
        this.models = response.models;

      }, (error: HttpErrorResponse) => {

      });
  }


  getFloors(deviceValue) {

    if (this.selectedTowers == "") {
      return;
    }
    this.apiService.getTowerFloors(this.selectedTowers)
      .subscribe(response => {
        this.floors = response.floors;
      }, (error: HttpErrorResponse) => {

      });
  }


  getFloorRooms(deviceValue) {

    if (this.selectedFloors == "") {
      return;
    }


    this.apiService.getFloorRooms(this.selectedFloors)
      .subscribe(response => {
        this.rooms = response.rooms;
      }, (error: HttpErrorResponse) => {

      });
  }


  getBuild(deviceValue) {

    if (this.selectedLocation == "") {
      return;
    }


    this.apiService.getLocationTowers(this.selectedLocation)
      .subscribe(response => {
        this.towers = response.towers;
      }, (error: HttpErrorResponse) => {

      });
  }

  getAllSubCat(deviceValue) {


    if (this.selectedMainCat == "") {
      return;
    }


    this.apiService.getMainCategoryCategories(this.selectedMainCat)
      .subscribe(response => {
        this.sub_category = response.categories;
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


  ClearAll() {
    this.DateBuy = null;
    this.DateCreate = null;
    this.assetImages.setImages([]);
    this.selectedMainCat = "";
    this.submitForm = false;
    this.selectedstatus = "";
    this.selectedPriority = "";
    this.QR = "";
    this.selectedSubcat = "";
    this.selectedModel = "";
    this.selectedLocation = "";
    this.selectedTowers = "";
    this.selectedFloors = "";
    this.selectedRoom = "";
    this.serial_number = "";
    this.electronic_id = "";
    this.numberOfSupportedYears = "";
    this.DesAr = "";
    this.Comment = "";
    this.DesEn = "";
    this.editMode = false;
    this.selectedTab = "collapse1";

    document.getElementById(this.selectedTab).setAttribute("class", "acd-des collapse hide");
    document.getElementById(this.selectedTab).previousElementSibling.setAttribute("aria-expanded", "false");
    this.disableGenrator = false;


    this.expandCollpse(this.selectedTab);


  }

   onPasteQR(event: ClipboardEvent) {

    this.QR =  $("#QR").val();
  }

   onPasteSerial(event: ClipboardEvent) {
     this.serial_number =  $("#serial_number").val();

   }
   onPasteElectronic(event: ClipboardEvent) {

    this.electronic_id = $("#electronic_id").val();
  }

  addNewAsset(addasset: NgForm) {
    console.log(addasset);
    this.submitForm = true;

    if (addasset.invalid) {
      return;
    }


    this.assetSelected.MainCategoryId = Number(this.selectedMainCat);
    this.assetSelected.SerialNumber = this.serial_number;
    this.assetSelected.Epc = this.electronic_id;
    this.assetSelected.Priority = this.selectedPriority;
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
    this.assetSelected.Comment = this.Comment;
    this.assetSelected.QR = this.QR;

    if (this.editMode) {
      // check if user add images or not.
      // if (!this.assetImages.addImages()) {
      //   this.alertService.showErrorMessage("add images");
      //   return;
      // }
      this.assetSelected.Id = this.AssetId;
      this.apiService.updateAsset(this.assetSelected, this.assetImages.getLocalImages())
        .subscribe(response => {
          this.modalService.close("add_new_asset");
          this.alertService.SuccesMessage();
          this.callback(response.asset);
          this.ClearAll();

        }, (error: HttpErrorResponse) => {


        });
    } else {
      // if (!this.assetImages.addImages()) {
      //   this.alertService.showErrorMessage("add images");
      //   return;
      // }
      this.apiService.addAsset(this.assetSelected, this.assetImages.getLocalImages())
        .subscribe(response => {
          this.modalService.close("add_new_asset");
          this.callback(response.asset);
          this.ClearAll();
          this.alertService.SuccesMessage();
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
    }


  }


  fileSelect($event) {

    if (this.assetImages.images.length >= 4) {
      this.alertService.showErrorMessage("Cannot_images");

    }
    const image = $event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(image); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.assetImages.addImage(event.target.result, image);
    };
  }

  expandCollpse(sectionName) {
    this.selectedTab = sectionName;
    const CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "acd-des collapse" || CurrentCls == "acd-des collapse hide") {
      document.getElementById(sectionName).setAttribute("class", "acd-des collapse show");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "true");

      if (sectionName == 'collapse1') {
        sectionName = 'collapse2';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse3';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      } else if (sectionName == 'collapse2') {
        sectionName = 'collapse1';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse3';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      } else if (sectionName == 'collapse3') {
        sectionName = 'collapse1';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse2';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      }

    } else {
      document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
    }
  }

  generateAssetNumber() {
    this.apiService.generateAssetNumber().subscribe(response => {
      this.QR = response.number;
      this.serial_number = response.number;
      this.electronic_id = response.number;
      this.disableGenrator = true;
    }, error1 => {
      console.log(error1);
    });
  }
}
