import {Component, OnInit} from '@angular/core';
import {AppRouter} from '../../../service/app-router';
import {DialogService} from '../../../service/dialog.service';
import {NgForm} from '@angular/forms';
import {ApiService} from '../../../service/api-service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastsManager} from 'ng2-toastr';
import {TranslatePipe} from "../../../service/translate.pipe";
import {TranslateService} from "../../../service/translate.service";
import {CommonDataService} from "../../../common-data.service";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email = '';
  tr: TranslatePipe;

  constructor(private router: AppRouter, private alert: DialogService, private apiService: ApiService,
              private toastService: ToastsManager,
              private translateService: TranslateService,
              public _commondata: CommonDataService,


  ) {
    this.tr = new TranslatePipe(translateService);


  }

  ngOnInit() {
  }

  forgetPasswordClick(passwordForm: NgForm) {
    if (!passwordForm.valid) {
      return;
    }
    // call Api.

    this.apiService.forgetPassword(this.email).subscribe(response => {
      // call next page.


      this.toastService.info(  this.tr.transform("send_email_successful")  );

  //    this.router.navigate('change_password'); // navigate to app.


    }, (error: HttpErrorResponse) => {


    });
  }
}
