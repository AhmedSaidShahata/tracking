import {BaseResponse} from "../base-response";
import {Tower} from "../location-towers/location-towers-response";
import {Room} from "../rooms/rooms-response";




export interface FloorRoomsResponse extends BaseResponse {
  rooms: Room[];
}

