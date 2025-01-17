import { useState } from "react";
import { useLoadGeoMap } from "../../features/geo-map";
import { Select, SelectOption } from "../../shared/ui/select";
import { DefaultChart } from "./charts/default-chart";
import { GrainYieldChart } from "./charts/grain-yield-chart";
import { HumusChart } from "./charts/humus-chart";
import { PotatoYieldChart } from "./charts/potato-yield-chart";
import { SoilGradeChart } from "./charts/soil-grade-chart";
import { SrupChart } from "./charts/srup-chart";
import { SunflowerYieldChart } from "./charts/sunflower-yield-chart";
import { VegetableYieldChart } from "./charts/vegetable-yield-chart";

type SelectValue =
  | "availablePhosphorus"
  | "availablePotassium"
  | "phSaltExtract"
  | "humus"
  | "grainYield"
  | "potatoYield"
  | "sunflowerYield"
  | "vegetableYield"
  | "srup"
  | "soilGrade";

const options: SelectOption<SelectValue>[] = [
  {
    label: "Урожайность зерновых",
    value: "grainYield",
  },
  {
    label: "Урожайность подсолнечника",
    value: "sunflowerYield",
  },
  {
    label: "Урожайность картофеля",
    value: "potatoYield",
  },
  {
    label: "Урожайность овощей открытого грунта",
    value: "vegetableYield",
  },
  {
    label: "Гумус",
    value: "humus",
  },
  {
    label: "Градация почв",
    value: "soilGrade",
  },
  {
    label: "Средняя кадастровая стоимость",
    value: "srup",
  },
];

export default function ParamsPage() {
  useLoadGeoMap();

  const [value, setValue] = useState<SelectValue>("grainYield");

  const select = (
    <Select
      listHeight={304}
      value={value}
      onChange={(x) => setValue(x as SelectValue)}
      options={options}
    />
  );

  switch (value) {
    case "vegetableYield":
      return <VegetableYieldChart select={select} />;
    case "sunflowerYield":
      return <SunflowerYieldChart select={select} />;
    case "soilGrade":
      return <SoilGradeChart select={select} />;
    case "grainYield":
      return <GrainYieldChart select={select} />;
    case "potatoYield":
      return <PotatoYieldChart select={select} />;
    case "srup":
      return <SrupChart select={select} />;
    case "humus":
      return <HumusChart select={select} />;
    default:
      return <DefaultChart select={select} />;
  }
}
