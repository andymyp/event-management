"use client";

import { motion } from "framer-motion";
import useHeader from "@/hooks/use-header";
import { useEvent } from "@/hooks/use-events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { AppAction } from "@/lib/store/app-slice";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarIcon, Clock, UserIcon } from "lucide-react";
import { format } from "date-fns";

interface Props {
  params: { id: string };
}

export default function EventDetailPage({ params }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { data, isFetching } = useEvent(params.id);

  useHeader({
    title: data ? data.title : "Detail",
    actions: [{ do: "BACK", link: "/dashboard" }],
  });

  useEffect(() => {
    dispatch(AppAction.setLoading(isFetching));
  }, [isFetching]);

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
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <motion.div
        layout
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {!isFetching && data && (
          <Card
            className={`rounded-xl overflow-hidden shadow-sm bg-violet-500/5 border-0 flex flex-col`}
          >
            <div className={`flex flex-col w-full`}>
              <CardHeader>
                <CardTitle className="text-3xl font-bold">
                  {data.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{data.description}</p>
                <p className="flex items-center space-x-2 text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(data.date, "dd/MM/yyyy, HH:mm aa")}
                </p>
              </CardContent>
            </div>
            <CardFooter className={`flex flex-row justify-end gap-3 w-full`}>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <UserIcon size={16} />
                <span className="text-sm">{data.user.username}</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock size={14} />
                <span className="text-xs">
                  {format(data.createdAt, "dd/MM/yyyy, HH:mm aa")}
                </span>
              </div>
            </CardFooter>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
