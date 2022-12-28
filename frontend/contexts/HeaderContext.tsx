import { createContext } from "react";

type HeaderState = {
  inView: boolean;
};

export const initialHeaderState: HeaderState = {
  inView: true,
};

export const BrandInViewContext = createContext(initialHeaderState);