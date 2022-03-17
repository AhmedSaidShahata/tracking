import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {CommonDataService} from "../../../common-data.service";
import {ModalService} from "../../../shared/_services";
import {DialogService} from "../../../service/dialog.service";
import {ApiService} from "../../../service/api-service";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../../model/employee/EmployesResponse";
import {DepartmentsEntity} from "../../../model/emp_department/department";
import {Job} from "../../../model/jobs/jobs-response";
import {JobService} from "../job/job-service";
import {Location} from "../../../model/locations/locations-response";
import {NationalityService} from "../nationalty/nationality-service";
import {Nationality} from "../../../model/nationalities/nationalities-response";
import {EmpService} from "../systememps/emp-service";
import {ApiLinks} from "../../../service/api-links";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {Role} from "../../../model/login/login-response";
import {Assigner} from "../../../model/assigners/asigners-response";


@Component({
  selector: 'app-add-new-emp',
  templateUrl: './add-new-emp.component.html',
  styleUrls: ['./add-new-emp.component.scss']
})
export class AddNewEmpComponent implements OnInit {

  main_categories: DepartmentsEntity[];
  jobs: Job[];
  locations: Location[];
  nationalities: Nationality[];
  hireDate: NgbDateStruct;
  retireDate: NgbDateStruct;
  selectedUser: User = new User();
  allCategories: Array<MainCategory> = [];
  userCategories: Array<MainCategory> = [];
  roles: Role[] = [];
  @ViewChild('userCategoriesView')
  selectedCategoriesView: ElementRef;
  //Variables.
  editMode = false;
  callback = null;
  selectedDeps = "";

  selectedTab = "collapse1";


  english_address = "";
  emp_number = "";
  ip_address = "";
  device_name = "";
  password = "";


  email = "";
  username = "";
  selectednationalities = "";
  selectedlocation = "";
  selectedPriority = "";
  selectedJops = "";
  arabic_address = "";
  extension_number = "";
  mobileNumber = "";
  arabic_name = "";
  english_name = "";
  submitForm = false;
  userImage = null;
  userImageURL = "";
  userRoleselected  = "";
  selectedAssigner = null;
  assigners: Assigner[];

  constructor(calendar: NgbCalendar, private modalService: ModalService,
              private _commondata: CommonDataService,
              private alertService: DialogService,
              private apiService: ApiService,
              private empService: EmpService,
              private depService: ApiService,
              private jobService: JobService,
              private natService: NationalityService) {

    this.loadDepartment();
    this.loadMaiNCategories();
    this.loadRoles();
    this.getAssigners();

  }

  private getAssigners() {
    this.apiService.getAssigners().subscribe(response => {
      this.assigners = response.assigners;
    }, error1 => {
      console.log(error1.error);
    });
  }
  ngOnInit() {

  }


  EditMode(user: User, callback: (asset: User) => any) {

    this.ClearAll();

    this.callback = callback;
    this.modalService.open("exampleModal");
    this.editMode = true;
    this.selectedUser = user;

    this.selectedDeps = this.getEmptyIfNull(user.DepartmentId);
    this.english_address = this.getEmptyIfNull(user.AddressEn);
    this.arabic_address = this.getEmptyIfNull(user.AddressAr);
    this.emp_number = this.getEmptyIfNull(user.IdentifierNo);
    this.ip_address = this.getEmptyIfNull(user.IpAddress);
    this.device_name = this.getEmptyIfNull(user.PCName);
    this.email = this.getEmptyIfNull(user.Email);

    this.selectedAssigner =  user.ManagerId ;




    if (this.getEmptyIfNull(user.HiringDate) != "") {

      const valueFrom = user.HiringDate.split(" ")[0].split("-");
      this.hireDate = new class implements NgbDateStruct {
        day: number = Number(valueFrom[2]);
        month: number = Number(valueFrom[1]);
        year: number = Number(valueFrom[0]);
      };
    }
    if (this.getEmptyIfNull(user.RetirementDate) != "") {
      const valueTO = user.RetirementDate.split(" ")[0].split("-");
      this.retireDate = new class implements NgbDateStruct {
        day: number = Number(valueTO[2]);
        month: number = Number(valueTO[1]);
        year: number = Number(valueTO[0]);
      };

    }



    this.username = this.getEmptyIfNull(user.user.UserName);
    this.selectednationalities = this.getEmptyIfNull(user.NationalityId);
    this.selectedlocation = this.getEmptyIfNull(user.LocationId);
    this.selectedPriority = this.getEmptyIfNull(user.Priority);
    this.selectedJops = this.getEmptyIfNull(user.JobId);
     this.extension_number = this.getEmptyIfNull(user.extension_number);
    this.mobileNumber = this.getEmptyIfNull(user.MobileNumber);
    this.english_name = this.getEmptyIfNull(user.NameEn);
    this.arabic_name = this.getEmptyIfNull(user.NameAr);

    if (this.getEmptyIfNull(user.ImageUrl) != "") {
      this.userImageURL = ApiLinks.IMAGE_LINK + this.getEmptyIfNull(user.ImageUrl);
    }

    this.userRoleselected =  ""+ user.user.RoleId ;



    if (user.user.main_categories != null) {
      for (const asset of user.user.main_categories) {

        for (const selected of this.allCategories) {

          if (asset.MainCategoryId == selected.Id){
            this.userCategories.push(selected);
          }


        }

      }
    }





    // this.userCategories = user.user.main_categories;
  }


  ClearAll() {
    this.selectedDeps = "";
    this.userImageURL = "";
    this.english_address = "";
    this.emp_number = "";
    this.ip_address = "";
    this.device_name = "";
    this.selectedPriority = "";
    this.password = "";
    this.email = "";
    this.hireDate = null;
    this.retireDate = null;
    this.username = "";
    this.selectednationalities = "";
    this.selectedlocation = "";
    this.selectedJops = "";
    this.arabic_address = "";
    this.extension_number = "";
    this.mobileNumber = "";
    this.arabic_name = "";
    this.english_name = "";
    this.email = "";
    this.submitForm = false;
    this.userImage = null;
    this.editMode = false;
    this.userRoleselected = "";
    this.userCategories = [];
    this.selectedAssigner = null;


    this.selectedTab = "collapse1";
    document.getElementById(this.selectedTab).setAttribute("class", "acd-des collapse hide");
    document.getElementById(this.selectedTab).previousElementSibling.setAttribute("aria-expanded", "false");
    this.expandCollpse(this.selectedTab);

  }


  getEmptyIfNull(par: any) {
    if (par == null || par == undefined) {
      return "";
    }

    return "" + par;
  }

  showModel(callback: (asset: User) => any) {

    this.callback = callback;

    this.modalService.open("exampleModal");
    this.ClearAll();
  }


  closeModal() {
    this.modalService.close("exampleModal");

  }

  addNewAsset(addasset: NgForm) {
    this.submitForm = true;

    if (!addasset.valid) {
      return;
    }

    this.selectedUser.NameEn = this.english_name;
    this.selectedUser.NameAr = this.arabic_name;
    this.selectedUser.DepartmentId = Number(this.selectedDeps);
    this.selectedUser.AddressEn = this.english_address;
    this.selectedUser.AddressAr = this.arabic_address;
    this.selectedUser.IdentifierNo = this.emp_number;
    this.selectedUser.IpAddress = this.ip_address;
    this.selectedUser.PCName = this.device_name;
    this.selectedUser.Email = this.email;
    this.selectedUser.ManagerId = this.selectedAssigner ;
    this.selectedUser.Priority = this.selectedPriority ;


    this.selectedUser.RetirementDate = this.retireDate;
    this.selectedUser.MobileNumber = this.mobileNumber;
    this.selectedUser.extension_number = this.extension_number;
    // this.selectedUser.NationalityId = Number(this.selectednationalities);
    //this.selectedUser.NationalityId = 1;
    // this.selectedUser.JobId = Number(this.selectedJops);
  //  this.selectedUser.JobId = 1;
    this.selectedUser.PasswordHash = this.password;
    this.selectedUser.UserName = this.username;
    this.selectedUser.LocationId = Number(this.selectedlocation);
    if (this.hireDate != null) {

      this.selectedUser.HiringDate = this.hireDate.year + "-" + this.hireDate.month +
        "-" + this.hireDate.day;
    }
    if (this.retireDate != null) {
      this.selectedUser.RetirementDate = this.retireDate.year + "-" + this.retireDate.month +
        "-" + this.retireDate.day;
    }



    this.selectedUser.userRole = new Role();
    this.selectedUser.userRole.Id = Number(this.userRoleselected);//
    this.selectedUser.userCategories = this.userCategories;



    if (this.editMode) {
      this.empService.updateEmp(this.selectedUser, this.userImage)
        .subscribe(response => {
          this.modalService.close("exampleModal");
          this.alertService.SuccesMessage();
          this.callback(response.employee);
          this.ClearAll();

        }, (error: HttpErrorResponse) => {

        });
    } else {
      this.empService.addEmp(this.selectedUser, this.userImage)
        .subscribe(response => {
          this.modalService.close("exampleModal");
          this.callback(response.employee);
          this.ClearAll();

          this.alertService.SuccesMessage();
        }, (error: HttpErrorResponse) => {
          console.log(error.error);




        });
    }

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


    this.natService.getNationalities().subscribe(response => {
      this.nationalities = response.nationalities;


    }, error1 => {
      console.log(error1);
    });
  }

  fileSelect($event) {
    this.userImage = $event.target.files[0];

    const reader = new FileReader();

    reader.readAsDataURL(this.userImage); // read file as data url

    reader.onload = (event: any) => { // called once readAsDataURL is completed
      this.userImageURL = event.target.result;
    };
  }

  private loadMaiNCategories() {
    this.apiService.getMainCategories().subscribe(response => {
      this.allCategories = response.main_categories;
    }, error1 => {
      console.log(error1);
    });
  }

  isCategorySelected(category: MainCategory) {
    let isExists = false;
    for (const c of this.userCategories) {
      if (c.Id == category.Id ) {
        isExists = true;
        break;
      }
    }
    return isExists;
  }


  private loadRoles() {
    this.apiService.getRoles()
      .subscribe(response => {
        this.roles = response.roles;
      }, error1 => {
        console.log(error1);
      });
  }

  expandCollpse(sectionName) {
    this.selectedTab = sectionName;
    const CurrentCls = document.getElementById(sectionName).getAttribute("class");
    if (CurrentCls == "acd-des collapse" || CurrentCls == "acd-des collapse hide") {
      document.getElementById(sectionName).setAttribute("class", "acd-des collapse show");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "true");

      if (sectionName == 'collapse1') {
        sectionName = 'collapse2';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse3';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      }else  if (sectionName == 'collapse2') {
        sectionName = 'collapse1';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse3';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      }else  if (sectionName == 'collapse3') {
        sectionName = 'collapse1';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
        sectionName = 'collapse2';
        document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
        document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");

      }

    } else {
      document.getElementById(sectionName).setAttribute("class", "acd-des collapse hide");
      document.getElementById(sectionName).previousElementSibling.setAttribute("aria-expanded", "false");
    }
  }
}
