import { AppDispatch } from "@/lib/store";
import { useDispatch } from "react-redux";
import { AppAction } from "@/lib/store/app-slice";
import { useEffect } from "react";
import { THeader } from "@/types/app-type";

const useHeader = ({ title, actions }: THeader) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (title) {
      document.title = `Event Management - ${title}`;

      let header: THeader = { title };

      if (actions) {
        header.actions = actions;
      }

      dispatch(AppAction.setHeader(header));
    }
  }, [title, actions]);
};

export default useHeader;
