
export interface Assigner {
  Id: number;
  NameAr: string;
  NameEn: string;
  Email: string;
}

export interface AssignersResponse {
  status: number;
  assigners: Assigner[];
  user_message: string;
  dev_message: string;
}


