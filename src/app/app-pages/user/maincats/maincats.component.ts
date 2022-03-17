import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {DialogService} from "../../../service/dialog.service";
import {TableColumn} from "@swimlane/ngx-datatable";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {Location} from "../../../model/locations/locations-response";
import {NgForm} from "@angular/forms";
import {MaincatsService} from "./maincats-service";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";

@Component({
  selector: 'app-maincats',
  templateUrl: './maincats.component.html',
  styleUrls: ['./maincats.component.scss']
})
export class MaincatsComponent implements OnInit {
  loadingIndicator = true;


  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;


  columns: TableColumn[] = [];
  locations: Array<MainCategory> = [];
  allLocations: Array<MainCategory> = [];
  addUpdateLocation: { NameAr: string, NameEn: string, DescriptionAr: string,
    DescriptionEn: string, rowIndex: number, id: number, submit: boolean } =
    {NameAr: '', NameEn: '',DescriptionAr: '',DescriptionEn: '', rowIndex: 0, id: 0, submit: false};

  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: MaincatsService,
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



  printExcel() {

    this.pdfServiceService.printMainCat(this.locations);
  }





  filterLocations($event) {
    const inputData = $event.data;
    if (inputData == null) {
      // fill with default array.
      this.locations = this.allLocations;
      return;
    }
    Observable.from(this.allLocations).pipe(filter((item: MainCategory) => {
      return item.NameAr.indexOf(inputData) > -1 || item.NameEn.indexOf(inputData) > -1 ;
    })).toArray().subscribe(locations => {
      this.locations = locations;
    });
  }


  editLocation(rowIndex: number) {
    const editedLocation = this.locations[rowIndex];
    this.addUpdateLocation = {
      NameAr: editedLocation.NameAr, NameEn: editedLocation.NameEn,
      DescriptionAr: editedLocation.DescriptionAr, DescriptionEn: editedLocation.DescriptionEn
      , rowIndex: rowIndex, id: editedLocation.Id, submit: false
    };

    window.scrollTo(0, 0);
  }

  public deleteLocation(rowIndex: number) {
    const deletedLocation = this.locations[rowIndex];
    // show alert dialog.
    this.dialogService.deleteMessage(() => {
      this.apiService.deleteCat(deletedLocation.Id).subscribe(response => {
        this.allLocations.splice(rowIndex, 1);
        this.locations = [...this.allLocations];
        this.dialogService.SuccesMessage();
      }, error1 => {
        console.log(error1);
      });
    });
  }


  private getDefaultLocation() {
    return   {NameAr: '', NameEn: '',DescriptionAr: '',DescriptionEn: '', rowIndex: 0, id: 0, submit: false};
  }

  formSubmit(locationForm: NgForm) {
    this.addUpdateLocation.submit = true;
    if (!locationForm.valid) {
      return;
    }
    // check if user want to add or update form data.
    if (this.addUpdateLocation.id == 0) {
      // add new location.
      this.apiService.addMainCat(this.addUpdateLocation.NameAr, this.addUpdateLocation.NameEn,
        this.addUpdateLocation.DescriptionEn ,  this.addUpdateLocation.DescriptionAr )
        .subscribe(response => {
          // add location success.
          this.allLocations.push(response.main_category);
          this.locations = [...this.allLocations];
          this.addUpdateLocation = this.getDefaultLocation();
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update current location.

      this.apiService.updateMainCategory(this.addUpdateLocation, this.addUpdateLocation.id).subscribe(response => {
        this.allLocations[this.addUpdateLocation.rowIndex] = response.main_category;
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
    this.apiService.getMainCategory().subscribe(response => {
      this.locations = response.main_categories;
      this.allLocations = response.main_categories;

    }, error1 => {
      console.log(error1);
    });
  }








}
