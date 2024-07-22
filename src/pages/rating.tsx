import { Flex, Select, SelectProps } from "antd";
import { useState } from "react";
import { generateGradientColors, hexToRgb, rgbToHex } from "../shared/lib";
import { CircleFillIcon } from "../shared/ui/circle-fill-icon";
import { CircleIcon } from "../shared/ui/circle-icon";
import { theme } from "../shared/ui/theme";
import { BarChart, BarItem } from "../widgets/bar-chart";
import {
  GeoMap,
  GeoMapChartLegend,
  GeoMapChartLegendDivider,
  GeoMapChartLegendItem,
} from "../widgets/geo-map-chart";
import { GeoMapLayout } from "../widgets/geo-map-layout";

const startColor = "#03A609";
const endColor = "#FFDD9C";

const items: BarItem[] = generateGradientColors(
  hexToRgb(startColor),
  hexToRgb(endColor),
  14
).map((color) => ({
  color: rgbToHex(color),
}));

const options: SelectProps["options"] = [
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

export default function Main() {
  const [value, setValue] = useState("1");

  return (
    <GeoMapLayout
      headerLeft={
        <Select
          labelRender={({ value }) =>
            options?.find((x) => x.value === value)?.label
          }
          style={{ width: "100%" }}
          size="large"
          onChange={(value) => setValue(value)}
          value={value}
          defaultValue={"1"}
        >
          {options?.map((x) => (
            <Select.Option key={x.value} value={x.value}>
              <Flex gap={12} align="center" style={{ overflow: "hidden" }}>
                <Flex>
                  {value === x.value ? (
                    <CircleFillIcon color={theme.colors.active} />
                  ) : (
                    <CircleIcon color={theme.colors.active} />
                  )}
                </Flex>

                <div>{x.label}</div>
              </Flex>
            </Select.Option>
          ))}
        </Select>
      }
      headerRight={
        <BarChart
          title="Урожайность картофеля, т/га"
          items={items}
          itemWidth={38}
          legend={["Высокая", "Низкая"]}
        />
      }
      map={<GeoMap />}
      legend={
        <GeoMapChartLegend title="Содержание" unit="%">
          <GeoMapChartLegendItem title="Башмаковский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
          <GeoMapChartLegendDivider />
          <GeoMapChartLegendItem title="Сосновоборовский" value="12.9" />
        </GeoMapChartLegend>
      }
    />
  );
}
