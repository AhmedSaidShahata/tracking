export interface AssignedTo {
  Id: number;
  NameAr: string;
  NameEn: string;
  Email: string;
}

export interface AssignedToResponse {
  status: number;
  assignedTo: AssignedTo[];
  user_message: string;
  dev_message: string;
}


