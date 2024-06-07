import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title: string, description: string, status: any) => {
      toast({
        title,
        description,
        status,
        duration: 5000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};
