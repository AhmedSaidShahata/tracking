import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {CommonDataService} from './common-data.service';
import {ModalService} from './shared/_services';

import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {FormsModule} from '@angular/forms';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {NgxChartsModule} from '@swimlane/ngx-charts';

import {DxSelectBoxModule, DxVectorMapModule} from 'devextreme-angular';

import {ChartsModule} from 'ng2-charts';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './app-pages/guest/login/login.component';
import {GuestComponent} from './app-pages/guest/guest/guest.component';
import {LayoutComponent} from './app-pages/user/base-layout/layout.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginGuard} from './guard/login.guard';
import {AppRouter} from './service/app-router';
import {DialogService} from './service/dialog.service';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {ApiService} from './service/api-service';
import {Logger, Options} from '@orkisz/angular2-logger';
import {ChangePasswordComponent} from './app-pages/guest/change-password/change-password.component';
import {ForgetPasswordComponent} from './app-pages/guest/forget-password/forget-password.component';
import {PasswordCodeComponent} from './app-pages/guest/password-code/password-code.component';
import {ErrorComponent} from './app-pages/error/error.component';
import {SalesmenListComponent} from './app-pages/user/salesmen-list/salesmen-list.component';
import {MaincatsComponent} from './app-pages/user/maincats/maincats.component';
import {SubcatComponent} from './app-pages/user/subcat/subcat.component';
import {ModelsComponent} from './app-pages/user/models/models.component';
import {LocationsComponent} from './app-pages/user/locations/locations.component';
import {BuildsComponent} from './app-pages/user/builds/builds.component';
import {RoofsComponent} from './app-pages/user/roofs/roofs.component';
import {OfficeComponent} from './app-pages/user/office/office.component';
import {EmpdesComponent} from './app-pages/user/empdes/empdes.component';
import {NationalityComponent} from './app-pages/user/nationalty/nationality.component';
import {JobComponent} from './app-pages/user/job/job.component';
import {InventoryComponent} from './app-pages/user/inventory/inventory.component';
import {SystemempsComponent} from './app-pages/user/systememps/systememps.component';
import {AddnewAssetComponent} from './app-pages/user/addnew-asset/addnew-asset.component';
import {AddNewEmpComponent} from './app-pages/user/add-new-emp/add-new-emp.component';
import {AddNewInvatoryComponent} from './app-pages/user/add-new-invatory/add-new-invatory.component';
import {FollowAssetComponent} from './app-pages/user/follow-asset/follow-asset.component';
import {LoadFileComponent} from './app-pages/user/load-file/load-file.component';
import {Modal1Component} from "./shared/_directives";
import {TranslateService} from './service/translate.service';
import {TranslatePipe} from './service/translate.pipe';
import {MaincatsService} from "./app-pages/user/maincats/maincats-service";
import {NationalityService} from "./app-pages/user/nationalty/nationality-service";
import {JobService} from "./app-pages/user/job/job-service";
import {SubcatService} from "./app-pages/user/subcat/subcat-service";
import {ModelService} from "./app-pages/user/models/model-service";
import {RoofService} from "./app-pages/user/roofs/roofs-service";
import {OfficeService} from "./app-pages/user/office/office-service";
import {EmpService} from "./app-pages/user/systememps/emp-service";
import {InventoryService} from "./app-pages/user/inventory/inventory.service";
import {ProfileComponent} from './app-pages/user/profile/profile.component';
import {AssaginAssetComponent} from './app-pages/user/assagin-asset/assagin-asset.component';
import {PdfServiceService} from "./service/pdf-service.service";
import {UpdateUserPasswordComponent} from './app-pages/user/update-user-password/update-user-password.component';
import {RouteDirective} from "./roles/RouteDirective";
import {DeleteDirective} from "./roles/DeleteDirective";
import {HTTPListener} from "./service/HTTPStatus";
import {AssaginService} from "./app-pages/guest/attach-asset-to-employee/assagin-service";
import {NgSelectModule} from '@ng-select/ng-select';
import {InputTrimModule} from "ng2-trim-directive";
import {AttachAssetToEmployeeComponent} from "./app-pages/guest/attach-asset-to-employee/attach-asset-to-employee.component";
import {AssetImagesComponent} from "./app-pages/user/asset-images/asset-images.component";
import {ApiLinks} from "./service/api-links";
import {RequestCache} from './service/RequestCache';
import {NumberOnlyDirective} from "./shared/number_only_directive";
import {ArabicOnlyDirective} from "./shared/arabic_only_directive";
import {EnglishOnlyDirective} from "./shared/english_only_directive";
import {SessionReportComponent} from './app-pages/user/session-report/session-report.component';
import {ExcelAssetComponent} from './model/excel-asset/excel-asset.component';
import {ExcelEmployeeComponent} from './model/excel-employee/excel-employee.component';
import {firebaseConfig} from "../environments/environment";
import {ExpiryPageComponent} from './app-pages/expiry-page/expiry-page.component';


export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use(ApiLinks.LANG);
}

declare var require: any;


const RxJS_Services = [HTTPListener];


@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    LoginComponent,
    LayoutComponent,
    ErrorComponent,
    ForgetPasswordComponent,
    PasswordCodeComponent,
    ChangePasswordComponent,
    MaincatsComponent,
    SalesmenListComponent,
    SubcatComponent,
    ModelsComponent,
    LocationsComponent,
    BuildsComponent,
    RoofsComponent,
    OfficeComponent,
    EmpdesComponent,
    NationalityComponent,
    JobComponent,
    InventoryComponent,
    SystemempsComponent,
    AddnewAssetComponent,
    Modal1Component,
    AddNewEmpComponent,
    AddNewInvatoryComponent,
    FollowAssetComponent,
    LoadFileComponent,
    TranslatePipe,
    ProfileComponent,
    TranslatePipe,
    AssaginAssetComponent,
    UpdateUserPasswordComponent,
    RouteDirective,
    DeleteDirective,
    AttachAssetToEmployeeComponent,
    AssetImagesComponent,
    NumberOnlyDirective,
    ArabicOnlyDirective,
    EnglishOnlyDirective,
    SessionReportComponent,
    ExcelAssetComponent,
    ExpiryPageComponent,
    ExcelEmployeeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ChartsModule,
    NgxDatatableModule,
    HttpClientModule,
    NgxChartsModule,
    DxVectorMapModule,
    DxSelectBoxModule,
    NgSelectModule,
    InputTrimModule,
    NgbModalModule.forRoot(),
    MalihuScrollbarModule.forRoot(),


  ],
  providers: [
    CommonDataService,
    ModalService,
    ToastOptions,
    AuthGuard,
    LoginGuard,
    AppRouter,
    DialogService,
    ApiService,
    MaincatsService,
    Logger,
    Options,
    TranslateService,
    NationalityService,
    JobService,
    SubcatService,
    ModelService,
    RoofService,
    OfficeService,
    EmpService,
    InventoryService,
    PdfServiceService,
    AssaginService,
    RequestCache,
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [TranslateService],
      multi: true
    },
    RxJS_Services

    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HTTPListener,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
