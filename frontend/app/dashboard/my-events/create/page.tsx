"use client";

import { motion } from "framer-motion";
import useHeader from "@/hooks/use-header";
import EventCreateForm from "@/components/forms/event-create-form";

export default function CreateEventPage() {
  useHeader({
    title: "Create Event",
    actions: [{ do: "BACK", link: "/dashboard/my-events" }],
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="rounded-xl overflow-hidden shadow-sm bg-violet-500/5"
      >
        <EventCreateForm />
      </motion.div>
    </div>
  );
}
