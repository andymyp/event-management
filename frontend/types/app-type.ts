export type THeader = {
  title: string | undefined;
  actions?: TAction[];
};

export type TAction = {
  do: "CREATE" | "BACK";
  link: string;
};
