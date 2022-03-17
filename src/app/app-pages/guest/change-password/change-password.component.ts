import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../service/api-service';
import {AppRouter} from '../../../service/app-router';
import {DialogService} from '../../../service/dialog.service';
import {ActivatedRoute} from '@angular/router';
import {ToastsManager} from 'ng2-toastr';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {CommonDataService} from "../../../common-data.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  password = '';
  email = '';
  verificationCode = '';
  showPassword = false;
  tr: TranslatePipe;

  constructor(private apiService: ApiService, private appRouter: AppRouter,
              private dialogService: DialogService,
              private activatedRoute: ActivatedRoute, private toastManager: ToastsManager,
              private translateService: TranslateService,
              public _commondata: CommonDataService,


  ) {


    this.tr = new TranslatePipe(translateService);

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      this.email = data.get('email');
      this.verificationCode = data.get('code');
    });
  }


  changePassword(passwordForm: NgForm) {
    if (!passwordForm.valid) {
      return;
    }
    // call APi
    this.apiService.changeForgettenPassword( this.verificationCode, this.password)
      .subscribe(response => {
        this.toastManager.success( this.tr.transform('Password_changed_successfully'));
        this.appRouter.navigate('');
      }, (error: HttpErrorResponse) => {

      });
  }

}
