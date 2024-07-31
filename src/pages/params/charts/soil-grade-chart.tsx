import { useState } from "react";
import { geoMapStore } from "../../../entities/geo-map";
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

const START_COLOR = ["#03A609", "#A26B29"];
const END_COLOR = ["#BEE09A", "#C49154"];
const BAR_TITLE = "Градация почв с учетом агрохимических показателей";
const BAR_LEGEND = ["Высокая", "Низкая"];
const LEGEND_TITLE = "РЕЙТИНГ";

export const SoilGradeChart = ({ select }: ParamsPageChartProps) => {
  const [hovered, setHovered] = useState<string | undefined>(undefined);

  const cereals = useAppSelector((state) =>
    geoMapStore.selectors.selectByType(state, {
      type: "soilGradeCereals",
      sort: "ascending",
    })
  );
  const rowHouses = useAppSelector((state) =>
    geoMapStore.selectors.selectByType(state, {
      type: "soilGradeRowHouses",
      sort: "ascending",
    })
  );

  return (
    <GeoMapLayout
      headerLeft={select}
      headerRight={
        <>
          <GeoBarChart
            title={BAR_TITLE}
            subtitle="Зерновые"
            legend={BAR_LEGEND}
            startColor={START_COLOR[0]}
            endColor={END_COLOR[0]}
            size={14}
          />
          <GeoBarChart
            subtitle="Пропашные"
            startColor={START_COLOR[1]}
            endColor={END_COLOR[1]}
            size={2}
          />
        </>
      }
      map={
        <GeoMapChart
          startColor={START_COLOR}
          endColor={END_COLOR}
          districts={[cereals, rowHouses].map((items) =>
            items.map(({ id, name, value }) => ({
              id,
              label: name,
              value: value,
            }))
          )}
          selectedId={hovered}
          onHover={(id) => setHovered(id)}
        />
      }
      legend={
        <GeoMapLegend title={LEGEND_TITLE}>
          {cereals.map(({ name, value, id }, index) => (
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
          {rowHouses.map(({ name, value, id }, index) => (
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
