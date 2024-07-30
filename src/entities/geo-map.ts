import {
  ActionCreatorWithPayload,
  PayloadAction,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { createBaseSelector, registerSlice } from "../shared/lib";

interface GeoMapState {
  districts: GeoMapStoreDistrict[];
}

export interface GeoMapStoreDistrict {
  id: string;
  name: string;
  values: {
    availablePhosphorus: number;
    availablePotassium: number;
    phSaltExtract: number;
    humus: number;
    grainYield: number;
    potatoYield: number;
    sunflowerYield: number;
    vegetableYield: number;
    srup: number;
    soilGrade: string;
  };
}

const initialState: GeoMapState = {
  districts: [],
};

const geoMapSlice = createSlice({
  name: "geoMap",
  initialState,
  reducers: {
    set: (state, { payload }: PayloadAction<GeoMapStoreDistrict[]>) => {
      state.districts = payload;
    },
  },
});

registerSlice([geoMapSlice]);

const baseSelector = createBaseSelector(geoMapSlice);

const selectTop = createSelector(baseSelector, (state) => state);

export interface GeoMapStore {
  actions: {
    set: ActionCreatorWithPayload<GeoMapStoreDistrict[]>;
  };
  selectors: {
    selectTop: typeof selectTop;
  };
}

export const geoMapStore: GeoMapStore = {
  actions: {
    set: geoMapSlice.actions.set,
  },
  selectors: {
    selectTop,
  },
};
