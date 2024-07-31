import { Typography } from "antd";
import { useMemo, useState } from "react";
import { geoMapStore } from "../entities/geo-map";
import { useLoadGeoMap } from "../features/geo-map";
import { useAppSelector } from "../shared/lib";
import {
  GeoMapLegend,
  GeoMapLegendDivider,
  GeoMapLegendItem,
} from "../shared/ui/geo-map-chart";
import { GeoBarChart } from "../widgets/geo-bar-chart";
import { GeoMapChart } from "../widgets/geo-map-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";
import { GeoMapModalItem } from "../widgets/geo-map-modal";
import { GeoMapModal } from "../widgets/geo-map-modal/geo-map-modal";

const { Title } = Typography;

const LEGEND_WIDTH_PX = 324;

export default function RatingPage() {
  useLoadGeoMap();

  const [hovered, setHovered] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const topDistricts = useAppSelector(geoMapStore.selectors.selectTop);

  const selectedDistrict = useMemo(
    () => topDistricts.find(({ id }) => id === (selected || hovered)),
    [hovered, selected, topDistricts]
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
              startColor={["#03A609"]}
              endColor={["#D0D2CD"]}
              districts={[
                topDistricts.map(({ name, id }, index) => ({
                  id,
                  label: name,
                  value: index,
                })),
              ]}
            />
          </>
        }
        modal={
          isModalOpen && (
            <GeoMapModal
              title={selectedDistrict?.name}
              onClose={() => {
                closeModal();
                setSelected(undefined);
              }}
            >
              <GeoMapModalItem
                label="Подвижный фосфор"
                value={selectedDistrict?.values.availablePhosphorus ?? 0}
                unit="мг/кг"
              />
              <GeoMapModalItem
                label="Подвижный калий"
                value={selectedDistrict?.values.availablePotassium ?? 0}
                unit="мг/кг"
              />
              <GeoMapModalItem
                label="PH солевой вытяжки"
                value={selectedDistrict?.values.phSaltExtract ?? 0}
                unit="ед"
              />
              <GeoMapModalItem
                label="Гумус"
                value={selectedDistrict?.values.humus ?? 0}
                unit="%"
              />
              <GeoMapModalItem
                label="Урожайность зерновых"
                value={selectedDistrict?.values.grainYield ?? 0}
                unit="ц/га"
              />
              <GeoMapModalItem
                label="Урожайность картофеля"
                value={selectedDistrict?.values.potatoYield ?? 0}
                unit="т/га"
              />
              <GeoMapModalItem
                label="Урожайность подсолнечника"
                value={selectedDistrict?.values.sunflowerYield ?? 0}
                unit="т/га"
              />
              <GeoMapModalItem
                label="Урожайность овощей открытого грунта"
                value={selectedDistrict?.values.vegetableYield ?? 0}
                unit="т/га"
              />
              <GeoMapModalItem
                label="Средняя кадастровая стоимость"
                value={selectedDistrict?.values.srup ?? 0}
                unit="руб/кв.м"
              />
            </GeoMapModal>
          )
        }
        legend={
          <GeoMapLegend width={LEGEND_WIDTH_PX + "px"} title="Общий рейтинг">
            {topDistricts.map((item, index) => (
              <div key={item.id}>
                {index !== 0 && <GeoMapLegendDivider />}
                <GeoMapLegendItem
                  active={item.id === (selected || hovered)}
                  prefix={index + 1}
                  title={item.name}
                  onHover={() => {
                    setHovered(item.id);
                  }}
                  onSelect={() => {
                    setSelected(item.id);
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
