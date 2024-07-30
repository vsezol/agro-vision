import { useEffect } from "react";
import { GeoMapStoreDistrict, geoMapStore } from "../entities/geo-map";
import { useGetData2022Query } from "../shared/api";
import { useAppDispatch } from "../shared/lib";

export const useLoadGeoMap = () => {
  const { data } = useGetData2022Query();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Array.isArray(data)) {
      return;
    }

    const districts: GeoMapStoreDistrict[] = data.map((item) => ({
      id: item.id ?? "",
      name: item.regionName ?? "",
      values: {
        availablePhosphorus: Number(item.availablePhosphorus),
        availablePotassium: Number(item.availablePotassium),
        grainYield: Number(item.grainYield),
        humus: Number(item.humus),
        phSaltExtract: Number(item.phSaltExtract),
        potatoYield: Number(item.potatoYield),
        srup: Number(item.srup),
        sunflowerYield: Number(item.sunflowerYield),
        vegetableYield: Number(item.vegetableYield),
        soilGrade: item.soilGrade ?? "",
      },
    }));

    dispatch(geoMapStore.actions.set(districts));
  }, [data]);
};
