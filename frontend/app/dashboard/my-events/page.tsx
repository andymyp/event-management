"use client";

import useHeader from "@/hooks/use-header";
import { useMyEvents } from "@/hooks/use-events";
import { EventDataTable } from "@/components/datatables/event-datatable";
import { EventColumns } from "@/components/datatables/event-columns";

export default function MyEventsPage() {
  useHeader({
    title: "My Events",
    actions: [{ do: "CREATE", link: "/dashboard/my-events/create" }],
  });

  // const { sort, filter } = useSelector(
  //   (state: AppState) => state.app.datatable
  // );

  // const { data, isLoading } = useMyEvents({
  //   search: filter.values(),
  //   sort: sort,
  // });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <EventDataTable columns={EventColumns} data={[]} />
    </div>
  );
}
