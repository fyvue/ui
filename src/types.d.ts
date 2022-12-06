export type NavLink = {
  to: string;
  isExternal?: boolean;
  name: string;
  childrens?: NavLink[];
};
export interface BreadcrumbLink {
  name: string;
  to?: string;
}
export interface ConfirmModalData {
  title: string;
  desc: string;
  onConfirm: Function;
}
export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[] | Set<any> | undefined | boolean;
