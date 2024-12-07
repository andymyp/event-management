import axios from "@/lib/axios";
import { format } from "date-fns";
import { TEvent, TEventInput, TEventParams, TEvents } from "@/types/event-type";

export const createEvent = async (data: TEventInput): Promise<TEvent> => {
  const response = await axios.post("/event", data);
  return response.data;
};

export const fetchMyEvents = async (params: TEventParams): Promise<TEvents> => {
  let fromDate: string;
  let toDate: string;

  if (params.from) {
    fromDate = format(params.from, "yyyy-MM-dd'T'00:00:00.000");
  }

  if (params.to) {
    toDate = format(params.to, "yyyy-MM-dd'T'23:59:59.999");
  }

  const response = await axios.get("/event/my-events", {
    params: {
      search: params.search,
      from: fromDate!,
      to: toDate!,
      sort: params.sort,
      order: params.order,
      page: params.page,
      limit: params.limit,
    },
  });

  return response.data;
};