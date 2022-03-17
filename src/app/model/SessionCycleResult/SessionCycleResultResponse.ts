import {BaseResponse} from "../base-response";
import {Room} from "../rooms/rooms-response";
import {Asset} from "../search-assets/search-assets-response";
import {TranslatePipe} from "../../service/translate.pipe";

export class SessionCycleResult {
  Id: number;
  SessionCycleId: number;
  Epc: string;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn: string;
  UpdatedBy: string;
  IsRead: number;
  IsFound: number;
  AssetId: string;
  asset: Asset = new Asset() ;


}




export class SessionCycleResultResponse {
  SessionCycleResults :SessionCycleResult[];
}


