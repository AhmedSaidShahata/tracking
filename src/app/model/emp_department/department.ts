export interface DepartmentsResponse {
  status: number;
  departments?: (DepartmentsEntity)[] | null;

}
export interface DepartmentsEntity {
  Id: number;
  NameAr: string;
  NameEn: string;
  Color?: string | null;
  CreatedOn: string;
  CreatedBy: string;
  UpdatedOn?: string | null;
  UpdatedBy?: string | null;
}
