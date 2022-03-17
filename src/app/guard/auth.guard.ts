import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Router} from '@angular/router';
import {User} from '../model/login/login-response';
import {ApiLinks} from "../service/api-links";

@Injectable()
export class AuthGuard implements CanActivate {
  user: User = null;

  constructor(private router: Router) {

  }

  canActivate() {
    if (this.getUser()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }


  public getUser() {
    if (this.user == null) {
      const userString = localStorage.getItem('user');
      if (userString) {
        this.user = JSON.parse(userString);
      }
    }
    return this.user;
  }

  public saveUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }


  public setUser(user: User) {
    this.user = user;
  }

  removeUser() {
    this.user = null;
    localStorage.removeItem('user');
  }

  public getUserFullImageUrlOrDefault() {
    if (this.user && this.user.employee) {
      if (this.user.employee.ImageUrl != null) {
        return ApiLinks.IMAGE_LINK   + this.user.employee.ImageUrl;
      }
      return '../../../../assets/images/user-bg.jpg';
    }
    return '../../../../assets/images/user-bg.jpg';
  }
}
