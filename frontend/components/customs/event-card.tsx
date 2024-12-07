"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Clock, UserIcon } from "lucide-react";
import { format } from "date-fns";
import { TEvent } from "@/types/event-type";

interface EventCardProps {
  event: TEvent;
  isListView: boolean;
}

export default function EventCard({ event, isListView }: EventCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`rounded-xl h-[190px] overflow-hidden shadow-sm bg-violet-500/5 border-0 flex flex-col`}
      >
        <div className={`flex flex-col w-full`}>
          <CardHeader>
            <CardTitle className="text-xl font-bold truncate">
              {event.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2 flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(event.date, "dd/MM/yyyy, HH:mm aa")}
            </p>
            <p className="text-sm truncate">{event.description}</p>
          </CardContent>
        </div>
        <CardFooter className={`flex flex-row justify-end gap-3 w-full`}>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <UserIcon size={16} />
            <span className="text-sm">{event.user.username}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock size={14} />
            <span className="text-xs">
              {format(event.createdAt, "dd/MM/yyyy, HH:mm aa")}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
