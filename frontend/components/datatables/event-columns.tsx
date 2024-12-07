"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TEvent } from "@/types/event-type";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Edit2,
  Eye,
  MoreVertical,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import Link from "next/link";

export const EventColumns: ColumnDef<TEvent>[] = [
  {
    id: "number",
    header: "#",
    cell: (info) => info.row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Date
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return format(date, "dd/MM/yyyy, HH:mm aa");
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = new Date(getValue() as string);
      return format(date, "dd/MM/yyyy, HH:mm aa");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/${event.id}`}>
              <DropdownMenuItem className="flex justify-between">
                View
                <Eye />
              </DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/my-events/${event.id}`}>
              <DropdownMenuItem className="flex justify-between">
                Edit
                <Edit2 />
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem className="flex justify-between">
              Delete
              <Trash />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
