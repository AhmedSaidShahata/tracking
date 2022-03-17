import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {CommonDataService} from './common-data.service';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {TranslateService} from "./service/translate.service";
import {TranslatePipe} from "./service/translate.pipe";
import {ApiLinks} from "./service/api-links";
import {firebaseConfig} from "../environments/environment";
import {AppRouter} from "./service/app-router";
import {AuthGuard} from "./guard/auth.guard";

const firebase = require('firebase');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'app';
  translatePipe: TranslatePipe;
  HTTPActivity: boolean;

  constructor(private _commondata: CommonDataService,
              public toastr: ToastsManager, vRef: ViewContainerRef,
              private router: Router,
              private appRouter: AppRouter,
              private activatedRoute: ActivatedRoute,
              private titleService: Title,
              private translate: TranslateService,
              private authService: AuthGuard
  ) {
    firebase.initializeApp(firebaseConfig);
    const remoteConfig = firebase.remoteConfig();

    remoteConfig.settings.minimumFetchIntervalMillis = 0;

    remoteConfig.fetchAndActivate()
      .then(() => {
        const val = remoteConfig.getValue("close_application");

        if (val.asString() == "true") {
           this.authService.removeUser();
          this.appRouter.navigate("expiry_page");

        }
      })
      .catch((err) => {

      });


    this.toastr.setRootViewContainerRef(vRef);

    this.translatePipe = new TranslatePipe(translate);

    translate.use(ApiLinks.LANG).then(() => {
      console.log(translate.data);

      this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.activatedRoute)
        .map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
        .filter((route) => route.outlet === 'primary')
        .mergeMap((route) => route.data)
        .subscribe((event) => this.titleService.setTitle("" + this.translatePipe.transform(event['title'])));
    });
    console.log(translate.data);


  }

  ngOnInit() {

  }
}
