import { Menu, MenuProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes } from "../shared/routes";

interface MenuItem {
  label: string;
  name: string;
  href: Routes;
}

const items: MenuItem[] = [
  {
    label: "Общий рейтинг",
    name: "rating",
    href: Routes.Rating,
  },
  {
    label: "Распределение по показателям",
    name: "params",
    href: Routes.Params,
  },
];

export const NavMenu = () => {
  const [current, setCurrent] = useState(items[0].name);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const navigate = useNavigate();

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items.map((x) => ({
        key: x.name,
        label: x.label,
        onClick: () => navigate(x.href),
      }))}
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        fontWeight: 500,
        textTransform: "uppercase",
      }}
    />
  );
};
