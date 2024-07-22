import { Flex, Typography } from "antd";
import { PropsWithChildren } from "react";
import { theme } from "../../shared/ui/theme";

const { Title } = Typography;

export type GeoMapChartLegendItemProps = {
  title: string;
  value?: string;
} & PropsWithChildren;

export const GeoMapChartLegendItem = ({
  title,
  value,
}: GeoMapChartLegendItemProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        padding: "12px 32px",
      }}
    >
      <Title level={2} style={{ margin: 0, fontWeight: theme.font.h2.weight }}>
        {title}
      </Title>

      {value && (
        <Title
          level={2}
          style={{
            fontWeight: theme.font.h2.weight,
            color: theme.colors.gray,
            margin: 0,
          }}
        >
          {value}
        </Title>
      )}
    </Flex>
  );
};
