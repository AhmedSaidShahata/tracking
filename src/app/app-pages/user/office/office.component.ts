import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {TableColumn} from "@swimlane/ngx-datatable";
import {Room} from "../../../model/rooms/rooms-response";
import {ApiService} from "../../../service/api-service";
import {Floor} from "../../../model/floors/floors-response";
import {Location} from "../../../model/locations/locations-response";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {TranslatePipe} from "../../../service/translate.pipe";
import {RoofService} from "../roofs/roofs-service";
import {MaincatsService} from "../maincats/maincats-service";
import {TranslateService} from "../../../service/translate.service";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "../../../service/dialog.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {OfficeService} from "./office-service";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {ApiLinks} from "../../../service/api-links";

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {

  //GUI Reference;
  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;

  //Variables.
  columns: TableColumn[] = [];
  towers: Array<Room> = [];
  allTowers: Array<Room> = [];



  addUpdateTower: {
    NameAr: string,
    NameEn: string,
    rowIndex: number,
    id: number,
    submitForm: boolean;
  };


  selectedSubcat = "";
  selectedTower = "";
  selectedMaincat = "";


  locations: Array<Location>;
  subcat: Array<Tower>;
  Floorlist: Array<Floor>;



   tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: OfficeService,
              private apiService1 : ApiService,     private apiService2 : MaincatsService,
              private translateService: TranslateService, private toastService: ToastsManager
    , private dialogService: DialogService,
              private auth1: AuthGuard,
              private pdfServiceService: PdfServiceService,

  private translate: TranslateService) {
     apiService1.getLocations().subscribe(response => {
      this.locations = response.locations;
    });




    this.addUpdateTower = this.getDefaultTower();


    this.tr = new TranslatePipe(translate);

  }



  printExcel() {

    this.pdfServiceService.printRoom(this.allTowers);
  }



  getAllSubCat(deviceValue) {
    if (this.selectedMaincat == ""){
      this.subcat =[];
      return;
    }
    this.apiService1.getLocationTowers(this.selectedMaincat)
      .subscribe(response => {
        this.subcat = response.towers;
      }, (error: HttpErrorResponse) => {

      });
  }





  getBuilder(deviceValue) {
    if (this.selectedSubcat == ""){
      this.subcat =[];
      return;
    }
    this.apiService1.getTowerFloors(this.selectedSubcat)
      .subscribe(response => {
        this.Floorlist = response.floors;
      }, (error: HttpErrorResponse) => {

      });
  }


  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    // data table columns.
    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name: this.tr.transform("arabic_name") },
      {prop: "NameEn",  name: this.tr.transform("english_name")},



      {prop: "category.NameEn", name: this.tr.transform("floor")},
      {prop: "category.NameEn", name: this.tr.transform("building")},
      {prop: "category.NameEn", name: this.tr.transform("location")},
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}
    ];



    if(ApiLinks.LANG == "ar"){
      this.columns[3]=  {prop: "floor.NameAr", name: this.tr.transform("floor") };

      this.columns[4]=  {prop: "floor.tower.NameAr", name: this.tr.transform("building") };
      this.columns[5]=  {prop: "floor.tower.location.NameAr", name: this.tr.transform("location") };

    }else{
      this.columns[3]=  {prop: "floor.NameEn", name: this.tr.transform("floor") };

      this.columns[4]=  {prop: "floor.tower.NameEn", name: this.tr.transform("building") };
      this.columns[5]=  {prop: "floor.tower.location.NameEn", name: this.tr.transform("location") };


    }











    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }

    this.loadBuildings();
  }

  private loadBuildings() {
    this.apiService.getNationalities().subscribe(response => {
      this.towers = response.rooms;
      this.allTowers = response.rooms;
    }, error1 => {
      console.log(error1);
    });
  }

  filterBuildings($event) {
    const input = $event.data;
    if (input == null) {
      // reset filter
      this.towers = [...this.allTowers];
    } else {
      // start filtering.
      Observable.from(this.allTowers).pipe(filter((item: Room) => {
        return item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1 ||
          item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1 ;
      })).toArray().subscribe(towers => {
        this.towers = towers;
      });
    }
  }

  clearForm() {
    this.addUpdateTower = this.getDefaultTower();
  }

  private getDefaultTower() {
    this.selectedSubcat = "";
    this.selectedMaincat = "";
    this.selectedTower = "";

    return {id: 0, rowIndex: -1, LocationId: "", NameAr: '', NameEn: '', submitForm: false};
  }

  public formSubmit(form: NgForm) {
    this.addUpdateTower.submitForm = true;
    if (!form.valid) {
      return;
    }
    if (this.addUpdateTower.id == 0) {
      // add new tower.
      this.apiService.addNationality({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        FloorId: Number(this.selectedTower)
      })
        .subscribe(response => {
          // add success.
          this.addUpdateTower = this.getDefaultTower();
          this.allTowers.push(response.rooms);
          this.towers = [...this.allTowers];
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update tower.
      this.apiService.updateNationality({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        FloorId:  Number(this.selectedTower)
      }, this.addUpdateTower.id).subscribe(response => {
        this.allTowers[this.addUpdateTower.rowIndex] = response.rooms;
        this.towers = [...this.allTowers];
        this.dialogService.SuccesMessage();
        this.addUpdateTower = this.getDefaultTower();
      }, error1 => {
        console.error(error1);
      });
    }

  }

  editTower(rowIndex) {
    const tower = this.towers[rowIndex];
    this.addUpdateTower.rowIndex = rowIndex;
    this.addUpdateTower.id = tower.Id;
    this.selectedSubcat = ""+tower.floor.TowerId;
    this.selectedTower = ""+tower.FloorId;
    this.addUpdateTower.NameEn = tower.NameEn;
    this.addUpdateTower.NameAr = tower.NameAr;
    this.selectedMaincat = ""+ tower.floor.tower.LocationId;
    this.getAllSubCat(null);
    this.getBuilder(null);
    window.scrollTo(0, 0);
  }


  deleteTower(rowIndex) {
    this.dialogService.deleteMessage(() => {
      const tower = this.towers[rowIndex];
      this.apiService.deleteNationality(tower.Id)
        .subscribe(response => {
          this.allTowers.splice(rowIndex, 1);
          this.towers = [...this.allTowers];
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    });
  }

}

