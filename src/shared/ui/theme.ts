export interface Theme {
  colors: {
    white: string;
    background: string;
    active: string;
    error: string;
    gray: string;
    darkGray: string;
  };
  font: Record<"h1" | "h2" | "h3" | "text", Text>;
}

export interface Text {
  weight: number;
  size: number;
}

export const theme: Theme = {
  colors: {
    white: "#FFFFFF",
    background: "#F5F5F5",
    active: "#111111",
    gray: "#BCBCBC",
    darkGray: "#707070",
    error: "#E10000",
  },
  font: {
    h1: {
      weight: 700,
      size: 24,
    },
    h2: {
      weight: 400,
      size: 18,
    },
    h3: {
      weight: 500,
      size: 14,
    },
    text: {
      weight: 500,
      size: 12,
    },
  },
};
