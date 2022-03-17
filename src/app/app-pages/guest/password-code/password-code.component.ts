import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppRouter} from '../../../service/app-router';
import {DialogService} from '../../../service/dialog.service';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../../service/api-service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-password-code',
  templateUrl: './password-code.component.html',
  styleUrls: ['./password-code.component.scss']
})
export class PasswordCodeComponent implements OnInit {
  verificationCode = '';
  email = '';

  constructor(private appRouter: AppRouter, private dialogService: DialogService,
              private toastService: ToastsManager,
              private activatedRoute: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data => {
      console.log(data);
      this.email = data.get('email');
    });
  }

  verifyPasswordCode(codeForm: NgForm) {
    if (!codeForm.valid) {
      return;
    }
    // call Api.
    this.apiService.verifyPasswordCode(this.email, this.verificationCode)
      .subscribe(response => {
        this.appRouter.navigateWithParams('change_password', [this.email, this.verificationCode]);
      }, (error: HttpErrorResponse) => {
        console.log(error);
        if (error.error.error_code == -3) {
          // user not found.
          this.dialogService.showErrorMessage('Email address not exists in system');
        } else if (error.error.error_code == -5) {
          this.dialogService.showErrorMessage('Verification code not correct.');
        }
      });
  }
}
