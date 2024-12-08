import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createEvent,
  deleteEvent,
  fetchEvent,
  fetchEvents,
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

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myEvents"] });
      toast({ variant: "success", description: "Event deleted" });
    },
    onError: (error: any) => {
      toast({ variant: "error", description: error.message });
    },
  });
};

export const useEvents = (params: TEventParams) => {
  return useInfiniteQuery({
    queryKey: ["events", params],
    queryFn: fetchEvents,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const currentTotal = pages.flatMap((page) => page.events).length;
      return currentTotal < lastPage.total
        ? pages.length * params.limit
        : undefined;
    },
  });
};
