import { Flex, Select as UISelect } from "antd";
import { CircleFillIcon } from "./circle-fill-icon";
import { CircleIcon } from "./circle-icon";
import { theme } from "./theme";

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  value: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
}

export const Select = ({ options, value, onChange }: SelectProps) => {
  return (
    <UISelect
      labelRender={({ value }) =>
        options?.find((x) => x.value === value)?.label
      }
      style={{ width: "100%" }}
      size="large"
      onChange={onChange}
      value={value}
      defaultValue={value}
    >
      {options?.map((x) => (
        <UISelect.Option key={x.value} value={x.value}>
          <Flex gap={12} align="center" style={{ overflow: "hidden" }}>
            <Flex>
              {value === x.value ? (
                <CircleFillIcon color={theme.colors.active} />
              ) : (
                <CircleIcon color={theme.colors.active} />
              )}
            </Flex>

            <div>{x.label}</div>
          </Flex>
        </UISelect.Option>
      ))}
    </UISelect>
  );
};
