import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import {AuthGuard} from "../guard/auth.guard";
import DevExpress from "devextreme/bundles/dx.all";
import {CommonDataService} from "../common-data.service";
import {AppRouter} from "./app-router";
import {DialogService} from "./dialog.service";
import {RequestCache} from "./RequestCache";
import 'rxjs/add/observable/of';


@Injectable()
export class HTTPListener implements HttpInterceptor {
  loadingIndicator = true;

  constructor(private authGuard: AuthGuard,
              private _commondata: CommonDataService,
              private appRouter: AppRouter,
              private alertService: DialogService,
              private cache: RequestCache
  ) {


  }


  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // if (req.url.indexOf('ar.json') > -1 || req.url.indexOf('en.json') >  -1) {

      return this.sendRequest(req, next, this.cache);
    // }
    // const cachedResponse = this.cache.get(req);
    // return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }


  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCache): Observable<HttpEvent<any>> {


    const user = this.authGuard.getUser();
    if (user != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authGuard.getUser().token}`,
          "app-lang" : "ar",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS,POST',
         }
      });


    }else {
      req = req.clone({
        setHeaders: {
           "app-lang" : "ar",
           'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS,POST',
          'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
          'Access-Control-Allow-Origin':'*',
        }
      });

    }


    return next.handle(req).pipe(
      // //
      // tap(event => {
      //     if (event instanceof HttpResponse) {
      //
      //       cache.put(req, event);
      //
      //
      //     }
      //
      //   }
      // ),


      map(event => {


        this._commondata.showLoader(true);


        return event;
      }),
      catchError(error => {
        this._commondata.showLoader(false);

        if (error.error.dev_message != null &&
          error.error.dev_message != "") {
          this.alertService.showErrorMessage(error.error.dev_message);
          return;
        }


        if (error.error.user_message != null &&
          error.error.user_message.errorInfo != null) {
          this.alertService.showErrorMessage(error.error.user_message.errorInfo[2]);

        } else {
          this.alertService.showErrorMessage(error.error.user_message);

        }

        // if error.
        //
        // this.authGuard.removeUser();
        // this.appRouter.navigate('/login');

        return Observable.throw(error);
      }),
      finalize(() => {
        this._commondata.showLoader(false);

      })
    );
  }


}
