import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createEvent, fetchMyEvents } from "@/services/event-service";
import { toast } from "./use-toast";
import { TEventParams } from "@/types/event-type";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEvents"] });
      toast({ variant: "success", description: "New event created" });
    },
    onError: (error: any) => {
      toast({ variant: "error", description: error.message });
    },
  });
};

export const useMyEvents = (params: TEventParams) => {
  return useQuery({
    queryKey: ["myEvents", params],
    queryFn: () => fetchMyEvents(params),
    placeholderData: keepPreviousData,
  });
};
