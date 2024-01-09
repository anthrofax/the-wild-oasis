import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";

export function useGetSettings() {
  const {
    isLoading: isFetching,
    data: settings,
    error: fetchError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isFetching, settings, fetchError };
}
