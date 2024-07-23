import { useState } from "react";
import {
  GeoMap,
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../shared/ui/geo-map-chart";
import { Select, SelectOption } from "../shared/ui/select";
import { GeoBarChart } from "../widgets/geo-bar-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";

const options: SelectOption[] = [
  {
    label: "Урожайность зерновых",
    value: "1",
  },
  {
    label: "Урожайность подсолнечника",
    value: "2",
  },
  {
    label: "Урожайность картофеля",
    value: "3",
  },
  {
    label: "Урожайность овощей открытого грунта",
    value: "4",
  },
  {
    label: "Гумус",
    value: "5",
  },
  {
    label: "Градация почв",
    value: "6",
  },
  {
    label: "Средняя кадастровая стоимость",
    value: "7",
  },
];

export default function Params() {
  const [value, setValue] = useState("1");

  return (
    <GeoMapLayout
      headerLeft={
        <Select value={value} onChange={(x) => setValue(x)} options={options} />
      }
      headerRight={
        <GeoBarChart
          title="Урожайность картофеля, т/га"
          legend={["Высокая", "Низкая"]}
          startColor="#03A609"
          endColor="#FFDD9C"
          size={14}
        />
      }
      map={<GeoMap />}
      legend={
        <GeoMapLegend title="Содержание" unit="%">
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
          <GeoMapLegendDivider />
          <GeoMapLegendItem title="Башмаковский" value="12.9" />
        </GeoMapLegend>
      }
    />
  );
}
