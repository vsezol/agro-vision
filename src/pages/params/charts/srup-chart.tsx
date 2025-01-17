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

const START_COLOR = "#0D4EB1";
const END_COLOR = "#A7C9FC";
const BAR_TITLE = "Средняя кадастровая стоимость кв. метра";
const BAR_LEGEND = ["Высокая", "Низкая"];
const LEGEND_TITLE = "СТОИМОСТЬ";
const LEGEND_UNIT = "руб/кв.м";

const FILTER: SelectByTypeProps = {
  type: "srup",
  sort: "descending",
};

export const SrupChart = ({ select }: ParamsPageChartProps) => {
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
          startColor={[END_COLOR]}
          endColor={[START_COLOR]}
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
