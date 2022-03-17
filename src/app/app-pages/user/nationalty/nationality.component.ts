import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {TableColumn} from "@swimlane/ngx-datatable";
import {ApiService} from "../../../service/api-service";
import {Nationality} from "../../../model/nationalities/nationalities-response";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {TranslatePipe} from "../../../service/translate.pipe";
import {MaincatsService} from "../maincats/maincats-service";
import {DialogService} from "../../../service/dialog.service";
import {TranslateService} from "../../../service/translate.service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {Location} from "../../../model/locations/locations-response";
import {NgForm} from "@angular/forms";
import {NationalityService} from "./nationality-service";
import {AuthGuard} from "../../../guard/auth.guard";

@Component({
  selector: 'app-nationalty',
  templateUrl: './nationality.component.html',
  styleUrls: ['./nationality.component.scss']
})
export class NationalityComponent implements OnInit {
  loadingIndicator = true;


  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;


  columns: TableColumn[] = [];
  locations: Array<Nationality> = [];
  allLocations: Array<Nationality> = [];
  addUpdateLocation: { NameAr: string, NameEn: string, rowIndex: number, id: number, submit: boolean } =
    {NameAr: '', NameEn: '', rowIndex: 0, id: 0, submit: false};

  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: NationalityService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private auth1: AuthGuard


  ) {
    this.tr = new TranslatePipe(translate);



    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

  }

  ngOnInit(): void {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);


    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name: this.tr.transform("arabic_name") },
      {prop: "NameEn", name: this.tr.transform("english_name")},
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}
    ];



    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }

    this.loadDepartment();
  }


  filterLocations($event) {
    const inputData = $event.data;
    if (inputData == null) {
      // fill with default array.
      this.locations = this.allLocations;
      return;
    }
    Observable.from(this.allLocations).pipe(filter((item: Location) => {
      return item.NameAr.indexOf(inputData) > -1 || item.NameEn.indexOf(inputData)  > -1 ;
    })).toArray().subscribe(locations => {
      this.locations = locations;
    });
  }


  editLocation(rowIndex: number) {
    const editedLocation = this.locations[rowIndex];
    this.addUpdateLocation = {
      NameAr: editedLocation.NameAr, NameEn: editedLocation.NameEn
      , rowIndex: rowIndex, id: editedLocation.Id, submit: false
    };

    window.scrollTo(0, 0);
  }

  public deleteLocation(rowIndex: number) {
    const deletedLocation = this.locations[rowIndex];
    // show alert dialog.
    this.dialogService.deleteMessage(() => {
      this.apiService.deleteNationality(deletedLocation.Id).subscribe(response => {
        this.allLocations.splice(rowIndex, 1);
        this.locations = [...this.allLocations];
        this.dialogService.SuccesMessage();
      }, error1 => {
        console.log(error1);
      });
    });
  }


  private getDefaultLocation() {
    return {NameAr: '', NameEn: '', rowIndex: 0, id: 0, submit: false};
  }

  formSubmit(locationForm: NgForm) {
    this.addUpdateLocation.submit = true;
    if (!locationForm.valid) {
      return;
    }
    // check if user want to add or update form data.
    if (this.addUpdateLocation.id == 0) {
      // add new location.
      this.apiService.addNationality(this.addUpdateLocation.NameAr, this.addUpdateLocation.NameEn)
        .subscribe(response => {
          // add location success.
          this.allLocations.push(response.nationality);
          this.locations = [...this.allLocations];
          this.addUpdateLocation = this.getDefaultLocation();
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update current location.

      this.apiService.updateNationality(this.addUpdateLocation, this.addUpdateLocation.id).subscribe(response => {
        this.allLocations[this.addUpdateLocation.rowIndex] = response.nationality;
        this.locations = [...this.allLocations];
        this.addUpdateLocation = this.getDefaultLocation();
      }, error1 => {
        console.error(error1);
      });
    }
  }

  resetForm() {
    this.addUpdateLocation = this.getDefaultLocation();
  }
  private loadDepartment() {
    this.apiService.getNationalities().subscribe(response => {
      this.locations = response.nationalities;
      this.allLocations = response.nationalities;

    }, error1 => {
      console.log(error1);
    });
  }




}
