import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { AppAction } from "@/lib/store/app-slice";
import { useEffect } from "react";
import { THeader } from "@/types/app-type";

const useHeader = ({ title }: THeader) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (title) {
      document.title = `Event Management - ${title}`;
      dispatch(AppAction.setHeader({ title }));
    }
  }, [title, dispatch]);
};

export default useHeader;
