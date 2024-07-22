import { Flex } from "antd";
import { ReactNode } from "react";

export type GeoMapLayoutProps = {
  legend?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  map: ReactNode;
};

export const GeoMapLayout = ({
  legend,
  headerLeft,
  headerRight,
  map,
}: GeoMapLayoutProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      gap={28}
      style={{
        height: "100%",
        overflow: "hidden",
        paddingLeft: 60,
      }}
    >
      <Flex
        vertical
        style={{
          height: "100%",
          overflow: "hidden",
          paddingTop: 32,
          paddingBottom: 32,
        }}
      >
        {(headerLeft || headerRight) && (
          <Flex justify="space-between" gap={32} style={{ paddingBottom: 32 }}>
            <div style={{ maxWidth: 360, width: "100%" }}>{headerLeft}</div>

            {headerRight && (
              <div style={{ flexGrow: 1, maxWidth: 532 }}>{headerRight}</div>
            )}
          </Flex>
        )}

        {map && map}
      </Flex>

      {legend && legend}
    </Flex>
  );
};
