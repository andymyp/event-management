"use client";

import { Input } from "@/components/ui/input";
import useHeader from "@/hooks/use-header";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/customs/date-range-picker";
import { ViewToggle } from "@/components/customs/view-toggle";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import EventCard from "@/components/customs/event-card";
import { useEvents } from "@/hooks/use-events";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { AppAction } from "@/lib/store/app-slice";

export default function DashboardPage() {
  useHeader({ title: "Dashboard" });

  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [isListView, setIsListView] = useState<boolean>(false);
  const { ref, inView } = useInView();

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useEvents({
      search: search !== "" ? search : undefined,
      from: date?.from,
      to: date?.to,
      page: 0,
      limit: 9,
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    dispatch(AppAction.setLoading(isFetching));
  }, [isFetching]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex flex-row items-center gap-3 py-0">
        <Input
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <DateRangePicker date={date} setDate={setDate} />
        <ViewToggle isListView={isListView} setIsListView={setIsListView} />
      </div>
      <motion.div
        layout
        className={`grid gap-4 ${
          isListView
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        <AnimatePresence>
          {data?.pages.map((page) =>
            page.events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/dashboard/${event.id}`}>
                  <EventCard event={event} isListView={isListView} />
                </Link>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>
      {!isFetching && data && (
        <div ref={ref} className="flex justify-center p-4">
          {isFetchingNextPage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-lg">Loading...</span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
