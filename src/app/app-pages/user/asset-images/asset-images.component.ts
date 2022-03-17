import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../service/dialog.service";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../service/api-service";
import {AssetImage} from "../../../model/search-assets/search-assets-response";
import {ApiLinks} from "../../../service/api-links";
import {TranslateService} from "../../../service/translate.service";
import {TranslatePipe} from "../../../service/translate.pipe";

declare var swal: any;

@Component({
  selector: 'app-asset-images',
  templateUrl: './asset-images.component.html',
  styleUrls: ['./asset-images.component.scss']
})
export class AssetImagesComponent implements OnInit {

  images: AssetImage[] = [];
  tr: TranslatePipe;

  constructor(private dialogService: DialogService,
              private toast: ToastsManager, private apiService: ApiService,
              private translate: TranslateService,
  ) {
    this.tr = new TranslatePipe(translate);

  }

  ngOnInit() {
  }


  public addImage(imagePath: string, imageFile) {
    if (this.images.length == 4) {
      // cannot add more images.
      this.dialogService.showErrorMessage("Cannot_images");
    } else {
      this.images.push({Id: 0, AssetId: 0, ImageUrl: imagePath, imageFile: imageFile});
    }
  }

  deleteImage(image: AssetImage, index: number) {
    const self = this;
    this.dialogService.deleteMessage(function () {
      if (image.Id > 0) {
        // remove image from server
        self.apiService.deleteAssetImage(image.Id)
          .subscribe(response => {
            self.images.splice(index, 1);
          }, error1 => {

          });

      } else {
        // remove image from images.
        self.images.splice(index, 1);
      }


      self.toast.success(  self.tr.transform("Delete_images"));

    });



  }


  public getLocalImages(): string[] {
    return this.images.filter(image => {
      return image.Id == 0;
    }).map(image => {
      return image.imageFile;
    });
  }

  public setImages(images: AssetImage[]) {
    this.images = images.map(image => {
      image.ImageUrl = ApiLinks.IMAGE_LINK + image.ImageUrl;
      return image;
    });
  }

  public isHasServerImages() {
    return this.images.find(image => {
      return image.Id > 0;
    });
  }

  public addImages() {
    return this.images.length > 0;
  }

  showImage(image: AssetImage) {
    swal({
      imageUrl:  image.ImageUrl,
      imageWidth: 400,
      imageHeight: 200,
      animation: false
    });
  }
}
