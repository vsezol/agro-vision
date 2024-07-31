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

const selectTop = createSelector(baseSelector, (state) => {
  const score = new Map<string, number>();

  const types: GeoMapValueType[] = [
    "humus",
    "grainYield",
    "potatoYield",
    "sunflowerYield",
    "vegetableYield",
  ];

  types.forEach((t) => {
    state.districts
      .map((item) => ({
        id: item.id,
        value: item.values[t],
      }))
      .filter((item): item is GeoMapValue => typeof item.value === "number")
      .sort((a, b) => b.value - a.value)
      .forEach(({ id }, index) => {
        score.set(id, (score.get(id) ?? 0) + index + 1);
      });
  });

  const soilGradeCereals = state.districts
    .map((item) => ({
      id: item.id,
      value: item.values["soilGradeCereals"],
    }))
    .filter((item): item is GeoMapValue => typeof item.value === "number")
    .sort((a, b) => a.value - b.value);

  const soilGradeRowHouses = state.districts
    .map((item) => ({
      id: item.id,
      value: item.values["soilGradeRowHouses"],
    }))
    .filter((item): item is GeoMapValue => typeof item.value === "number")
    .sort((a, b) => a.value - b.value);

  soilGradeCereals.forEach(({ id }, index) => {
    score.set(id, (score.get(id) ?? 0) + index + 1 + soilGradeRowHouses.length);
  });

  soilGradeRowHouses.forEach(({ id }, index) => {
    score.set(id, (score.get(id) ?? 0) + index + 1);
  });

  const sortedDistricts: GeoMapDistrict[] = [...state.districts]
    .sort((a, b) => (score.get(b.id) ?? 0) - (score.get(a.id) ?? 0))
    .map(({ id }) => state.districts.find((x) => x.id === id))
    .filter((x): x is GeoMapDistrict => Boolean(x));

  return sortedDistricts;
});

export interface GeoMapStore {
  actions: {
    set: ActionCreatorWithPayload<GeoMapDistrict[]>;
  };
  selectors: {
    selectByType: typeof selectByType;
    selectTop: typeof selectTop;
  };
}

export const geoMapStore: GeoMapStore = {
  actions: {
    set: geoMapSlice.actions.set,
  },
  selectors: {
    selectByType,
    selectTop,
  },
};
