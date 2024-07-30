import { useMemo } from "react";
import { generateGradientColors, hexToRgb, rgbToHex } from "../shared/lib";
import { BarChart } from "../shared/ui/bar-chart";

export interface GeoBarChartProps {
  title?: string;
  subtitle?: string;
  startColor: string;
  endColor: string;
  size: number;
  legend?: string[];
}

export const GeoBarChart = ({
  title,
  subtitle,
  legend,
  startColor,
  endColor,
  size,
}: GeoBarChartProps) => {
  const items = useMemo(
    () =>
      generateGradientColors(
        hexToRgb(startColor),
        hexToRgb(endColor),
        size
      ).map((color) => ({
        color: rgbToHex(color),
      })),
    [startColor, endColor, size]
  );

  return (
    <BarChart
      title={title}
      subtitle={subtitle}
      items={items}
      itemWidth={38}
      legend={legend}
    />
  );
};
