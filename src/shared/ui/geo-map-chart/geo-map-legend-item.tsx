import { Flex, Typography } from "antd";
import { PropsWithChildren } from "react";
import { theme } from "../theme";

const { Title } = Typography;

export type GeoMapLegendItemProps = {
  prefix?: string | number;
  title: string;
  value?: string;
} & PropsWithChildren;

export const GeoMapLegendItem = ({
  prefix,
  title,
  value,
}: GeoMapLegendItemProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        padding: "12px 32px",
      }}
    >
      <Flex gap={12} align="center">
        {prefix !== undefined && (
          <Title
            level={1}
            style={{
              width: 32,
              textAlign: "center",
              fontWeight: theme.font.h1.weight,
              color: theme.colors.gray,
              margin: 0,
            }}
          >
            {prefix}
          </Title>
        )}

        <Title
          level={2}
          style={{ margin: 0, fontWeight: theme.font.h2.weight }}
        >
          {title}
        </Title>
      </Flex>

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
