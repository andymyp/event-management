"use client";

import { motion } from "framer-motion";
import useHeader from "@/hooks/use-header";
import EventUpdateForm from "@/components/forms/event-update-form";
import { useEvent } from "@/hooks/use-events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { AppAction } from "@/lib/store/app-slice";

interface Props {
  params: { id: string };
}

export default function EditEventPage({ params }: Props) {
  useHeader({
    title: "Edit Event",
    actions: [{ do: "BACK", link: "/dashboard/my-events" }],
  });

  const dispatch = useDispatch<AppDispatch>();

  const { data, isFetching } = useEvent(params.id);

  useEffect(() => {
    dispatch(AppAction.setLoading(isFetching));
  }, [isFetching]);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="rounded-xl overflow-hidden shadow-sm bg-violet-500/5"
      >
        {data && <EventUpdateForm event={data} />}
      </motion.div>
    </div>
  );
}
