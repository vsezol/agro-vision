import { Flex, Typography } from "antd";
import { PropsWithChildren } from "react";
import { CloseIcon } from "../../shared/ui/close-icon";
import { theme } from "../../shared/ui/theme";

const { Title } = Typography;

export type GeoMapModalProps = {
  title?: string;
  onClose?: () => unknown;
} & PropsWithChildren;

export const GeoMapModal = ({ onClose, title, children }: GeoMapModalProps) => {
  return (
    <Flex
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: `rgba(0, 0, 0, 0.2)`,
        zIndex: 1000,
      }}
      align="center"
      justify="center"
    >
      <div
        style={{
          top: "50%",
          left: "50%",
          backgroundColor: theme.colors.white,
          width: 522,
          maxHeight: 468,
          height: "100%",
        }}
      >
        <Flex
          vertical
          style={{
            position: "relative",
            padding: 24,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Title
            level={2}
            style={{
              textTransform: "uppercase",
              padding: 0,
              margin: 0,
              paddingBottom: 24,
            }}
          >
            {title}
          </Title>

          <div
            onClick={() => {
              onClose?.();
            }}
            style={{
              flexGrow: 1,
              position: "absolute",
              top: 14,
              right: 14,
              cursor: "pointer",
            }}
          >
            <CloseIcon />
          </div>

          <Flex
            gap={16}
            vertical
            style={{ height: "100%", overflow: "scroll", flexGrow: 1 }}
          >
            {children}
          </Flex>
        </Flex>
      </div>
    </Flex>
  );
};
