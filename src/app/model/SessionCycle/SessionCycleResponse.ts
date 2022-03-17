import {BaseResponse} from "../base-response";
import {Room} from "../rooms/rooms-response";
import {Tower} from "../location-towers/location-towers-response";
import {Model} from "../category-models/category-models-response";
import {Floor} from "../floors/floors-response";
import {Location} from "../asset-lookup/asset-lookup";

export class SessionCycle {
  Id: number;
  Name: string;
  RoomId: number;
  LocationId: string;
  TowerId: string;
  FloorId: string;
  StartDate: string;
  EndDate: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  room: Room;

  location: Location;
  tower: Tower;
  floor: Floor;

  Completed: number;
  CompletedDate?: any;
}


export class SessionCycleResponse {
  SessionCycles: { SessionCycles: SessionCycle[], count: number };
}

export interface AddUpdateSessionCycleResponse extends BaseResponse {
  SessionCycle: SessionCycle;
}
