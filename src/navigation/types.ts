import { Student } from '../mocks/students';

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Module: { moduleKey: string };
  RecordDetail: { moduleKey: string; recordId: string };
  StudentDetail: { student: Student };
  Notifications: undefined;
  GlobalSearch: undefined;
  CreateRecord: { moduleKey: string };
};
