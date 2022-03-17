import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {TableColumn} from "@swimlane/ngx-datatable";
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {Location} from "../../../model/locations/locations-response";

import {TranslateService} from "../../../service/translate.service";
import {NgForm} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {DialogService} from "../../../service/dialog.service";
import {TranslatePipe} from "../../../service/translate.pipe";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {ApiLinks} from "../../../service/api-links";

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit {

  //GUI Reference;
  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;

  //Variables.
  columns: TableColumn[] = [];
  towers: Array<Tower> = [];
  allTowers: Array<Tower> = [];
  addUpdateTower: {
    NameAr: string,
    NameEn: string,
    rowIndex: number,
    id: number,
    submitForm: boolean;
  };


  selectedSubcat = "";


  locations: Array<Location>;
   tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: ApiService,
              private translateService: TranslateService, private toastService: ToastsManager
    , private dialogService: DialogService,
              private auth1: AuthGuard,
              private pdfServiceService: PdfServiceService,

              private translate: TranslateService) {
     this.apiService.getLocations().subscribe(response => {
      this.locations = response.locations;
    });
    this.addUpdateTower = this.getDefaultTower();


    this.tr = new TranslatePipe(translate);

  }

  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    // data table columns.
    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name: this.tr.transform("arabic_name")},
      {prop: "NameEn", name: this.tr.transform("english_name")},
      {prop: "location.NameAr", name: this.tr.transform("location")},
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}


    ];


    if (ApiLinks.LANG == "ar") {
      this.columns[3] = {prop: "location.NameAr", name: this.tr.transform("location")};
    } else {
      this.columns[3] = {prop: "location.NameEn", name: this.tr.transform("location")};

    }


    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }


    this.loadBuildings();
  }

  private loadBuildings() {
    this.apiService.getTowers().subscribe(response => {
      this.towers = response.towers;
      this.allTowers = response.towers;
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
      Observable.from(this.allTowers).pipe(filter((item: Tower) => {
        return item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1 ||
          item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1;
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

    return {id: 0, rowIndex: -1, LocationId: "", NameAr: '', NameEn: '', submitForm: false};
  }

  public formSubmit(form: NgForm) {
    this.addUpdateTower.submitForm = true;
    if (!form.valid) {
      return;
    }
    if (this.addUpdateTower.id == 0) {
      // add new tower.
      this.apiService.addTower({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        LocationId: Number(this.selectedSubcat)
      })
        .subscribe(response => {
          // add success.
          this.addUpdateTower = this.getDefaultTower();
          this.allTowers.push(response.tower);
          this.towers = [...this.allTowers];
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update tower.
      this.apiService.updateTower({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        LocationId: Number(this.selectedSubcat)
      }, this.addUpdateTower.id).subscribe(response => {
        this.allTowers[this.addUpdateTower.rowIndex] = response.tower;
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
    this.selectedSubcat = "" + tower.LocationId;
    this.addUpdateTower.NameEn = tower.NameEn;
    this.addUpdateTower.NameAr = tower.NameAr;
    window.scrollTo(0, 0);
  }




  printExcel() {

    this.pdfServiceService.printBuild(this.allTowers);
  }


  deleteTower(rowIndex) {
    this.dialogService.deleteMessage(() => {
      const tower = this.towers[rowIndex];
      this.apiService.deleteTower(tower.Id)
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
