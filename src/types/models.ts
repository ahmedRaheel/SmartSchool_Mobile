export type Role = "Admin" | "Teacher" | "Parent" | "Student";
export interface User { id:string; name:string; email:string; role:Role; initials:string; }
export interface Metric { label:string; value:string; note:string; }
export interface ModuleRecord { id:string; title:string; subtitle:string; meta:string; status:string; value:string; }
export interface ModuleData { key:string; title:string; subtitle:string; action:string; metrics:Metric[]; records:ModuleRecord[]; insights:string[]; }
export interface NotificationItem { id:string; title:string; body:string; moduleKey:string; read:boolean; }
