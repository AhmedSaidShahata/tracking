import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommonDataService} from "../../../common-data.service";
import {DatatableComponent, TableColumn} from "@swimlane/ngx-datatable";
import {Category} from "../../../model/main-category-categories/main-category-categories";
import {MainCategory} from "../../../model/asset-lookup/asset-lookup";
import {TranslatePipe} from "../../../service/translate.pipe";
import {SubcatService} from "../subcat/subcat-service";
import {TranslateService} from "../../../service/translate.service";
import {ToastsManager} from "ng2-toastr";
import {DialogService} from "../../../service/dialog.service";
import {MaincatsService} from "../maincats/maincats-service";
import {Observable} from "rxjs";
import {filter} from "rxjs/operators";
import {NgForm} from "@angular/forms";
import {ModelService} from "./model-service";
import {Model} from "../../../model/category-models/category-models-response";
import {HttpErrorResponse} from "@angular/common/http";
import {ApiService} from "../../../service/api-service";
import {AuthGuard} from "../../../guard/auth.guard";
import {PdfServiceService} from "../../../service/pdf-service.service";
import {ApiLinks} from "../../../service/api-links";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {

  //GUI Reference;
  @ViewChild("editTemplate")
  editTemplate: TemplateRef<any>;
  @ViewChild("deleteTemplate")
  deleteTemplate: TemplateRef<any>;

  //Variables.
  columns: TableColumn[] = [];
  towers: Array<Model> = [];
  allTowers: Array<Model> = [];


  addUpdateTower: {
    NameAr: string,
    NameEn: string,
    rowIndex: number,
    DescriptionAr: string,
    DescriptionEn: string,
    Priority: string,
    id: number,
    submitForm: boolean;
  };


  selectedSubcat = "";
  selectedMaincat = "";


  selectedSubcatSearch = "";
  selectedMaincatSearch = "";


  locations: Array<MainCategory>;
  subcat: Array<Category>;
  subcatSearch: Array<Category>;

   tr: TranslatePipe;

  constructor(private _commondata: CommonDataService, private apiService: ModelService,
              private apiService1: ApiService, private apiService2: MaincatsService,
              private translateService: TranslateService, private toastService: ToastsManager
    , private dialogService: DialogService,
              private pdfServiceService: PdfServiceService,
              private translate: TranslateService,
              private auth1: AuthGuard
  ) {
     apiService2.getMainCategory().subscribe(response => {
      this.locations = response.main_categories;
    });


    apiService.getNationalities().subscribe(response => {
      this.towers = response.models;
      this.allTowers = response.models;
    });


    this.addUpdateTower = this.getDefaultTower();


    this.tr = new TranslatePipe(translate);

  }


  getAllSubCat(deviceValue) {
    if (this.selectedMaincat == "") {
      this.subcat = [];
      return;
    }
    this.apiService1.getMainCategoryCategories(this.selectedMaincat)
      .subscribe(response => {
        this.subcat = response.categories;
      }, (error: HttpErrorResponse) => {

      });
  }



  getAllModelSearch(deviceValue) {

    if (this.selectedSubcatSearch == "" || this.selectedSubcatSearch == null) {
      this.getAllSubCatSearch(null);
      return;
    } else {



      // start filtering.
      Observable.from(this.allTowers).pipe(filter((item: Model) => {
        return item.category.Id == Number(this.selectedSubcatSearch) ;
      })).toArray().subscribe(towers => {
        this.towers = towers;
      });


    }


  }

    getAllSubCatSearch(deviceValue) {
    if (this.selectedMaincatSearch == "") {
      this.subcatSearch = [];
      this.towers = [...this.allTowers];

      return;
    } else {



      // start filtering.
      Observable.from(this.allTowers).pipe(filter((item: Model) => {
        return item.category.main_category.Id == Number(this.selectedMaincatSearch) ;
      })).toArray().subscribe(towers => {
        this.towers = towers;
      });


    }

     this.apiService1.getMainCategoryCategories(this.selectedMaincatSearch)
      .subscribe(response => {
        this.subcatSearch = response.categories;
      }, (error: HttpErrorResponse) => {

      });
  }


  ngOnInit() {
    this._commondata.setExpandDiv('Table');
    setTimeout(_ => this._commondata.showLoader(false), 200);
    // data table columns.
    this.columns = [
      {prop: "Id", name: "#"},
      {prop: "NameAr", name: this.tr.transform("arabic_name")},
      {prop: "NameEn", name: this.tr.transform("english_name")},


      {prop: "category.NameEn", name: this.tr.transform("category")},
      {prop: "main_departments.NameEn", name: this.tr.transform("main_departments")},
      {prop: 'Id', name: this.tr.transform("edit"), cellTemplate: this.editTemplate},
      {prop: 'Id', name: this.tr.transform("delete"), cellTemplate: this.deleteTemplate}
    ];


    if (ApiLinks.LANG == "ar") {
      this.columns[3] = {prop: "category.NameAr", name: this.tr.transform("category")};
      this.columns[4] = {prop: "category.main_category.NameAr", name: this.tr.transform("main_departments")};
    } else {
      this.columns[3] = {prop: "category.NameEn", name: this.tr.transform("category")};
      this.columns[4] = {
        prop: "category.main_category.NameEn",
        name: this.tr.transform("main_departments")
      };


    }


    if (this.auth1.getUser().role.Id != 1) {
      this.columns.splice((this.columns.length - 1), 1);
    }

    this.loadBuildings();
  }


  printExcel() {

    this.pdfServiceService.printModel(this.allTowers);
  }


  private loadBuildings() {
    this.apiService.getNationalities().subscribe(response => {
      this.towers = response.models;
      this.allTowers = response.models;
    }, error1 => {
      console.log(error1);
    });
  }

  filterBuildings($event) {
    const input = $event.data;
    if (input == null || input == "") {
      // reset filter
      this.towers = [...this.allTowers];
    } else {
      // start filtering.
      Observable.from(this.allTowers).pipe(filter((item: Model) => {
        return item.NameAr.indexOf(input) > -1|| item.NameEn.indexOf(input) > -1 ||





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
    this.selectedMaincat = "";

    return {
      id: 0, rowIndex: -1, LocationId: "", NameAr: '', NameEn: '',
      DescriptionAr: '', DescriptionEn: '', Priority: 'LOW',
      submitForm: false
    };
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
        DescriptionAr: this.addUpdateTower.DescriptionAr,
        DescriptionEn: this.addUpdateTower.DescriptionEn,
        Priority: this.addUpdateTower.Priority,
        CategoryId: Number(this.selectedSubcat)
      })
        .subscribe(response => {
          // add success.
          this.addUpdateTower = this.getDefaultTower();
          this.allTowers.push(response.model);
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
        DescriptionAr: this.addUpdateTower.DescriptionAr,
        DescriptionEn: this.addUpdateTower.DescriptionEn,
        Priority: this.addUpdateTower.Priority,
        CategoryId: Number(this.selectedSubcat)
      }, this.addUpdateTower.id).subscribe(response => {
        this.allTowers[this.addUpdateTower.rowIndex] = response.model;
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
    this.selectedSubcat = "" + tower.CategoryId;
    this.addUpdateTower.NameEn = tower.NameEn;
    this.addUpdateTower.NameAr = tower.NameAr;
    this.addUpdateTower.DescriptionEn = tower.DescriptionEn;
    this.addUpdateTower.DescriptionAr = tower.DescriptionAr;
    this.addUpdateTower.Priority = tower.Priority;
    this.selectedMaincat = "" + tower.category.MainCategoryId;
    this.getAllSubCat(null);
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
