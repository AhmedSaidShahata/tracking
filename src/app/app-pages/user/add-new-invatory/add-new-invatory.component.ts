import { Component, OnInit } from '@angular/core';
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {CommonDataService} from "../../../common-data.service";
import {ModalService} from "../../../shared/_services";
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Location} from "../../../model/asset-lookup/asset-lookup";
import {Tower} from "../../../model/location-towers/location-towers-response";
import {ApiService} from "../../../service/api-service";
import {Asset} from "../../../model/search-assets/search-assets-response";
import {InventoryService} from "../inventory/inventory.service";
import {SessionCycle} from "../../../model/SessionCycle/SessionCycleResponse";
import {Floor} from "../../../model/floors/floors-response";
import {Room} from "../../../model/rooms/rooms-response";
import {DialogService} from "../../../service/dialog.service";
import {DateObject} from "../../../model/DateObject";

@Component({
  selector: 'app-add-new-invatory',
  templateUrl: './add-new-invatory.component.html',
  styleUrls: ['./add-new-invatory.component.scss']
})
export class AddNewInvatoryComponent implements OnInit {

  editMode = false;
  inventory_name = "";

   Datepickerfrom : NgbDateStruct;
  Datepickerto : NgbDateStruct;




  selectedTowers = "";
  selectedFloors = "";
  selectedRoom = "";
  selectedLocation = "";

  callback = null;

  locations: Location[];
  towers: Tower[];
   floors: Floor[];
  rooms: Room[];
  submitForm = false;

  sessionCycle: SessionCycle;
  constructor( calendar: NgbCalendar,private modalService: ModalService,
               private apiService: ApiService ,
               private alertService: DialogService ,
               private invService: InventoryService) { }

  ngOnInit() {
    this.loadLocations();
  }





  showModel(callback: (asset: SessionCycle) => any)  {
    this.callback = callback;
    this.sessionCycle = new SessionCycle();
    this.modalService.open("exampleModal");
    this.ClearAll();

  }



  closeModal(){
    this.modalService.close("exampleModal");
    this.ClearAll();

  }



  getFloorRooms(deviceValue) {
    this.apiService.getFloorRooms(this.selectedFloors)
      .subscribe(response => {
        this.rooms = response.rooms;
      }, (error: HttpErrorResponse) => {

      });
  }



  getFloors(deviceValue) {
    this.apiService.getTowerFloors(this.selectedTowers)
      .subscribe(response => {
        this.floors = response.floors;
      }, (error: HttpErrorResponse) => {

      });
  }


  ClearAll() {
    this.submitForm = false;
    this.inventory_name = "";
    this.Datepickerfrom = null;
    this.Datepickerto = null;
    this.selectedTowers = "";
    this.selectedFloors = "";
    this.selectedRoom = "";
    this.selectedLocation = "";

    this.editMode = false;

  }

  getEmptyIfNull(par : any){
    if (par == null || par == undefined){
      return "";
    }

    return ""+par;
  }

  EditMode(asset: SessionCycle,callback: (asset: SessionCycle) => any)  {
    this.callback = callback;
    this.sessionCycle = asset;

    this.modalService.open("exampleModal");
    this.editMode = true;


     const valueFrom =  asset.StartDate.split(" ")[0].split("-");
     const valueTO =  asset.EndDate.split(" ")[0].split("-");

    this.inventory_name = asset.Name;
      this.Datepickerfrom = new class implements NgbDateStruct {
        day: number = Number(valueFrom[2]);
        month: number  = Number(valueFrom[1]);
        year: number  = Number(valueFrom[0]);
      };
    this.Datepickerto= new class implements NgbDateStruct {
      day: number = Number(valueTO[2] );
      month: number  = Number(valueTO[1]);
      year: number  = Number(valueTO[0]);
    };

    this.selectedRoom = ""+asset.RoomId;
    this.selectedFloors = ""+asset.room.FloorId;
    this.selectedTowers = ""+asset.room.floor.TowerId;
    this.selectedLocation = ""+asset.room.floor.tower.LocationId;




    this.loadLocations();
    this.getBuild(null);

     this.getFloors(null);
    this.getFloorRooms(null);
    }


  private loadLocations() {
    this.apiService.getLocations().subscribe(response => {
      this.locations = response.locations;
    }, error1 => {
      console.log(error1);
    });
  }
  getBuild(deviceValue) {
    this.apiService.getLocationTowers(this.selectedLocation)
      .subscribe(response => {
        this.towers = response.towers;
      }, (error: HttpErrorResponse) => {

      });
  }


  addNewAsset(addasset: NgForm) {
    console.log(addasset);
    if (addasset.invalid) {
      this.submitForm = true;

      return;
    }



    this.sessionCycle.Name = this.inventory_name;
    this.sessionCycle.FloorId = this.selectedFloors;
    this.sessionCycle.TowerId = this.selectedTowers;
    this.sessionCycle.LocationId = this.selectedLocation;


    this.sessionCycle.StartDate = this.Datepickerfrom.year + "-" + this.Datepickerfrom.month + "-" +this.Datepickerfrom.day;


    this.sessionCycle.EndDate = this.Datepickerto.year + "-" + this.Datepickerto.month + "-" +this.Datepickerto.day;
    this.sessionCycle.RoomId = Number(this.selectedRoom);


    if (this.editMode) {




      this.invService.updateNationality(this.sessionCycle)
        .subscribe(response => {
          this.modalService.close("exampleModal");
          this.alertService.SuccesMessage();
          this.callback(response.SessionCycle);
        }, (error: HttpErrorResponse) => {
        });
    } else {
      this.invService.addNationality(this.sessionCycle)
        .subscribe(response => {
          this.modalService.close("exampleModal");
          this.alertService.SuccesMessage();
          this.callback(response.SessionCycle);

        }, (error: HttpErrorResponse) => {
        });
    }


    this.ClearAll();
  }





}
