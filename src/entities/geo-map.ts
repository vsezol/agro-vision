import {
  ActionCreatorWithPayload,
  PayloadAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "../shared/lib";

interface GeoMapState {
  districts: GeoMapDistrict[];
}

export interface GeoMapValue {
  id: string;
  name: string;
  value: number;
}

export type GeoMapValueType =
  | "availablePhosphorus"
  | "availablePotassium"
  | "phSaltExtract"
  | "humus"
  | "grainYield"
  | "potatoYield"
  | "sunflowerYield"
  | "vegetableYield"
  | "srup"
  | "soilGradeCereals"
  | "soilGradeRowHouses";

export type SortDirection = "descending" | "ascending";

export type SelectByTypeProps = {
  sort: SortDirection;
  type: GeoMapValueType;
};

export interface GeoMapDistrict {
  id: string;
  name: string;
  values: Record<GeoMapValueType, number | undefined>;
}

const initialState: GeoMapState = {
  districts: [],
};

const geoMapSlice = createSlice({
  name: "geoMap",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<GeoMapDistrict[]>) => {
      state.districts = payload;
    },
  },
});

registerSlice([geoMapSlice]);

const baseSelector = createBaseSelector(geoMapSlice);

const selectByType = createSelector(
  baseSelector,
  (_, props: SelectByTypeProps) => props,
  (state: GeoMapState, { type, sort }: SelectByTypeProps) =>
    state.districts
      .map((item) => ({
        id: item.id,
        name: item.name,
        value: item.values[type],
      }))
      .filter((item): item is GeoMapValue => typeof item.value === "number")
      .sort((a, b) =>
        sort === "ascending" ? a.value - b.value : b.value - a.value
      )
);

export interface GeoMapStore {
  actions: {
    set: ActionCreatorWithPayload<GeoMapDistrict[]>;
  };
  selectors: {
    selectByType: typeof selectByType;
  };
}

export const geoMapStore: GeoMapStore = {
  actions: {
    set: geoMapSlice.actions.set,
  },
  selectors: {
    selectByType,
  },
};
