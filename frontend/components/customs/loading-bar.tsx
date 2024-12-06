"use client";

import { useEffect } from "react";
import {
  AppProgressBar,
  startProgress,
  stopProgress,
} from "next-nprogress-bar";
import { useSelector } from "react-redux";
import { AppState } from "@/lib/store";

export default function LoadingBar() {
  const isLoading = useSelector((state: AppState) => state.app.isLoading);

  useEffect(() => {
    if (isLoading) {
      startProgress();
    } else {
      stopProgress();
    }
  }, [isLoading]);

  return (
    <AppProgressBar
      height="6px"
      color="hsl(262.1, 83.3%, 57.8%)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
