import { Flex, Typography } from "antd";
import { theme } from "../../shared/ui/theme";
import { Bar, BarItem } from "./bar";

const { Title, Text } = Typography;

export type BarChartProps = {
  title: string;
  items: BarItem[];
  legend: string[];
  itemWidth?: number | string;
  itemHeight?: number | string;
};

export const BarChart = ({
  title,
  items,
  legend,
  itemHeight = 24,
  itemWidth,
}: BarChartProps) => {
  return (
    <Flex vertical>
      <Title
        level={3}
        style={{
          fontWeight: theme.font.h3.weight,
          margin: 0,
          paddingBottom: 8,
        }}
      >
        {title}
      </Title>

      <Bar itemHeight={itemHeight} itemWidth={itemWidth} items={items} />

      <Flex style={{ paddingTop: 4 }} justify="space-between" align="center">
        {legend.map((text, index) => (
          <Text key={index} style={{ color: theme.colors.darkGray }}>
            {text}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};
