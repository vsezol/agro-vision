import { ReactNode, useEffect, useState } from "react";
import { sessionStore } from "../entities/session";
import { useAppDispatch } from "../shared/lib";

export function Loader({ children }: { children?: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);

    Promise.all([dispatch(sessionStore.actions.load())]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <></>;
  }

  return <>{children}</>;
}
