import { useEffect } from "react";
import { GeoMapDistrict, geoMapStore } from "../entities/geo-map";
import { useGetData2022Query } from "../shared/api";
import { useAppDispatch } from "../shared/lib";

export const useLoadGeoMap = () => {
  const { data } = useGetData2022Query();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Array.isArray(data)) {
      return;
    }

    const districts: GeoMapDistrict[] = data.map((item) => {
      const soilGradeValue = Number((item.soilGrade ?? "").split(" ")[0]);
      const isSoilGradeCereals = (item.soilGrade ?? "")
        .split(" ")[1]
        .includes("з");

      return {
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
          soilGradeCereals: isSoilGradeCereals ? soilGradeValue : undefined,
          soilGradeRowHouses: !isSoilGradeCereals ? soilGradeValue : undefined,
        },
      };
    });

    dispatch(geoMapStore.actions.set(districts));
  }, [data, dispatch]);
};
