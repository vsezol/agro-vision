import { Flex, Typography } from "antd";
import { PropsWithChildren } from "react";
import { theme } from "../../shared/ui/theme";

const { Title } = Typography;

export type GeoMapChartLegendProps = {
  title: string;
  unit?: string;
  width?: string;
} & PropsWithChildren;

export const GeoMapChartLegend = ({
  children,
  title,
  unit,
  width = "324px",
}: GeoMapChartLegendProps) => {
  return (
    <Flex
      style={{
        backgroundColor: theme.colors.white,
        height: "100%",
        width,
        minWidth: width,
      }}
      vertical
    >
      <Flex
        align="center"
        justify="space-between"
        style={{
          paddingTop: 36,
          paddingLeft: 32,
          paddingRight: 32,
          paddingBottom: 20,
          flexShrink: 1,
        }}
      >
        <Title
          style={{
            fontWeight: theme.font.h1.weight,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {title}
        </Title>

        {unit && (
          <Title
            level={2}
            style={{
              fontWeight: theme.font.h2.weight,
              color: theme.colors.gray,
              margin: 0,
            }}
          >
            {unit}
          </Title>
        )}
      </Flex>

      <Flex
        style={{
          height: "100%",
          overflow: "scroll",
        }}
        vertical
      >
        {children}
      </Flex>
    </Flex>
  );
};
