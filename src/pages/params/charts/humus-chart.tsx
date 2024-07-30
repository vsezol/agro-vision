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

const START_COLOR = "#814E11";
const END_COLOR = "#D1D1D1";
const BAR_TITLE = "Содержание гумуса в почве, %";
const BAR_LEGEND = ["Высокое", "Низкое"];
const LEGEND_TITLE = "Содержание";
const LEGEND_UNIT = "%";

const FILTER: SelectByTypeProps = {
  type: "humus",
  sort: "descending",
};

export const HumusChart = ({ select }: ParamsPageChartProps) => {
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
          {values.map(({ name, value, id }) => (
            <div key={name}>
              <GeoMapLegendItem
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
