import {BaseResponse} from "../base-response";
import {Floor} from "../floors/floors-response";

export interface Room {
  Id: number;
  NameAr: string;
  NameEn: string;
  FloorId: number;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  floor: Floor;

}

export interface RoomsResponse extends BaseResponse {
  rooms: Room[];
}



