import {Component, OnInit} from '@angular/core';
import {CommonDataService} from '../../../common-data.service';
import {AuthGuard} from '../../../guard/auth.guard';
import {User} from '../../../model/login/login-response';
import {AppRouter} from '../../../service/app-router';
import {TranslateService} from "../../../service/translate.service";


declare var document: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isSearchActive = false;
  isSlideMenu = false;

  public scrollbarOptions = {axis: 'yx', theme: 'minimal'};
  user: User = null;

  constructor(public _commondata: CommonDataService, private authService: AuthGuard,
              private appRouter: AppRouter) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this._commondata.showLoader(true);
  }

  toggleSearch() {
    this.isSearchActive = !this.isSearchActive;
  }

  toggleMenu() {
    this.isSlideMenu = !this.isSlideMenu;
  }

  expandCollpse(sectionName) {
    const CurrentCls = document.getElementById(sectionName).getAttribute('class');
    if (CurrentCls == 'collapse' || CurrentCls == 'collapse hide') {
      document.getElementById(sectionName).setAttribute('class', 'collapse show');
      document.getElementById(sectionName).previousElementSibling.setAttribute('aria-expanded', 'true');
    } else {
      document.getElementById(sectionName).setAttribute('class', 'collapse hide');
      document.getElementById(sectionName).previousElementSibling.setAttribute('aria-expanded', 'false');
    }
  }

  toggleFullscreen(elem) {
    elem = elem || document.documentElement;
    if (!document.fullscreenElement && !document['mozFullScreenElement'] &&
      !document.webkitFullscreenElement && !document['msFullscreenElement']) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element['ALLOW_KEYBOARD_INPUT']);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  logOutClick() {
    this.user = null;
    this.authService.removeUser();
    this.appRouter.navigate('/login'); // navigate to main to login user again.
  }


  getUserImage() {
    return this.authService.getUserFullImageUrlOrDefault();
  }
}
