import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {TableColumn} from "@swimlane/ngx-datatable";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {Location} from "../../../model/locations/locations-response";
import {TranslatePipe} from "../../../service/translate.pipe";
import {ApiService} from "../../../service/api-service";
import {TranslateService} from "../../../service/translate.service";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "../../../service/dialog.service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {SubcatService} from "./subcat-service";
import {MaincatsService} from "../maincats/maincats-service";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {ApiLinks} from "../../../service/api-links";

@Component({
  selector: 'app-subcat',
  templateUrl: './subcat.component.html',
  styleUrls: ['./subcat.component.scss']
})
export class SubcatComponent implements OnInit {

  //GUI Reference;
  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;

  //Variables.
  columns: TableColumn[] = [];
  towers: Array<Category> = [];
  allTowers: Array<Category> = [];
  addUpdateTower: {
    NameAr: string,
    NameEn: string,
    DescriptionAr: string,
    DescriptionEn: string,
    rowIndex: number,
    id: number,
    submitForm: boolean;
  };


  selectedSubcat = "";


  locations: Array<MainCategory>;
   tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: SubcatService,
              private translateService: TranslateService, private toastService: ToastsManager
    , private dialogService: DialogService,apimainCat :MaincatsService,
              private auth1: AuthGuard,
              private pdfServiceService: PdfServiceService,


              private translate: TranslateService) {
     apimainCat.getMainCategory().subscribe(response => {
      this.locations = response.main_categories;
    });
    this.addUpdateTower = this.getDefaultTower();


    this.tr = new TranslatePipe(translate);

  }


  printExcel() {

    this.pdfServiceService.printSubCat(this.allTowers);
  }



    ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    // data table columns.
    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name: this.tr.transform("arabic_name") },
      {prop: "NameEn",  name: this.tr.transform("english_name")},
      {prop: "main_category.NameEn", name: this.tr.transform("main_department") },
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}
    ];


    if(ApiLinks.LANG == "ar"){
      this.columns[3]=  {prop: "main_category.NameAr", name: this.tr.transform("main_department") };
    }else{
      this.columns[3]=  {prop: "main_category.NameEn", name: this.tr.transform("main_department") };

    }



    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }
    this.loadBuildings();
  }

  private loadBuildings() {
    this.apiService.getNationalities().subscribe(response => {
      this.towers = response.categories;
      this.allTowers = response.categories;
    }, error1 => {
      console.log(error1);
    });
  }

  filterBuildings($event) {
    const input = $event.data;
    if (input == null) {
      // reset filter
      this.towers = [...this.allTowers];
    } else {
      // start filtering.
      Observable.from(this.allTowers).pipe(filter((item: Category) => {
        return item.NameAr.indexOf(input) > -1|| item.NameEn.indexOf(input)  > -1 ||
          item.NameAr.indexOf(input)  > -1 || item.NameEn.indexOf(input)  > -1;
      })).toArray().subscribe(towers => {
        this.towers = towers;
      });
    }
  }

  clearForm() {
    this.addUpdateTower = this.getDefaultTower();
  }

  private getDefaultTower() {
    this.selectedSubcat = "";

    return {id: 0, rowIndex: -1, LocationId: "", NameAr: '', NameEn: '',
      DescriptionAr: '', DescriptionEn: '',



      submitForm: false};
  }

  public formSubmit(form: NgForm) {
    this.addUpdateTower.submitForm = true;
    if (!form.valid) {
      return;
    }
    if (this.addUpdateTower.id == 0) {
      // add new tower.
      this.apiService.addNationality({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        MainCategoryId: Number(this.selectedSubcat),
        DescriptionAr:  this.addUpdateTower.DescriptionAr,
        DescriptionEn: this.addUpdateTower.DescriptionEn
      })
        .subscribe(response => {
          // add success.
          this.addUpdateTower = this.getDefaultTower();
          this.allTowers.push(response.category);
          this.towers = [...this.allTowers];
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    } else {
      // update tower.
      this.apiService.updateNationality({
        NameAr: this.addUpdateTower.NameAr,
        NameEn: this.addUpdateTower.NameEn,
        MainCategoryId:  Number(this.selectedSubcat),
        DescriptionAr:  this.addUpdateTower.DescriptionAr,
        DescriptionEn: this.addUpdateTower.DescriptionEn
      }, this.addUpdateTower.id).subscribe(response => {
        this.allTowers[this.addUpdateTower.rowIndex] = response.category;
        this.towers = [...this.allTowers];
        this.dialogService.SuccesMessage();
        this.addUpdateTower = this.getDefaultTower();
      }, error1 => {
        console.error(error1);
      });
    }
  }

  editTower(rowIndex) {
    const tower = this.towers[rowIndex];
    this.addUpdateTower.rowIndex = rowIndex;
    this.addUpdateTower.id = tower.Id;
    this.selectedSubcat = ""+tower.MainCategoryId;
    this.addUpdateTower.NameEn = tower.NameEn;
    this.addUpdateTower.NameAr = tower.NameAr;
    this.addUpdateTower.DescriptionEn = tower.DescriptionEn;
    this.addUpdateTower.DescriptionAr = tower.DescriptionAr;
    window.scrollTo(0, 0);
  }


  deleteTower(rowIndex) {
    this.dialogService.deleteMessage(() => {
      const tower = this.towers[rowIndex];
      this.apiService.deleteNationality(tower.Id)
        .subscribe(response => {
          this.allTowers.splice(rowIndex, 1);
          this.towers = [...this.allTowers];
          this.dialogService.SuccesMessage();
        }, error1 => {
          console.error(error1);
        });
    });
  }
}
