import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from "../locations/locations-response";
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {Job} from "../jobs/jobs-response";
import {User} from "../employee/EmployesResponse";
import {DepartmentsEntity} from "../emp_department/department";
import {Assigner} from "../assigners/asigners-response";
import {MainCategory} from "../asset-lookup/asset-lookup";
import {Role} from "../login/login-response";
import {JobService} from "../../app-pages/user/job/job-service";
import {ModalService} from "../../shared/_services";
import {DialogService} from "../../service/dialog.service";
import {EmpService} from "../../app-pages/user/systememps/emp-service";
import {CommonDataService} from "../../common-data.service";
import {ApiService} from "../../service/api-service";
import {NationalityService} from "../../app-pages/user/nationalty/nationality-service";
import {AppRouter} from "../../service/app-router";
import {TranslateService} from "../../service/translate.service";
import {Asset} from "../search-assets/search-assets-response";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {TranslatePipe} from "../../service/translate.pipe";
import {ToastsManager} from "ng2-toastr";

@Component({
  selector: 'app-excel-employee',
  templateUrl: './excel-employee.component.html',
  styleUrls: ['./excel-employee.component.scss']
})
export class ExcelEmployeeComponent implements OnInit {
  main_categories: DepartmentsEntity[];
  jobs: Job[];
  locations: Location[];
   selectedUser: User = new User();
  allCategories: Array<MainCategory> = [];
   roles: Role[] = [];
  @ViewChild('userCategoriesView')
  selectedCategoriesView: ElementRef;
  //Variables.
  editMode = false;
  callback = null;
  selectedDeps = "";



   selectedlocation = "";
  selectedJops = "";
      submitForm = false;
   selectedAssigner = null;
  assigners: Assigner[];
   emplist: User[];
  assetSelected: User = new User();
  tr: TranslatePipe;


  inSystemCount = 0;
  outSystemCount = 0;

  ngOnInit() {

    this.emplist = this._commondata.emplist;

    this.emplist .forEach((element, index) => {

      if(element.foundinsystem){
        this.inSystemCount ++;
      }else {
        this.outSystemCount ++;

      }


    });



  }
  constructor(calendar: NgbCalendar, private modalService: ModalService,
              private _commondata: CommonDataService,
              private alertService: DialogService,
              private apiService: ApiService,
              private empService: EmpService,
              private depService: ApiService,
              private jobService: JobService,
              private router: AppRouter,
              private toast: ToastsManager,
              private translate: TranslateService,
              private natService: NationalityService) {


    this.tr = new TranslatePipe(translate);

    this.loadDepartment();
    this.getAssigners();



  }

  private getAssigners() {
    this.apiService.getAssigners().subscribe(response => {
      this.assigners = response.assigners;
    }, error1 => {
      console.log(error1.error);
    });
  }

  private loadDepartment() {
    this.depService.getDepartments().subscribe(response => {
      this.main_categories = response.departments;


    }, error1 => {
      console.log(error1);
    });


    this.jobService.getJobs().subscribe(response => {
      this.jobs = response.jobs;


    }, error1 => {
      console.log(error1);
    });


    this.apiService.getLocations().subscribe(response => {
      this.locations = response.locations;

    }, error1 => {
      console.log(error1);
    });



  }

  private loadMaiNCategories() {
    this.apiService.getMainCategories().subscribe(response => {
      this.allCategories = response.main_categories;
    }, error1 => {
      console.log(error1);
    });
  }
  deleteAsset(selectedAssets: Asset, rowIndex: number) {
    this.emplist.splice(rowIndex, 1);

  }

  ClearAll() {
    this.selectedlocation = "";
    this.selectedDeps = "";
    this.selectedAssigner = "";
    this.inSystemCount = 0;
    this.outSystemCount = 0;
    this.emplist .forEach((element, index) => {

      if(element.foundinsystem){
        this.inSystemCount ++;
      }else {
        this.outSystemCount ++;

      }


    });

  }




  selectInAsset() {




    this.emplist .forEach((element, index) => {

      if(element.foundinsystem){
        element.selectedAttach = true;
      }else {
        element.selectedAttach = false;

      }


    });

  }



  selectOutAsset() {
    this.emplist .forEach((element, index) => {

      if(!element.foundinsystem){
        element.selectedAttach = true;
      }else {
        element.selectedAttach = false;

      }



    });

  }


  AssginAssets(addasset: NgForm) {
    console.log(addasset);
    this.submitForm = true;

    if (addasset.form.invalid) {
      return;
    }




    const excellAsset: User[] = Array<User>();
    const deleteIndexs: number[] = Array<number>();

    this.emplist .forEach((element, index) => {

      if(element.selectedAttach){
        excellAsset.push(element);

        element.LocationId = Number(this.selectedlocation);
        element.DepartmentId = Number(this.selectedDeps);
        element.ManagerId = Number(this.selectedAssigner);
        deleteIndexs.push(index);
      }


    });



    if (excellAsset.length == 0) {

      this.toast.error(this.tr.transform("Choose_one"));
      return;
    }

    this.assetSelected.Employees = excellAsset;

    this.empService.addMulti(this.assetSelected)
      .subscribe(response => {

        this.alertService.SuccesMessage();


        deleteIndexs .forEach((element, index) => {


          this.emplist.splice(element, 1);


        });
        this.emplist .forEach((element, index) => {

          element.selectedAttach = false;




        });



        this.ClearAll();



      }, (error: HttpErrorResponse) => {

      });




  }

  }
