import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {Location} from "../../../model/locations/locations-response";
import {TableColumn} from "@swimlane/ngx-datatable";
import {ApiService} from "../../../service/api-service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "../../../service/dialog.service";
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  loadingIndicator = true;
  //GUI Reference;
  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;
  //Variables.
  columns: TableColumn[] = [];
  locations: Array<Location> = [];
  allLocations: Array<Location> = [];
  addUpdateLocation: { NameAr: string, NameEn: string, CityName: string, rowIndex: number, id: number, submit: boolean } =
    {NameAr: '', NameEn: '', CityName: '', rowIndex: 0, id: 0, submit: false};
  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: ApiService,
              private toastService: ToastsManager
    , private dialogService: DialogService,
              private translate: TranslateService ,
              private auth1: AuthGuard,
              private pdfServiceService: PdfServiceService,
  ) {
    this.tr = new TranslatePipe(translate);

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);
  }



  printExcel() {

    this.pdfServiceService.printLocation(this.allLocations);
  }


  ngOnInit(): void {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    // data table columns.
    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name:this.tr.transform("arabic_name")},
      {prop: "NameEn", name: this.tr.transform("english_name")},
      {prop: "CityName", name: this.tr.transform("city")},
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}
    ];



    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }

    this.loadLocations();
  }

  private loadLocations() {
    this.apiService.getLocations().subscribe(response => {
      this.locations = response.locations;
      this.allLocations = this.locations;
    }, error1 => {
      console.log(error1);
    });
  }


  filterLocations($event) {
    const inputData = $event.data;
    if (inputData == null) {
      // fill with default array.
      this.locations = this.allLocations;
      return;
    }
    Observable.from(this.allLocations).pipe(filter((item: Location) => {
      return item.NameAr.indexOf(inputData) > -1 ||
        item.NameEn.indexOf(inputData)  > -1||
        item.CityName.indexOf(inputData)  > -1;
    })).toArray().subscribe(locations => {
      this.locations = locations;
    });
  }

  formSubmit(locationForm: NgForm) {
    this.addUpdateLocation.submit = true;
    if (!locationForm.valid) {
      return;
    }
    // check if user want to add or update form data.
    if (this.addUpdateLocation.id == 0) {
      // add new location.
      this.apiService.addLocation(this.addUpdateLocation.NameAr, this.addUpdateLocation.NameEn, this.addUpdateLocation.CityName)
        .subscribe(response => {
          // add location success.
          this.allLocations.push(response.location);
          this.locations = [...this.allLocations];
          this.addUpdateLocation = this.getDefaultLocation();
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update current location.

      this.apiService.updateLocation(this.addUpdateLocation, this.addUpdateLocation.id).subscribe(response => {
        this.allLocations[this.addUpdateLocation.rowIndex] = response.location;
        this.locations = [...this.allLocations];
        this.addUpdateLocation = this.getDefaultLocation();
      }, error1 => {
        console.error(error1);
      });
    }
  }

  editLocation(rowIndex: number) {
    const editedLocation = this.locations[rowIndex];
    this.addUpdateLocation = {
      NameAr: editedLocation.NameAr, NameEn: editedLocation.NameEn,
      CityName: editedLocation.CityName, rowIndex: rowIndex, id: editedLocation.Id, submit: false
    };
    window.scrollTo(0, 0);
  }

  public deleteLocation(rowIndex: number) {
    const deletedLocation = this.locations[rowIndex];
    // show alert dialog.
    this.dialogService.deleteMessage(() => {
      this.apiService.deleteLocation(deletedLocation.Id).subscribe(response => {
        this.allLocations.splice(rowIndex, 1);
        this.locations = [...this.allLocations];
        this.dialogService.SuccesMessage();
      }, error1 => {
        console.log(error1);
      });
    });
  }

  resetForm() {
    this.addUpdateLocation = this.getDefaultLocation();
  }

  private getDefaultLocation() {
    return {NameAr: '', NameEn: '', CityName: '', rowIndex: 0, id: 0, submit: false};
  }
}
