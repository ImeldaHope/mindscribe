import { useMutation} from "@tanstack/react-query";

import { User } from "@/types";

export const useNewUser = () => {
  return useMutation<User>({
    mutationKey: ["new-user"],
    mutationFn: async (newUser) => {
      const response = await fetch(`/api/v1/users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
  });
}

export const useUserEntryCategory = () => {
  const userId = "09c1006c-9239-4ecf-87f3-27d6b5d2b1f5"; 
  const entryId = "d7887a99-c949-43c4-aad7-facfc2cdd4d2";
  const categoryId = "9fb95579-ea1b-46ed-ba45-97ffad2285c5";
  const customCategoryId = "4d81a091-32c0-4da8-98a4-a3b74cb4c855"; 

  return { userId, entryId, categoryId, customCategoryId };
};
