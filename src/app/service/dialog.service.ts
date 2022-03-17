import {Injectable, ViewContainerRef} from '@angular/core';
import {BaseResponse} from "../model/base-response";
import {CommonDataService} from "../common-data.service";
import {ToastsManager} from "ng2-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "./translate.service";
import {TranslatePipe} from "./translate.pipe";


declare var swal: any;

@Injectable()
export class DialogService {

  translatePipe : TranslatePipe;

  public showError(title: string = 'Error', message: string = 'Error in server.') {
    swal(
      title,
      message,
      'error'
    );
  }


  constructor(
              private translate: TranslateService
  ) {
    this.translatePipe = new TranslatePipe(translate);


  }
  public showErrorMessage(message: string = 'Error in server.') {


    swal({
      title: this.translatePipe.transform('Error'),
      text: this.translatePipe.transform(message),
      type: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: this.translatePipe.transform('cancel'),
     });

  }
    public deleteMessage(callback: () => any) {
      swal({
        title: this.translatePipe.transform('DeleteMessage'),
        text: this.translatePipe.transform('DeleteComfirm'),
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translatePipe.transform('Yes'),
        cancelButtonText:this.translatePipe.transform('No'),
      }).then((result) => {
        if (result.value) {
          callback();

        }
      });
  }



  public confirmation(titleKey : string, callback: () => any) {
    swal({
      title: this.translatePipe.transform(titleKey),
      type: 'error',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translatePipe.transform('Yes'),
      cancelButtonText:this.translatePipe.transform('No'),
    }).then((result) => {
      if (result.value) {
        callback();

      }
    });
  }
  public confirmationWithTitle(titleKey : string, callback: () => any) {
    swal({
      title: titleKey,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.translatePipe.transform('Yes'),
      cancelButtonText:this.translatePipe.transform('No'),
    }).then((result) => {
      if (result.value) {
        callback();

      }
    });
  }


  public SuccesMessage(message: string = 'Done') {
    swal({
      type: 'success',
      title:  this.translatePipe.transform(message),
      showConfirmButton: false,
      timer: 1500
    });


  }







}
