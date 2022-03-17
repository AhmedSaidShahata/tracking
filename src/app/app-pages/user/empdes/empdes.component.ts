import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {DialogService} from "../../../service/dialog.service";
import {Location} from "../../../model/locations/locations-response";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {TableColumn} from "@swimlane/ngx-datatable";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {TranslateService} from "../../../service/translate.service";
import {TranslatePipe} from "../../../service/translate.pipe";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {Tower} from "../../../model/location-towers/location-towers-response";

@Component({
  selector: 'app-empdes',
  templateUrl: './empdes.component.html',
  styleUrls: ['./empdes.component.scss']
})
export class EmpdesComponent implements OnInit {
  loadingIndicator = true;


  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;


  columns: TableColumn[] = [];
  locations: Array<DepartmentsEntity> = [];
  allLocations: Array<DepartmentsEntity> = [];
  addUpdateLocation: { NameAr: string, NameEn: string, rowIndex: number, id: number, submit: boolean } =
    {NameAr: '', NameEn: '', rowIndex: 0, id: 0, submit: false};

  tr: TranslatePipe;

  search = "";

  constructor(private _commondata: CommonDataService, private apiService: ApiService,
              private dialogService: DialogService,
              private translate: TranslateService,
              private auth1: AuthGuard,
              private pdfServiceService: PdfServiceService,



  ) {
    this.tr = new TranslatePipe(translate);



    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);

  }

  printExcel() {

    this.pdfServiceService.printDepartment(this.locations);
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
    const input = this.search;
    if (input == null) {
      // reset filter
      this.locations = [...this.allLocations];
    } else {
      // start filtering.
      Observable.from(this.allLocations).pipe(filter((item: DepartmentsEntity) => {
        return item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1 ||
          item.NameAr.indexOf(input) > -1 || item.NameEn.indexOf(input) > -1;
      })).toArray().subscribe(towers => {
        this.locations = towers;
      });
    }
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
      this.apiService.deleteLocation(deletedLocation.Id).subscribe(response => {
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
      this.apiService.addDepartment(this.addUpdateLocation.NameAr, this.addUpdateLocation.NameEn)
        .subscribe(response => {
          // add location success.
          this.allLocations.push(response.department);
          this.locations = [...this.allLocations];
          this.addUpdateLocation = this.getDefaultLocation();
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update current location.

      this.apiService.updateDepartment(this.addUpdateLocation, this.addUpdateLocation.id).subscribe(response => {
        this.allLocations[this.addUpdateLocation.rowIndex] = response.department;
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
    this.apiService.getDepartments().subscribe(response => {
      this.locations = response.departments;
      this.allLocations = response.departments;

    }, error1 => {
      console.log(error1);
    });
  }

}
