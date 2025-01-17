import { useState } from "react";
import { SelectByTypeProps, geoMapStore } from "../../../entities/geo-map";
import { useAppSelector } from "../../../shared/lib";
import {
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../../../shared/ui/geo-map-chart";
import { GeoBarChart } from "../../../widgets/geo-bar-chart";
import { GeoMapChart } from "../../../widgets/geo-map-chart";
import { GeoMapLayout } from "../../../widgets/geo-map-layout";
import { ParamsPageChartProps } from "../contracts";

const START_COLOR = "#03A609";
const END_COLOR = "#FFDD9C";
const BAR_TITLE = "Урожайность овощей открытого грунта, т/га";
const BAR_LEGEND = ["Высокая", "Низкая"];
const LEGEND_TITLE = "УРОЖАЙНОСТЬ";
const LEGEND_UNIT = "т/га";

const FILTER: SelectByTypeProps = {
  type: "vegetableYield",
  sort: "descending",
};

export const VegetableYieldChart = ({ select }: ParamsPageChartProps) => {
  const [hovered, setHovered] = useState<string | undefined>(undefined);

  const values = useAppSelector((state) =>
    geoMapStore.selectors.selectByType(state, FILTER)
  );

  return (
    <GeoMapLayout
      headerLeft={select}
      headerRight={
        <GeoBarChart
          title={BAR_TITLE}
          legend={BAR_LEGEND}
          startColor={START_COLOR}
          endColor={END_COLOR}
          size={14}
        />
      }
      map={
        <GeoMapChart
          startColor={[START_COLOR]}
          endColor={[END_COLOR]}
          districts={[
            values.map(({ id, name, value }) => ({
              id,
              label: name,
              value: value,
            })),
          ]}
          selectedId={hovered}
          onHover={(id) => setHovered(id)}
        />
      }
      legend={
        <GeoMapLegend title={LEGEND_TITLE} unit={LEGEND_UNIT}>
          {values.map(({ name, value, id }, index) => (
            <div key={name}>
              <GeoMapLegendItem
                prefix={index + 1}
                title={name}
                value={value.toString()}
                active={id === hovered}
                onHover={() => setHovered(id)}
              />
              <GeoMapLegendDivider />
            </div>
          ))}
        </GeoMapLegend>
      }
    />
  );
};
