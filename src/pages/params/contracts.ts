import { ReactNode } from "react";

export enum ParamName {
  GrainYield,
  SunflowerYield,
  PotatoYield,
  YieldOpenGroundVegetables,
  Humus,
  SoilGradation,
  AverageCadastralValue,
}

export type ParamsPageConfig = Record<string, ParamsPageConfigItem>;

export interface ParamsPageConfigItem {
  bar: ParamsPageBar[];
  map: ParamsPageMap;
  legend: ParamsPageLegend;
}

export interface ParamsPageBar {
  title?: string;
  subtitle?: string;
  legend?: string[];
  colors: [string, string];
}

export interface ParamsPageMap {
  colors: [string, string];
}

export interface ParamsPageLegend {
  mode: "rating" | "values";
  unit?: string;
}

export interface ParamsPageLegendItem {
  label: string;
  value: string;
}

export interface ParamsPageChartProps {
  select: ReactNode;
}
