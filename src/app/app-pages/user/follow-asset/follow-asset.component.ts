import {Component, OnInit} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {ModalService} from "../../../shared/_services";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {AssetTrackHistory} from "../../../model/assetTrackHistory";
import {PdfServiceService} from "../../../service/pdf-service.service";

@Component({
  selector: 'app-follow-asset',
  templateUrl: './follow-asset.component.html',
  styleUrls: ['./follow-asset.component.scss']
})
export class FollowAssetComponent implements OnInit {
  selectedAssets: AssetTrackHistory[];



  constructor(private _commondata: CommonDataService, private modalService: ModalService,
              private pdfServiceService: PdfServiceService) {

  }


  printExcel() {

    this.pdfServiceService.printTrackHistory(this.selectedAssets);
  }




  ngOnInit() {
  }

  showModel(asset:Asset) {
    this.modalService.open("followasst");
    this.selectedAssets = asset.asset_track_history;

  }


  closeModal() {
    this.modalService.close("followasst");

  }


}
