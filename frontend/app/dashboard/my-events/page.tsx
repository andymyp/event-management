"use client";

import useHeader from "@/hooks/use-header";
import { useMyEvents } from "@/hooks/use-events";
import { EventDataTable } from "@/components/datatables/event-datatable";
import { EventColumns } from "@/components/datatables/event-columns";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { AppAction } from "@/lib/store/app-slice";
import { PaginationState } from "@tanstack/react-table";

export default function MyEventsPage() {
  useHeader({
    title: "My Events",
    actions: [{ do: "CREATE", link: "/dashboard/my-events/create" }],
  });

  const dispatch = useDispatch<AppDispatch>();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isFetching } = useMyEvents({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
  });

  useEffect(() => {
    dispatch(AppAction.setLoading(isFetching));
  }, [isFetching]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <EventDataTable
        isFetching={isFetching}
        columns={EventColumns}
        data={data ? data.events : []}
        pageState={{
          total: data ? data.total : 0,
          pagination,
          setPagination,
        }}
      />
    </div>
  );
}
