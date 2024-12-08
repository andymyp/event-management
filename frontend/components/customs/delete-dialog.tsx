"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteEvent } from "@/hooks/use-events";
import { AppDispatch } from "@/lib/store";
import { AppAction } from "@/lib/store/app-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  eventId: string;
}

export function DeleteDialog({ open, setOpen, eventId }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const { mutateAsync, isPending } = useDeleteEvent();

  useEffect(() => {
    dispatch(AppAction.setLoading(isPending));
  }, [isPending]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this your
            event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => await mutateAsync(eventId)}
            className="bg-destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
