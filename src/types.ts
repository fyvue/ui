import type { Component } from "vue";

export type NavLink = {
  to: string;
  isExternal?: boolean;
  name: string;
  childrens?: NavLink[];
  icon?: Component;
  id?: string;
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
export interface Paging {
  page_no: number;
  results_per_page: number;
  page_max: number;
  page_max_relation: string;
  count: number;
}
export interface Step {
  name: string;
  icon?: string;
}
export interface TableHeaders {
  [key: string]: string;
}
export interface TableData {
  [key: string]: any;
}
export type modelValueType = string | number | string[] | undefined;
export type checkboxValueType = any[] | Set<any> | undefined | boolean;
