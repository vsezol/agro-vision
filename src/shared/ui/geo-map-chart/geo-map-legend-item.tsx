import { Flex, Typography } from "antd";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { usePrevious } from "../../lib";
import { theme } from "../theme";

const { Title } = Typography;

export type GeoMapLegendItemProps = {
  prefix?: string | number;
  title: string;
  value?: string;
  active?: boolean;
  onSelect?: () => unknown;
} & PropsWithChildren;

export const GeoMapLegendItem = ({
  prefix,
  title,
  value,
  active = false,
  onSelect,
}: GeoMapLegendItemProps) => {
  const [lastActive] = usePrevious(active, 1);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const itemRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lastActive && active && !isIntersecting) {
      itemRef.current?.scrollIntoView?.({ behavior: "smooth" });
    }
  }, [active, lastActive, isIntersecting]);

  useEffect(() => {
    const child = itemRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });

    observer.observe(child!);

    return () => observer.unobserve(child!);
  }, []);

  return (
    <Flex
      ref={itemRef}
      align="center"
      justify="space-between"
      style={{
        padding: "12px 32px",
        backgroundColor: active ? "#F8F8F8" : "transparent",
        cursor: "pointer",
      }}
      onMouseMove={() => onSelect?.()}
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
