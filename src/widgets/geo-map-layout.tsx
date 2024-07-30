import { Flex } from "antd";
import { ReactNode } from "react";

export type GeoMapLayoutProps = {
  legend?: ReactNode;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  map: ReactNode;
  modal?: ReactNode;
};

export const GeoMapLayout = ({
  legend,
  headerLeft,
  headerRight,
  map,
  modal,
}: GeoMapLayoutProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Flex
        style={{
          height: "100%",
          overflow: "hidden",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Flex
          vertical
          style={{
            height: "100%",
            overflow: "hidden",
            flexGrow: 1,
            paddingLeft: 60,
            paddingTop: 32,
            paddingBottom: 32,
            paddingRight: 28,
          }}
          gap={32}
        >
          {(headerLeft || headerRight) && (
            <Flex justify="space-between" gap={32}>
              <div style={{ maxWidth: 360, width: "100%" }}>{headerLeft}</div>

              {headerRight && (
                <Flex
                  align="end"
                  gap={24}
                  style={{ flexGrow: 1, maxWidth: 532 }}
                >
                  {headerRight}
                </Flex>
              )}
            </Flex>
          )}

          {map && (
            <Flex style={{ overflow: "hidden", position: "relative" }}>
              {map}
            </Flex>
          )}
        </Flex>

        {modal && modal}
      </Flex>

      {legend && legend}
    </Flex>
  );
};
