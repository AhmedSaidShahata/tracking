import {Component, OnInit, ViewChild} from '@angular/core';
import {AddnewAssetComponent} from "../addnew-asset/addnew-asset.component";
import {FollowAssetComponent} from "../follow-asset/follow-asset.component";
import {Location, MainCategory, Status} from "../../../model/asset-lookup/asset-lookup";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {Model} from "../../../model/category-models/category-models-response";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {Floor} from "../../../model/floors/floors-response";
import {Room} from "../../../model/rooms/rooms-response";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {TranslatePipe} from "../../../service/translate.pipe";
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {DialogService} from "../../../service/dialog.service";
import {TranslateService} from "../../../service/translate.service";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {User} from "../../../model/employee/EmployesResponse";
import {NgForm} from "@angular/forms";
import {EmpService} from "../systememps/emp-service";
import {AppRouter} from "../../../service/app-router";
import {AddAssainAssetRequest} from "../../../model/asset-lookup/AddAssainAssetRequest";
import {AssignedTo} from "../../../model/assigned-to/asignedto-response";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-assagin-asset',
  templateUrl: './assagin-asset.component.html',
  styleUrls: ['./assagin-asset.component.scss']
})
export class AssaginAssetComponent implements OnInit {

  loadingIndicator = true;
  dataAssagin : AddAssainAssetRequest;


  NoteText = "";
  selectedreturnDate = "";
  selectedEmp = null;
  selectedDep = "";

  returnDate: NgbDateStruct;

  deplist: DepartmentsEntity[];
  assets: Asset[];
  emplist: AssignedTo[];


  submitForm = false;

  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService,
              private apiService: ApiService,
              private empService: EmpService ,

              private alertService: DialogService,
              private translate: TranslateService,
              private router: AppRouter
  ) {
    this.tr = new TranslatePipe(translate);
    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);




    this.apiService.getDepartments().subscribe(response => {
      this.deplist = response.departments;


    }, error1 => {
      console.log(error1);
    });



    if (this._commondata != null && this._commondata.assets != null ) {
      this.assets = this._commondata.assets;

    }

    if (this.assets.length == 0){
      this.router.navigate('salesmen'); // navigate to app.

    }

  //  this.getAllEmps();

  }


  getAllEmps($event) {


    this.empService.getAssignedTo(1, 50000 ,  this.selectedDep

    ).subscribe(response => {
      this.emplist = response.assignedTo;

      this.selectedEmp = null;


    }, (error: HttpErrorResponse) => {

    });


  }

  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);

  }


  ClearAll() {
    this.submitForm = false;

    this.NoteText = "";
    this.selectedEmp = null;
    this.selectedDep = "";

  }


  deleteAsset(selectedAssets: Asset, rowIndex: number) {
    this.alertService.deleteMessage(() => {

      this.assets.splice(rowIndex, 1);

    });
  }



  AssginAssets(addasset: NgForm) {
    console.log(addasset);
    this.submitForm = true;

    if (addasset.form.invalid) {
      return;
    }

    this.dataAssagin = new AddAssainAssetRequest();
    this.dataAssagin.EmployeeId = Number(this.selectedEmp);
    this.dataAssagin.AssetIds = this.assets;
    this.dataAssagin.Notes =  this.NoteText;

    if (this.returnDate != null) {

      this.dataAssagin.ReturnData = this.returnDate.year + "-" + this.returnDate.month +
        "-" + this.returnDate.day;
    }


    this.apiService.AssainAsset(this.dataAssagin).subscribe(response => {


         this.router.navigate('salesmen'); // navigate to app.
        this.alertService.SuccesMessage();




    }, (error: HttpErrorResponse) => {

    });

  }


}
