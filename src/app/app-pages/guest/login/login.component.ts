import {Component, OnInit} from '@angular/core';
import {AppModule} from '../../../app.module';
import {CommonDataService} from '../../../common-data.service';
import {UserLoginRequest} from '../../../model/login/login-request';
import {ApiService} from '../../../service/api-service';
import {AppRouter} from '../../../service/app-router';
import {DialogService} from '../../../service/dialog.service';
import {NgForm} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Logger} from '@orkisz/angular2-logger';
import {AuthGuard} from '../../../guard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // userLoginRequest: UserLoginRequest = {Email: 'Administrator@gmail.com', PasswordHash: 'ahmed1'};

 userLoginRequest: UserLoginRequest = {Email: '', PasswordHash: ''};

  rememberMe = true;


  constructor(public _commondata: CommonDataService, private apiService: ApiService,
              private router: AppRouter, private alertService: DialogService, private logger: Logger, private authService: AuthGuard) {

  }

  ngOnInit() {

    setTimeout(_ => this._commondata.showLoader(false), 200);
  }

  loginClick(loginForm: NgForm) {
    // check if form is valid.
    if (loginForm.invalid) {
      return;
    }
    //call apiز
    this.apiService.login(this.userLoginRequest)
      .subscribe(response => {
          this.logger.debug(response);
          if (this.rememberMe) {
            this.authService.saveUser(response.user);
          } else {
            this.authService.setUser(response.user);
          }

          this.router.navigate(''); // navigate to app.

        }, (error: HttpErrorResponse) => {
          this.logger.error(error.error);
          this.alertService.showErrorMessage(error.error.user_message);
        }
      )
    ;
  }
}
