import { ReactElement } from "react";

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

export interface GuardProps {
  children: ReactElement | null;
}
