import {Component, OnInit} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {ApiService} from "../../../service/api-service";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "../../../service/dialog.service";
import {AuthGuard} from "../../../guard/auth.guard";
import {User} from "../../../model/login/login-response";
import {NgForm} from "@angular/forms";
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {ApiLinks} from "../../../service/api-links";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  selectedTab = 1;
  filePath = "";
  selectedLang = ApiLinks.LANG;
  userEditableData: { NameAr: string, NameEn: string, AddressAr: string, AddressEn: string, MobileNumber: string, submitForm: boolean };
  passwordData: { old_password: string, new_password: string, same_new_password, submitForm: boolean } = {
    old_password: '',
    new_password: '',
    same_new_password: '',
    submitForm: false
  };

  userImage = null;
  tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: ApiService,
              private toastService: ToastsManager
    , private dialogService: DialogService, private authService: AuthGuard
  ,private translate: TranslateService,
  ) {
    this.tr = new TranslatePipe(translate);

    this.selectedLang = ApiLinks.LANG;
    this.user = authService.getUser();
    const employee = this.user.employee;
    this.userEditableData = {
      NameAr: employee.NameAr, NameEn: employee.NameEn
      , AddressAr: employee.AddressAr, AddressEn: employee.AddressEn, MobileNumber: employee.MobileNumber, submitForm: false
    };
  }

  ngOnInit() {
    setTimeout(_ => this._commondata.showLoader(false), 200);
  }

  public setSelectedTab(tabNumber: number) {
    this.selectedTab = tabNumber;
  }

  public updateProfile(form: NgForm) {
    this.userEditableData.submitForm = true;
    if (!form.valid) {
      return;
    }
    // update user data
    this.apiService.updateProfile(this.userEditableData)
      .subscribe(response => {
        //TODO localize this.
        this.user.employee = response.employee;
        this.authService.saveUser(this.user);
        this.toastService.success(this.tr.transform("edit_complete"));
      }, error1 => {
        console.error(error1);
      });
  }


  clearPasswordForm() {
    this.passwordData = this.getDefaultPasswordData();
  }


  changeLang() {
    localStorage.setItem('lang',this.selectedLang);

    location.reload();



  }




  public changePassword(form: NgForm) {
    this.passwordData.submitForm = true;
    if (!form.valid) {
      return;
    }
    // check if 2 passwords same or not.
    if (this.passwordData.new_password != this.passwordData.same_new_password) {
      //TODO localize
      this.dialogService.showErrorMessage(this.tr.transform("Passwords_not_match"));
      return;
    }
    this.apiService.changePassword(this.passwordData)
      .subscribe(response => {
        //TODO localize
        this.toastService.success(this.tr.transform("Change_password_success"));
        this.passwordData = this.getDefaultPasswordData();
      }, error1 => {
        console.error(error1);
        this.dialogService.showErrorMessage(error1.error.user_message);
      });
  }

  private getDefaultPasswordData() {
    return {
      old_password: '',
      new_password: '',
      same_new_password: '',
      submitForm: false
    };
  }

  uploadPersonalPhoto() {
    if (this.userImage == null) {
      //TODO localize
      this.dialogService.showErrorMessage(this.tr.transform("Select_Photo"));
      return;
    }
    this.apiService.updateProfileImage(this.userImage).subscribe(response => {
      this.userImage = null;
      this.user.employee = response.employee;
      this.authService.saveUser(this.user);
      //TODO localize
      this.toastService.success(this.tr.transform("Update_profile_image"));
    }, error1 => {
      console.error(error1);
      this.dialogService.showErrorMessage(error1.error.user_message);
    });
  }

  selectPhoto($event) {

    this.filePath = $event.target.files[0].name;
    this.userImage = $event.target.files[0];
  }


  private getUserImage() {
    return this.authService.getUserFullImageUrlOrDefault();
  }
}
