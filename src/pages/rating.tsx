import { Typography } from "antd";
import { useMemo, useState } from "react";
import {
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../shared/ui/geo-map-chart";
import { GeoBarChart } from "../widgets/geo-bar-chart";
import { GeoMapChart, GeoMapChartDistrict } from "../widgets/geo-map-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";
import { GeoMapModalItem } from "../widgets/geo-map-modal";
import { GeoMapModal } from "../widgets/geo-map-modal/geo-map-modal";

const { Title } = Typography;

interface RatingItem {
  label: string;
}

const LEGEND_WIDTH_PX = 324;

export default function Rating() {
  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const ratingItems: RatingItem[] = useMemo(
    () => new Array(27).fill("Башмаковский").map((label) => ({ label })),
    []
  );

  const districts: GeoMapChartDistrict[] = useMemo(
    () =>
      new Array(27).fill("").map((_, i) => ({
        id: `${i + 1}`,
        value: i,
        label: `District ${i + 1}`,
      })),
    []
  );

  const selectedDistrict = useMemo(
    () => districts?.find((x) => x.id === selected),
    [districts, selected]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
          <>
            <GeoMapChart
              selectedId={selected || hovered}
              onHover={(id) => setHovered(id)}
              onSelect={(id) => {
                setSelected(id);
                showModal();
              }}
              startColor="#03A609"
              endColor="#D0D2CD"
              districts={districts}
            />
          </>
        }
        modal={
          isModalOpen && (
            <GeoMapModal
              title={selectedDistrict?.label}
              onClose={() => {
                closeModal();
                setSelected(undefined);
              }}
            >
              {new Array(30).fill("").map((_, i) => (
                <GeoMapModalItem
                  label={`Письки сиськи ${i}`}
                  value={(i * 10).toString()}
                  unit="руб/кв.м"
                />
              ))}
            </GeoMapModal>
          )
        }
        legend={
          <GeoMapLegend width={LEGEND_WIDTH_PX + "px"} title="Общий рейтинг">
            {ratingItems.map(({ label }, index) => (
              <div key={index}>
                {index !== 0 && <GeoMapLegendDivider />}
                <GeoMapLegendItem
                  active={(index + 1).toString() === (selected || hovered)}
                  prefix={index + 1}
                  title={label}
                  onHover={() => {
                    setHovered((index + 1).toString());
                  }}
                  onSelect={() => {
                    setSelected((index + 1).toString());
                    showModal();
                  }}
                />
              </div>
            ))}
          </GeoMapLegend>
        }
      />
    </>
  );
}
