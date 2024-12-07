import { TUser } from "./auth-type";

export type TEventInput = {
  title: string;
  description: string;
  date: Date;
};

export type TEventParams = {
  search?: string | undefined;
  from?: Date | undefined;
  to?: Date | undefined;
  sort?: string | undefined;
  order?: string | undefined;
  page: number;
  limit: number;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  date: Date;
  createdAt: Date;
  user: TUser;
};

export type TEvents = {
  total: number;
  events: TEvent[];
};
