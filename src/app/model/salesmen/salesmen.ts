import {BaseResponse} from '../base-response';

export interface Salesman {
        id: number;
        name: string;
        email: string;
        image?: any;
        is_blocked: string;
    }

    export interface SalesmenResponse extends BaseResponse{
        salesmen: Salesman[];
    }

