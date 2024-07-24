import { Typography } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { generateGradientColors, hexToRgb, rgbToHex } from "../shared/lib";
import { GeoMap, GeoMapDistrict, GeoMapRef } from "../shared/ui/geo-map-chart";

const { Text } = Typography;

export interface GeoMapChartProps {
  startColor: string;
  endColor: string;
  districts: GeoMapChartDistrict[];
  selectedId?: string;
  onHover?: (id: string | undefined) => unknown;
  onSelect?: (id: string | undefined) => unknown;
  sortFn?: (a: GeoMapChartDistrict, b: GeoMapChartDistrict) => number;
}

export interface GeoMapChartDistrict {
  id: string;
  label: string;
  value: number;
}

interface TooltipData {
  x: number;
  y: number;
  text: string;
  id: string;
}

export const GeoMapChart = ({
  startColor,
  endColor,
  districts,
  selectedId,
  onHover,
  onSelect,
  sortFn = (a, b) => a.value - b.value,
}: GeoMapChartProps) => {
  const [tooltip, setTooltip] = useState<TooltipData | undefined>(undefined);

  const geoMapRef = useRef<GeoMapRef>(null);

  const mapDistricts: GeoMapDistrict[] = useMemo(() => {
    const size = districts.length;
    const colors = generateGradientColors(
      hexToRgb(startColor),
      hexToRgb(endColor),
      size
    );
    return [...districts].sort(sortFn).map((x, index) => ({
      id: x.id,
      color: rgbToHex(colors[index]),
      label: x.label,
    }));
  }, [startColor, endColor, districts, sortFn]);

  useEffect(() => {
    const district = districts.find((x) => x.id === selectedId);

    if (!district) {
      return;
    }

    const position = geoMapRef.current?.getDistrictPosition(district.id);

    if (!position) {
      return;
    }

    setTooltip({ ...position, text: district.label, id: district.id });
  }, [selectedId, districts]);

  return (
    <>
      {tooltip &&
        createPortal(
          <div
            onClick={() => onSelect?.(tooltip.id)}
            style={{
              position: "absolute",
              left: `${tooltip.x}px`,
              top: `${tooltip.y}px`,
              transition: "all 150ms",
              transform: `translate(-50%, -50%)`,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "0px 4px 0px 4px",
              borderRadius: 4,
              zIndex: 100,
              cursor: "pointer",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
              }}
            >
              {tooltip?.text}
            </Text>
          </div>,
          document.body
        )}

      <GeoMap
        ref={geoMapRef}
        districts={mapDistricts}
        selectedId={selectedId}
        onSelect={(district) => {
          onSelect?.(district.id);
        }}
        onHover={(district) => {
          onHover?.(district.id);
        }}
        onHoverOut={() => {
          setTooltip(undefined);
          onHover?.(undefined);
        }}
      />
    </>
  );
};
