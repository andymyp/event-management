import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEvent,
  fetchEvent,
  fetchMyEvents,
  updateEvent,
} from "@/services/event-service";
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

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEvents"] });
      queryClient.invalidateQueries({ queryKey: ["event"] });
      toast({ variant: "success", description: "Event updated" });
    },
    onError: (error: any) => {
      toast({ variant: "error", description: error.message });
    },
  });
};
