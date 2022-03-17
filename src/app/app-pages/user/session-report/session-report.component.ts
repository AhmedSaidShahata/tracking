import {Component, OnInit, ViewChild} from '@angular/core';
import {AssetTrackHistory} from "../../../model/assetTrackHistory";
import {ModalService} from "../../../shared/_services";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {CommonDataService} from "../../../common-data.service";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {SessionCycleResult} from "../../../model/SessionCycleResult/SessionCycleResultResponse";
import {AddnewAssetComponent} from "../addnew-asset/addnew-asset.component";
import {SessionCycle} from "../../../model/SessionCycle/SessionCycleResponse";

@Component({
  selector: 'app-session-report',
  templateUrl: './session-report.component.html',
  styleUrls: ['./session-report.component.scss']
})
export class SessionReportComponent implements OnInit {
  selectedAssets: SessionCycleResult[];
  @ViewChild("addasset")
  addasset: AddnewAssetComponent;

  nameSesson : SessionCycle;

  constructor(private _commondata: CommonDataService, private modalService: ModalService,
              private pdfServiceService: PdfServiceService) {

  }


  editAsset(selectedAssets: Asset, i: number) {
    this.modalService.close("followasst");

    this.addasset.EditMode(selectedAssets, asset => {

      //  this.assets[i] = asset;

    });

  }

  addAsset(selectedAssets: string, i: number) {
    this.modalService.close("followasst");

    this.addasset.showModelWithEPc(selectedAssets);

  }

  printExcel() {

    this.pdfServiceService.printInvitoryResult(this.selectedAssets,this.nameSesson);
  }




  ngOnInit() {
  }

  showModel(asset : SessionCycleResult[] , nameSesson:SessionCycle) {
    this.modalService.open("followasst");
    this.selectedAssets = asset;
    this.nameSesson = nameSesson;

  }


  closeModal() {
    this.modalService.close("followasst");

  }


}
