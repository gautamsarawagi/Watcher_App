import { createContext } from "react";

type HeaderState = {
    inView : String
};

export const initialHeaderState: HeaderState = {
    inView : ""
};

export const CriminalInViewContext = createContext(initialHeaderState);