import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class AppRouter {

  constructor(private router: Router) {

  }


  public navigate(url: string) {
    this.router.navigate([url]);
  }

  public navigateWithParams(url: string, params: Array<any>) {
    let routerLink = url;
    params.forEach(item => {
      routerLink += '/' + item;
    });
    this.router.navigate([routerLink]);
  }
}
