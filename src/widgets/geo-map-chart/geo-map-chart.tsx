import { Flex } from "antd";
import { GeoMap } from "./geo-map";

export const GeoMapChart = () => {
  return (
    <Flex align="center" vertical justify="center" style={{ height: "100%" }}>
      <Flex align="center" justify="space-between">
        <div></div>

        <div>Урожайность картофеля, т/га</div>
      </Flex>
      <GeoMap />
    </Flex>
  );
};
