import {BaseResponse} from '../base-response';

export interface Counters {
    employees: number;
    visits: number;
    finished_visits: number;
    canceled_visits: number;
    pending_visits: number;
    in_progress_visits: number;
}

export interface DashboardCountersResponse extends BaseResponse{
    counters: Counters;
}
