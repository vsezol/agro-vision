import { Flex } from "antd";

export type BarProps = {
  items: BarItem[];
  itemHeight: string | number;
  itemWidth?: number | string;
};

export type BarItem = {
  color: string;
};

export const Bar = ({ items, itemHeight }: BarProps) => {
  return (
    <Flex gap={1} style={{ width: "100%" }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: item.color,
            height: itemHeight,
            width: "100%",
            borderTopLeftRadius: index === 0 ? 4 : 0,
            borderBottomLeftRadius: index === 0 ? 4 : 0,
            borderTopRightRadius: index === items.length - 1 ? 4 : 0,
            borderBottomRightRadius: index === items.length - 1 ? 4 : 0,
          }}
        ></div>
      ))}
    </Flex>
  );
};
