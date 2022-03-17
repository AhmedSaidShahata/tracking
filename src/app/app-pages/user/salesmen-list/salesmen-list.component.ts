import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonDataService} from '../../../common-data.service';
import {ApiService} from '../../../service/api-service';
import {HttpErrorResponse} from '@angular/common/http';
import {DialogService} from '../../../service/dialog.service';
import {AppRouter} from "../../../service/app-router";
import {AddnewAssetComponent} from "../addnew-asset/addnew-asset.component";
import {FollowAssetComponent} from "../follow-asset/follow-asset.component";
import {Location, MainCategory, Status} from "../../../model/asset-lookup/asset-lookup";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {Model} from "../../../model/category-models/category-models-response";
import {Tower} from "../../../model/location-towers/location-towers-response";

import {Asset} from "../../../model/search-assets/search-assets-response";
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {Floor} from "../../../model/floors/floors-response";
import {Room} from "../../../model/rooms/rooms-response";
import {ToastsManager} from "ng2-toastr";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {Assigner} from "../../../model/assigners/asigners-response";
import {AssignedTo} from "../../../model/assigned-to/asignedto-response";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-salesmen',
  templateUrl: './salesmen-list.component.html',
  styleUrls: ['./salesmen-list.component.scss']
})
export class SalesmenListComponent implements OnInit {


  //GUI.
  @ViewChild("addcomponent")
  addcomponent: AddnewAssetComponent;
  @ViewChild("followasset")
  followasset: FollowAssetComponent;
  //Variables.
  selectedMainCat = "";


  date_from: NgbDateStruct;
  date_to: NgbDateStruct;
  return_date: NgbDateStruct;


  selectedstatus = "";
  selectedSubcat = "";
  selectedModel = "";
  selectedLocation = "";
  selectedPriority = "";
  selectedTowers = "";
  selectedFloors = "";
  selectedRoom = "";
  serial_number = "";
  QR = "";
  electronic_id = "";
  loadingIndicator = true;
  selectedAssigner = null;
  selectedAssignedTo = null;
  userRecive = "0";
  selectedCreator = null;
  offset = 0;
  limit = 10;
  count = 0;
  //Objects.
  main_categories: MainCategory[];
  sub_category: Category[];
  status: Status[];
  locations: Location[];
  models: Model[];
  towers: Tower[];
  floors: Floor[];
  rooms: Room[];
  assets: Asset[];
  selectedAttachAssets: Asset[];
  tr: TranslatePipe;
  assigners: Assigner[];
  assignedTo: AssignedTo[];


  constructor(private _commondata: CommonDataService,
              private apiService: ApiService,
              private alertService: DialogService,
              private translate: TranslateService,
              private router: AppRouter,
              private toast: ToastsManager,
              private pdfServiceService: PdfServiceService,
  ) {
    this.tr = new TranslatePipe(translate);
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
    this.setLookupData();
    this.SearchAsset();
    this.selectedAttachAssets = Array<Asset>();
    this.getAssigners();
    this.getAssignedTo();

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

  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);

  }


  onChangeAsset(item: Asset, event) {
    if (item.selectedAttach == true) {
      this.selectedAttachAssets.push(item);
    } else {

      let number = 0;


      for (let i = 0; i < this.selectedAttachAssets.length; i++) {
        if (this.selectedAttachAssets[i].Id == item.Id) {
          number = i;
        }

      }


      this.selectedAttachAssets.splice(number, 1);
    }
  }

  attachAssets() {


    if (this.selectedAttachAssets.length == 0) {

      this.toast.error(this.tr.transform("Choose_one"));
      return;
    }


    this._commondata.setAssetArray(this.selectedAttachAssets);

    this.router.navigate('attach_assets'); // navigate to app.

  }

  showAddNewItem() {

    this.addcomponent.showModel(asset => {
      // this.assets.push(asset);
      this.SearchAssetPage(this.offset);
    });
    // this.alertService.showErrorMessage('User not found');

  }

  editAsset(selectedAssets: Asset, i: number) {
    this.addcomponent.EditMode(selectedAssets, asset => {
      this.SearchAssetPage(this.offset);

      //  this.assets[i] = asset;

    });

  }

  importExcelfile() {

    const yourElem = <HTMLElement>document.querySelector('#fileexplore');
    yourElem.click();


  }

  importExcel($event) {
    this._commondata.showLoader(true);


    const image = $event.target.files[0];

    const reader = new FileReader();


    reader.onload = (e: any) => {


      let binary = "";
      const bytes = new Uint8Array(e.target.result);
      const length = bytes.byteLength;
      for (let i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const selfme = this;

      // call 'xlsx' to read the file
      const oFile = XLSX.read(binary, {type: 'binary', cellDates: true, cellStyles: true});

      oFile.SheetNames.forEach(function (sheetName) {
        // Here is your object
        const XL_row_object = XLSX.utils.sheet_to_json(oFile.Sheets[sheetName]);

        const excellAsset: Asset[] = Array<Asset>();


        XL_row_object.forEach((element, index) => {

          if (index != 0) {
            console.log(element);
            const object: Asset = new Asset();
            object.SerialNumber = element["*"];
            object.QR = element["*_1"];
            object.Epc = element["*_2"];
            excellAsset.push(object);
          }


        });

        selfme.searchExcelAsset(excellAsset);

      });

    };


    reader.readAsArrayBuffer(image); // read file as data url


  }


  searchExcelAsset(excellAsset: Asset[]) {

    this.apiService.searchAssetsExsel(excellAsset).subscribe(response => {
      this._commondata.setAssetArray(response.assets);

      this.router.navigate('excel_assets');

    });


  }

  printAsset() {

    if (this.assets.length <= 0) {
      this.toast.error(this.tr.transform("NODATA"));

      return;
    }


    this.alertService.confirmationWithTitle(
      this.tr.transform("sure") + this.tr.transform("export_report") +
      this.tr.transform("؟"), () => {


        this.pdfServiceService.printAssets("", this.serial_number, this.selectedMainCat, this.selectedSubcat,
          this.selectedModel, this.selectedstatus, this.selectedLocation, this.selectedTowers, this.selectedFloors
          , this.selectedRoom, this.selectedAssigner, this.selectedAssignedTo, this.selectedCreator, this.QR,
          this.date_from, this.date_to, this.userRecive, this.electronic_id, this.selectedPriority,this.return_date
        );
      });


  }

  SearchAsset() {
    this.offset = 0;
    this.apiService.searchAssets("", this.serial_number, this.selectedMainCat, this.selectedSubcat,
      this.selectedModel, this.selectedstatus, this.selectedLocation, this.selectedTowers, this.selectedFloors
      , this.selectedRoom, this.offset, this.limit, this.selectedAssigner,
      this.selectedAssignedTo, this.selectedCreator, this.QR, this.date_from, this.date_to,
      this.userRecive, this.electronic_id, this.selectedPriority,this.return_date).subscribe(response => {

      if (this.selectedAttachAssets != null && this.selectedAttachAssets.length > 0) {
        for (const asset of response.assets.assets) {

          for (const selected of this.selectedAttachAssets) {

            if (selected.Id == asset.Id) {
              asset.selectedAttach = true;
            }
          }
        }
      }


      this.assets = response.assets.assets;
      this.count = response.assets.count;
      if (response.assets.assets.length == 0) {
        this.toast.error(this.tr.transform("no_search_data"));

      }
    }, (error: HttpErrorResponse) => {
      console.log(error);

    });

  }


  SearchAssetPage(event) {

    this.offset = event;
    this.apiService.searchAssets("", this.serial_number, this.selectedMainCat, this.selectedSubcat,
      this.selectedModel, this.selectedstatus, this.selectedLocation, this.selectedTowers, this.selectedFloors
      , this.selectedRoom, this.offset, this.limit, this.selectedAssigner, this.selectedAssignedTo,
      this.selectedCreator, this.QR, this.date_from,
      this.date_to, this.userRecive, this.electronic_id, this.selectedPriority,this.return_date).subscribe(response => {

      if (this.selectedAttachAssets != null && this.selectedAttachAssets.length > 0) {
        for (const asset of response.assets.assets) {

          for (const selected of this.selectedAttachAssets) {

            if (selected.Id == asset.Id) {
              asset.selectedAttach = true;
            }
          }
        }
      }


      this.assets = response.assets.assets;
      this.count = response.assets.count;

    }, (error: HttpErrorResponse) => {

    });

  }


  ClearAll() {

    this.selectedMainCat = "";
    this.selectedstatus = "";
    this.selectedSubcat = "";
    this.selectedModel = "";
    this.selectedLocation = "";
    this.selectedPriority = "";
    this.selectedTowers = "";
    this.selectedFloors = "";
    this.selectedRoom = "";
    this.serial_number = "";
    this.electronic_id = "";
    this.QR = "";


    this.selectedAssigner = null;
    this.selectedAssignedTo = null;
    this.userRecive = "0";
    this.selectedCreator = null;
    this.date_from = null;
    this.date_to = null;

  }


  deleteAsset(selectedAssets: Asset, rowIndex: number) {
    this.alertService.deleteMessage(() => {
      this.apiService.deleteAsset(selectedAssets.Id)
        .subscribe(response => {
          this.alertService.SuccesMessage();
          this.assets.splice(rowIndex, 1);
          this.selectedAttachAssets = [];

        }, (error: HttpErrorResponse) => {
        });
    });
  }

  printeAsset(selectedAssets: Asset, rowIndex: number) {
    //   this.assets[i] = asset;

  }


  checboxAssaing(selectedAssets: Asset) {
    selectedAssets.checkForEmp = !selectedAssets.checkForEmp;
  }

  changeStatusToMissing(asset: Asset, rowIndex: number) {

    const selectedAssets = new Asset();
    selectedAssets.Id = asset.Id;

    this.alertService.confirmationWithTitle(
      this.tr.transform("sure") + this.tr.transform("change_status_to_missing") +
      this.tr.transform("؟"), () => {


        selectedAssets.AssetStatusId = 4;
        this.apiService.updateAsset(selectedAssets, null)
          .subscribe(response => {
            this.assets[rowIndex] = response.asset;

            this.alertService.SuccesMessage();
          }, (error: HttpErrorResponse) => {
          });


      });


  }

  changeStatusToCorrupted(asset: Asset, rowIndex: number) {
    const selectedAssets = new Asset();
    selectedAssets.Id = asset.Id;
    this.alertService.confirmationWithTitle(
      this.tr.transform("sure")
      + this.tr.transform("change_status_to_corrupted")
      + this.tr.transform("؟"), () => {
        selectedAssets.AssetStatusId = 3;
        this.apiService.updateAsset(selectedAssets, null)
          .subscribe(response => {
            this.assets[rowIndex] = response.asset;
            this.alertService.SuccesMessage();
          }, (error: HttpErrorResponse) => {
          });
      });
  }

  usedBefore(asset: Asset, rowIndex: number) {
    const selectedAssets = new Asset();
    selectedAssets.Id = asset.Id;
    this.alertService.confirmationWithTitle(
      this.tr.transform("sure") +
      this.tr.transform("used_before") +
      this.tr.transform("؟"), () => {
        selectedAssets.AssetStatusId = 3;
        this.apiService.updateAsset(selectedAssets, null)
          .subscribe(response => {
            this.assets[rowIndex] = response.asset;
            this.alertService.SuccesMessage();
          }, (error: HttpErrorResponse) => {
          });
      });
  }

  pullAsset(asset: Asset, rowIndex: number) {
    this.alertService.confirmationWithTitle(
      this.tr.transform("sure")
      + this.tr.transform("pull_asset") +
      this.tr.transform("؟"), () => {
        this.apiService.pullAsset(asset.Id, asset.EmployeeId)
          .subscribe(response => {
            this.assets[rowIndex] = response.asset;

            this.alertService.SuccesMessage();
          }, (error: HttpErrorResponse) => {
          });
      });
  }

  showFollowItem(selectedAssets: Asset) {

    this.followasset.showModel(selectedAssets);
    // this.alertService.showErrorMessage('User not found');

  }


  private getAssigners() {
    this.apiService.getAssigners().subscribe(response => {
      this.assigners = response.assigners;
    }, error1 => {
      console.log(error1.error);
    });
  }


  private getAttachedName(IsAssigned: number): string {


    if (IsAssigned == 1) {
      return this.tr.transform("Yes");

    } else if (IsAssigned == 0) {
      return this.tr.transform("No");

    } else {
      return "";
    }


  }


  private getAssignedTo() {
    this.apiService.getAssignedTo().subscribe(response => {
      this.assignedTo = response.assignedTo;
    }, error1 => {
      console.log(error1.error);
    });

  }
}
