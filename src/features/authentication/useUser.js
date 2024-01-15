import { getCurrentUser } from "../../services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return { isLoading, isAuthenticated: user?.role === "authenticated" };
}
