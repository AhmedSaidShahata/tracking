import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from './translate.service';
import {ApiLinks} from "./api-links";

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
   constructor(private translate: TranslateService) {}
   public  transform(key: any): any {


     if (key == null ||   key   == undefined) {
       return this.translate.data['not_found'];
     }


     if (ApiLinks.LANG == "ar"){
       if (key.NameAr  != null  && key.NameAr != undefined && key.NameAr != ""){

         return key.NameAr;
       } else if (key.NameEn  != null  && key.NameEn != undefined && key.NameEn != ""){

         return key.NameEn;
       }
     } else if (ApiLinks.LANG == "en") {
       if (key.NameEn  != null  && key.NameEn != undefined && key.NameEn != ""){

         return key.NameEn;
       }else if (key.NameAr  != null  && key.NameAr != undefined && key.NameAr != ""){

         return key.NameAr;
       }
     }




    return this.translate.data[key] || key;
  }



}
