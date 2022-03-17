import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {AddnewAssetComponent} from "../addnew-asset/addnew-asset.component";
import {AddNewEmpComponent} from "../add-new-emp/add-new-emp.component";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {HttpErrorResponse} from "@angular/common/http";
import {DialogService} from "../../../service/dialog.service";
import {ApiService} from "../../../service/api-service";
import {EmpService} from "./emp-service";
import {User} from "../../../model/employee/EmployesResponse";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {Job, JobsResponse} from "../../../model/jobs/jobs-response";
import {JobService} from "../job/job-service";
import {UpdateUserPasswordComponent} from "../update-user-password/update-user-password.component";
import {ToastsManager} from "ng2-toastr";
import {TranslateService} from "../../../service/translate.service";
import {AppRouter} from "../../../service/app-router";
import * as XLSX from "xlsx";
import {Assigner} from "../../../model/assigners/asigners-response";
import {Nationality} from "../../../model/nationalities/nationalities-response";
import {Location} from "../../../model/locations/locations-response";
import {NationalityService} from "../nationalty/nationality-service";
import {Role} from "../../../model/login/login-response";

@Component({
  selector: 'app-systememps',
  templateUrl: './systememps.component.html',
  styleUrls: ['./systememps.component.scss']
})
export class SystemempsComponent implements OnInit {


  @ViewChild("addemp")
  addcomponent: AddNewEmpComponent;

  @ViewChild("passwordComponent")
  passwordComponent: UpdateUserPasswordComponent;


  loadingIndicator = true;


  emplist: User[];
  main_categories: DepartmentsEntity[];
  allCategories: Array<MainCategory> = [];
  userCategories: Array<MainCategory> = [];
  nationalities: Nationality[];
   jobs: Job[];
  locations: Location[];
  roles: Role[] = [];

  selectedDeps = "";
   empname = "";
  ip_address = "";
  device_name = "";


  email = "";
   selectednationalities = "";
  selectedlocation = "";
  selectedJops = "";
  emp_number = "";
  arabic_address = "";
  extension_number = "";
  mobileNumber = "";
  userRoleselected  = "";
  selectedPriority  = "";
  selectedAssigner = "";
  assigners: Assigner[];







  offset = 0;
  limit = 10;
  count = 0;





  constructor(private _commondata: CommonDataService,
              private alertService: DialogService,
              private apiService: EmpService,
              private apiService2: EmpService,
              private depService: ApiService,
              private router: AppRouter,
              private tr: TranslateService,
              private jobService: JobService,
              private natService: NationalityService,
              private toastService: ToastsManager) {

    setTimeout(() => {
      this.loadingIndicator = false;
    }, 1500);


  }

  ngOnInit(): void {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);

    this.loadDepartment();



    this.loadMaiNCategories();
    this.loadRoles();
    this.getAssigners();

  }


  private getAssigners() {
    this.depService.getAssigners().subscribe(response => {
      this.assigners = response.assigners;
    }, error1 => {
      console.log(error1.error);
    });
  }

  private loadMaiNCategories() {
    this.depService.getMainCategories().subscribe(response => {
      this.allCategories = response.main_categories;
    }, error1 => {
      console.log(error1);
    });
  }

  private loadRoles() {
    this.depService.getRoles()
      .subscribe(response => {
        this.roles = response.roles;
      }, error1 => {
        console.log(error1);
      });
  }

  SearchAssetPage(event) {
    this.offset = event;
    this.apiService.getEmps(this.offset, this.limit, this.selectedDeps,
      this.selectedJops, this.empname,this.mobileNumber,this.selectedlocation,this.extension_number,this.emp_number,this.ip_address
      ,this.userRoleselected,this.selectedAssigner,this.email,this.selectedPriority
    ).subscribe(response => {
      this.emplist = response.data.employees;
      this.count = response.data.count;


    }, (error: HttpErrorResponse) => {

    });

  }


  SearchAsset() {
    this.offset = 0;
    this.apiService.getEmps(this.offset, this.limit, this.selectedDeps,
      this.selectedJops, this.empname,this.mobileNumber,this.selectedlocation,this.extension_number,this.emp_number,this.ip_address
      ,this.userRoleselected,this.selectedAssigner,this.email , this.selectedPriority
    ).subscribe(response => {
      this.emplist = response.data.employees;
      this.count = response.data.count;


    }, (error: HttpErrorResponse) => {

    });

  }


  openExcel() {
    this.router.navigate('excel_employee');


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

        const excellAsset: User[] = Array<User>();


        XL_row_object.forEach((element, index) => {

          if (index != 0) {
            console.log(element);
            const object: User = new User();
            object.NameAr = element["*"];
            object.NameEn = element["*_1"];
            object.MobileNumber = element["*_2"];
            object.user = new User();
            object.user.Email = element["*_3"];
            excellAsset.push(object);
          }


        });

        selfme.searchExcelAsset(excellAsset);

      });

    };


    reader.readAsArrayBuffer(image); // read file as data url


  }

  searchExcelAsset(excellAsset: User[]) {

    this.apiService.searchEmpsExsel(excellAsset).subscribe(response => {

      if (response != null && response.Employees != null && response.Employees.length > 0){
        this._commondata.setEmployeeArray(response.Employees);
        this.router.navigate('excel_employee');
      }


    });


  }


  showAddNewItem() {

    this.addcomponent.showModel(asset => {
      this.SearchAssetPage(this.offset);

    });
    // this.alertService.showErrorMessage('User not found');

  }

  ClearAll() {

    this.empname = "";
    this.selectedDeps = "";
    this.selectedJops = "";


  this.mobileNumber = "";
  this.selectedlocation = "";
  this.extension_number = "";
  this.emp_number = "";
  this.ip_address = "" ;
  this.userRoleselected = "";
  this.selectedAssigner = "";
  this.email = "";

  }


  editAsset(selectedAssets: User, i: number) {
    this.addcomponent.EditMode(selectedAssets, asset => {
      this.SearchAssetPage(this.offset);


    });


  }

  deleteAsset(selectedAssets: Asset, rowIndex: number) {
    this.alertService.deleteMessage(() => {
      this.apiService.deleteEmp(selectedAssets.Id)
        .subscribe(response => {
          this.emplist.splice(rowIndex, 1);

          this.alertService.SuccesMessage();
        }, (error: HttpErrorResponse) => {
        });
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


    this.depService.getLocations().subscribe(response => {
      this.locations = response.locations;

    }, error1 => {
      console.log(error1);
    });


    this.natService.getNationalities().subscribe(response => {
      this.nationalities = response.nationalities;


    }, error1 => {
      console.log(error1);
    });

    this.SearchAsset();

  }
  updateUserPassword(item: User) {
    this.passwordComponent.setUser(item);
    this.passwordComponent.showModel();
  }

  sendAssetReminderEmail(Id: number) {
    this.apiService.sendAssetReminder(Id)
      .subscribe(response => {
        if (response.status == 1) {
          this.toastService.success("تم الارسال بنجاح");
        } else {
          this.toastService.error(response.user_message);
        }
      }, error1 => {
        console.log(error1.error);
      });

  }
}
