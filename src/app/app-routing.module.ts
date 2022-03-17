import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './app-pages/user/base-layout/layout.component';
import {AuthGuard} from './guard/auth.guard';
import {LoginGuard} from './guard/login.guard';
import {LoginComponent} from './app-pages/guest/login/login.component';
import {ErrorComponent} from './app-pages/error/error.component';
import {ForgetPasswordComponent} from './app-pages/guest/forget-password/forget-password.component';
import {PasswordCodeComponent} from './app-pages/guest/password-code/password-code.component';
import {ChangePasswordComponent} from './app-pages/guest/change-password/change-password.component';
import {SalesmenListComponent} from './app-pages/user/salesmen-list/salesmen-list.component';
import {MaincatsComponent} from "./app-pages/user/maincats/maincats.component";
import {SubcatComponent} from "./app-pages/user/subcat/subcat.component";
import {ModelsComponent} from "./app-pages/user/models/models.component";
import {OfficeComponent} from "./app-pages/user/office/office.component";
import {RoofsComponent} from "./app-pages/user/roofs/roofs.component";
import {BuildsComponent} from "./app-pages/user/builds/builds.component";
import {EmpdesComponent} from "./app-pages/user/empdes/empdes.component";
import {LocationsComponent} from "./app-pages/user/locations/locations.component";

import {JobComponent} from "./app-pages/user/job/job.component";
import {SystemempsComponent} from "./app-pages/user/systememps/systememps.component";
import {InventoryComponent} from "./app-pages/user/inventory/inventory.component";
import {NationalityComponent} from "./app-pages/user/nationalty/nationality.component";
import {AssaginAssetComponent} from "./app-pages/user/assagin-asset/assagin-asset.component";
import {ProfileComponent} from "./app-pages/user/profile/profile.component";
import {AttachAssetToEmployeeComponent} from "./app-pages/guest/attach-asset-to-employee/attach-asset-to-employee.component";
import {ExcelAssetComponent} from "./model/excel-asset/excel-asset.component";
import {ExcelEmployeeComponent} from "./model/excel-employee/excel-employee.component";
import {ExpiryPageComponent} from "./app-pages/expiry-page/expiry-page.component";
// {{ 'add_new_inventory' | translate }}

const routes: Routes = [
    {
      // app home pages with authenticated user.
      path: '', component: LayoutComponent, canActivate: [AuthGuard], children: [
        {path: '', component: SalesmenListComponent, data: {title: "assets_system"}},
        {path: 'salesmen', component: SalesmenListComponent, data: {title: "controller_asset"}},
        {path: 'maincats', component: MaincatsComponent, data: {title: 'maincats'}},
        {path: 'subcat', component: SubcatComponent, data: {title: 'subcat'}},
        {path: 'models', component: ModelsComponent, data: {title: 'models'}},
        {path: 'location', component: LocationsComponent, data: {title: 'controller_asset_location'}},
        {path: 'build', component: BuildsComponent, data: {title: 'build'}},
        {path: 'roofs', component: RoofsComponent, data: {title: 'roofs '}},
        {path: 'office', component: OfficeComponent, data: {title: 'office'}},
        {path: 'empdeps', component: EmpdesComponent, data: {title: 'empdeps '}},
        {path: 'nationalty', component: NationalityComponent, data: {title: 'nationalty'}},
        {path: 'job', component: JobComponent, data: {title: 'job'}},
        {path: 'sysemps', component: SystemempsComponent, data: {title: 'sysemps'}},
        {path: 'inventory', component: InventoryComponent, data: {title: 'inventory'}},
        {path: 'attach_assets', component: AssaginAssetComponent, data: {title: 'attach_assets'}},
        {path: 'profile', component: ProfileComponent, data: {title: 'profile'}},
        {path: 'excel_assets', component: ExcelAssetComponent, data: {title: 'excel_assets'}},
        {path: 'excel_employee', component: ExcelEmployeeComponent, data: {title: 'excel_employee'}},

      ]

    },
    {
      path: '', canActivate: [LoginGuard], children: [
        {path: 'expiry_page', component: ExpiryPageComponent, data: {title: 'expiry'}},
        {path: '', redirectTo: 'login', pathMatch: 'full'},
        {path: 'login', component: LoginComponent, data: {title: 'login'}},
        {path: 'forget_password', component: ForgetPasswordComponent, data: {title: 'forget_password'}},
        {path: 'change_password/:code', component: ChangePasswordComponent, data: {title: 'email_verfication'}},
      ]
    }
    ,
    {path: 'asset_assign/:hash_link', component: AttachAssetToEmployeeComponent}
    ,
    {path: '**', component: ErrorComponent}

  ]
;


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true, enableTracing: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
