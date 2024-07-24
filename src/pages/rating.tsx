import { Flex, Typography } from "antd";
import { useMemo, useState } from "react";
import { CloseIcon } from "../shared/ui/close-icon";
import {
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../shared/ui/geo-map-chart";
import { theme } from "../shared/ui/theme";
import { GeoBarChart } from "../widgets/geo-bar-chart";
import { GeoMapChart, GeoMapChartDistrict } from "../widgets/geo-map-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";

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
              onSelect={(id) => setHovered(id)}
              startColor="#03A609"
              endColor="#D0D2CD"
              districts={districts}
            />
          </>
        }
        modal={
          isModalOpen && (
            <Flex
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: `rgba(0, 0, 0, 0.2)`,
                zIndex: 1000,
              }}
              align="center"
              justify="center"
            >
              <div
                style={{
                  top: "50%",
                  left: "50%",
                  backgroundColor: theme.colors.white,
                  width: 522,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: 24,
                  }}
                >
                  <Title
                    level={2}
                    style={{
                      textTransform: "uppercase",
                      padding: 0,
                      margin: 0,
                      paddingBottom: 24,
                    }}
                  >
                    {selectedDistrict?.label}
                  </Title>

                  <div
                    onClick={() => {
                      closeModal();
                      setSelected(undefined);
                    }}
                    style={{
                      position: "absolute",
                      top: 14,
                      right: 14,
                      cursor: "pointer",
                    }}
                  >
                    <CloseIcon />
                  </div>
                </div>
              </div>
            </Flex>
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
