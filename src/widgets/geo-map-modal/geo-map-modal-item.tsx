import { Flex, Typography } from "antd";
import { theme } from "../../shared/ui/theme";

const { Title, Text } = Typography;

export type GeoMapModalItemProps = {
  label: string;
  value: string;
  unit: string;
};

export const GeoMapModalItem = ({
  label,
  value,
  unit,
}: GeoMapModalItemProps) => {
  return (
    <Flex
      align="center"
      justify="space-between"
      style={{
        marginRight: 20,
        paddingBottom: 4,
        borderBottom: `1px solid ${theme.colors.gray}`,
      }}
    >
      <Title level={2} style={{ fontWeight: 400, margin: 0, padding: 0 }}>
        {label}
      </Title>

      <Flex gap={4} align="end">
        <Text
          style={{
            color: theme.colors.active,
            fontSize: 18,
            fontWeight: 500,
            lineHeight: "22px",
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            color: theme.colors.gray,
            fontSize: 18,
            fontWeight: 400,
            lineHeight: "22px",
          }}
        >
          {unit}
        </Text>
      </Flex>
    </Flex>
  );
};
