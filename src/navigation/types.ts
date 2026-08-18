import { ModuleRecord } from "../types/models";import { Student } from "../mocks/students";
export type RootStackParamList={Login:undefined;Main:undefined;Module:{moduleKey:string};RecordDetail:{moduleKey:string;record:ModuleRecord};StudentDetail:{student:Student};Notifications:undefined;GlobalSearch:undefined;CreateRecord:{moduleKey:string}};
