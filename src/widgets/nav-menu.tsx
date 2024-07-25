import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [current, setCurrent] = useState<string | undefined>();

  const { pathname } = useLocation();

  useEffect(() => {
    const name = items.find((x) => x.href === pathname)?.name;

    if (!name) {
      setCurrent(undefined);
      return;
    }

    setCurrent(name);
  }, [pathname]);

  const navigate = useNavigate();

  return (
    <Menu
      selectedKeys={[current ?? ""]}
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
        border: "none",
      }}
    />
  );
};
