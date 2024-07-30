import { GeoMap } from "../../../shared/ui/geo-map-chart";
import { GeoMapLayout } from "../../../widgets/geo-map-layout";
import { ParamsPageChartProps } from "../contracts";

export const DefaultChart = ({ select }: ParamsPageChartProps) => {
  return <GeoMapLayout headerLeft={select} map={<GeoMap />} />;
};
