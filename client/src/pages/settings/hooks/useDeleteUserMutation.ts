import { useApolloClient, useMutation } from "@apollo/client";
import { DeleteUserDocument } from "@generated/graphql";
import { useCallback, useMemo } from "react";
import { useTokenContext } from "@lib/context/TokenContext";
import { useNavigate } from "react-router";
import { useToast } from "@lib/hooks/useToast";
import { useUserContext } from "@lib/context/UserContext";

export const useDeleteUserMutation = () => {
  const navigate = useNavigate();
  const [toast] = useToast();
  const client = useApolloClient();
  const { data } = useUserContext();
  const { setToken } = useTokenContext();
  const [deleteUser, result] = useMutation(DeleteUserDocument, {
    fetchPolicy: "network-only",
    variables: {
      userId: data?.user?._id || "",
    },
    onCompleted: () => {
      toast({
        variant: "success",
        message: "User account deleted successfully!",
      });
      localStorage.clear();
      client.clearStore();
      setToken(null);
      return navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "error",
        message: `${error.message}. Please try again later.`,
      });
    },
  });

  const onDeleteUser = useCallback(async () => {
    await deleteUser();
  }, [deleteUser]);

  return useMemo(
    (): [typeof onDeleteUser, typeof result] => [onDeleteUser, result],
    [onDeleteUser, result]
  );
};
