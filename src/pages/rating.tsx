import { Typography } from "antd";
import { useState } from "react";
import {
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../shared/ui/geo-map-chart";
import { GeoBarChart } from "../widgets/geo-bar-chart";
import { GeoMapChart, GeoMapChartDistrict } from "../widgets/geo-map-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";

const { Title } = Typography;

interface RatingItem {
  label: string;
}

export default function Rating() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const ratingItems: RatingItem[] = new Array(20)
    .fill("Башмаковский")
    .map((label) => ({ label }));

  const districts: GeoMapChartDistrict[] = new Array(27)
    .fill("")
    .map((_, i) => ({ id: `${i + 1}`, value: i, label: `District ${i + 1}` }));

  return (
    <GeoMapLayout
      headerLeft={
        <Title style={{ textTransform: "uppercase", margin: 0 }}>
          Пензенская область
        </Title>
      }
      headerRight={
        <GeoBarChart
          title="Уровень плодородия с/х земель"
          legend={["Лучшая", "Худшая"]}
          startColor="#03A609"
          endColor="#D0D2CD"
          size={14}
        />
      }
      map={
        <GeoMapChart
          selectedId={selected}
          onSelect={(id) => setSelected(id)}
          startColor="#03A609"
          endColor="#D0D2CD"
          districts={districts}
        />
      }
      legend={
        <GeoMapLegend title="Общий рейтинг">
          {ratingItems.map(({ label }, index) => (
            <div key={index}>
              {index !== 0 && <GeoMapLegendDivider />}
              <GeoMapLegendItem prefix={index + 1} title={label} />
            </div>
          ))}
        </GeoMapLegend>
      }
    />
  );
}
